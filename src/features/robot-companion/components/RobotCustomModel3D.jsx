import React, { useRef, useMemo, useEffect, useState, Component } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import useCustomizerStore from '../../customize-studio/store/customizerStore';

// Preload GLB model and the 3 official color textures
useGLTF.preload('/models/Robot/Robot.glb');
useLoader.preload(THREE.TextureLoader, '/models/Robot/textures/Mauxanh.png');
useLoader.preload(THREE.TextureLoader, '/models/Robot/textures/Mauhong.png');
useLoader.preload(THREE.TextureLoader, '/models/Robot/textures/Mautim.png');

// Error Boundary to handle missing GLB file gracefully
class GLTFErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('[3D Viewer] Robot.glb failed to load. Falling back to STL model.', error);
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const TEXTURE_ACCENT_FALLBACKS = {
  mauxanh: '#4c6cb3',
  mauhong: '#e898a1',
  mautim: '#866eb3',
};

function extractAccentColorFromTexture(texture, texturePath) {
  try {
    const img = texture?.image;
    if (img && img.width && img.height && typeof document !== 'undefined') {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);
        let rSum = 0;
        let gSum = 0;
        let bSum = 0;
        let count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          // Ignore transparent and near-white background pixels
          if (a < 128 || (r > 230 && g > 230 && b > 230)) continue;
          rSum += r;
          gSum += g;
          bSum += b;
          count++;
        }
        if (count > 0) {
          const rAvg = Math.round(rSum / count);
          const gAvg = Math.round(gSum / count);
          const bAvg = Math.round(bSum / count);
          return new THREE.Color(`rgb(${rAvg}, ${gAvg}, ${bAvg})`);
        }
      }
    }
  } catch {
    // Fallback to known texture color mapping
  }

  const lower = (texturePath || '').toLowerCase();
  const matchedKey = Object.keys(TEXTURE_ACCENT_FALLBACKS).find((k) => lower.includes(k));
  return new THREE.Color(matchedKey ? TEXTURE_ACCENT_FALLBACKS[matchedKey] : '#866eb3');
}

// 1. GLB Robot Model Component (Full UV mapping, multiple materials, screen face & texture swatches)
const RobotGLBModel = ({
  activeTexturePath,
  scale,
  position,
  interactive,
  targetRotation,
}) => {
  const robotRef = useRef();
  const { scene } = useGLTF('/models/Robot/Robot.glb');
  const colorTexture = useLoader(THREE.TextureLoader, activeTexturePath);

  // Clone scene & materials so instances are isolated, and compute centering offset
  const { clonedScene, centerOffset } = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          const cloneMaterial = (mat) => {
            const clonedMat = mat.clone();
            const matName = (mat.name || '').toLowerCase();
            const mapName = (mat.map?.name || '').toLowerCase();
            const isColorShellMaterial =
              matName === 'material.008' ||
              matName.includes('shell') ||
              matName.includes('body') ||
              mapName.includes('mautim') ||
              mapName.includes('mauxanh') ||
              mapName.includes('mauhong');
            const isAccentColorMaterial =
              matName === 'material.010' ||
              matName === 'material.012' ||
              matName.includes('ear') ||
              matName.includes('eye') ||
              matName.includes('mouth');
            clonedMat.userData = {
              ...clonedMat.userData,
              isColorShellMaterial,
              isAccentColorMaterial,
            };
            return clonedMat;
          };

          child.material = Array.isArray(child.material)
            ? child.material.map(cloneMaterial)
            : cloneMaterial(child.material);
        }
      }
    });

    clone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    box.getCenter(center);

    return {
      clonedScene: clone,
      centerOffset: [-center.x, -center.y, -center.z],
    };
  }, [scene]);

  const preparedTexture = useMemo(() => {
    if (!colorTexture) return null;
    const tex = colorTexture.clone();
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.flipY = false;
    tex.needsUpdate = true;
    return tex;
  }, [colorTexture]);

  useEffect(() => {
    return () => {
      preparedTexture?.dispose();
    };
  }, [preparedTexture]);

  // Apply selected color texture to the UV-mapped body shell and sync accent parts (ears, eyes/mouth)
  useEffect(() => {
    if (!clonedScene || !preparedTexture) return;

    const accentColor = extractAccentColorFromTexture(preparedTexture, activeTexturePath);

    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((mat) => {
          if (mat.userData?.isColorShellMaterial) {
            mat.map = preparedTexture;
            mat.color.set('#FFFFFF');
            mat.needsUpdate = true;
          } else if (mat.userData?.isAccentColorMaterial) {
            mat.color.copy(accentColor);
            mat.needsUpdate = true;
          }
        });
      }
    });
  }, [clonedScene, preparedTexture, activeTexturePath]);

  useFrame(() => {
    if (!robotRef.current) return;
    if (interactive && targetRotation) {
      robotRef.current.rotation.y = THREE.MathUtils.lerp(
        robotRef.current.rotation.y,
        targetRotation.y * 0.7,
        0.15
      );
      robotRef.current.rotation.x = THREE.MathUtils.lerp(
        robotRef.current.rotation.x,
        targetRotation.x * 0.45,
        0.15
      );
    }
  });

  return (
    <group ref={robotRef} position={position} scale={scale}>
      <group position={centerOffset}>
        <primitive object={clonedScene} />
      </group>
      <mesh position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.8, 32]} />
        <meshBasicMaterial color="#94A3B8" opacity={0.2} transparent />
      </mesh>
    </group>
  );
};

// 2. STL Fallback Component with Active Texture Applied
const RobotSTLModel = ({
  activeTexturePath,
  scale,
  position,
  interactive,
  targetRotation,
}) => {
  const robotRef = useRef();
  const geometry = useLoader(STLLoader, '/models/Robot/Robot.stl');
  const colorTexture = useLoader(THREE.TextureLoader, activeTexturePath);

  // Load authentic PBR texture maps
  const [normalMap, roughnessMap, metalnessMap] = useLoader(THREE.TextureLoader, [
    '/models/Robot/textures/Robot_DefaultMaterial_Normal.png',
    '/models/Robot/textures/Robot_DefaultMaterial_Roughness.png',
    '/models/Robot/textures/Robot_DefaultMaterial_Metalness.png',
  ]);

  useEffect(() => {
    if (colorTexture) {
      colorTexture.colorSpace = THREE.SRGBColorSpace;
      colorTexture.wrapS = THREE.RepeatWrapping;
      colorTexture.wrapT = THREE.RepeatWrapping;
      colorTexture.needsUpdate = true;
    }
    if (normalMap) {
      normalMap.wrapS = THREE.RepeatWrapping;
      normalMap.wrapT = THREE.RepeatWrapping;
    }
    if (roughnessMap) {
      roughnessMap.wrapS = THREE.RepeatWrapping;
      roughnessMap.wrapT = THREE.RepeatWrapping;
    }
    if (metalnessMap) {
      metalnessMap.wrapS = THREE.RepeatWrapping;
      metalnessMap.wrapT = THREE.RepeatWrapping;
    }
  }, [colorTexture, normalMap, roughnessMap, metalnessMap]);

  // Center geometry and project upright UV coordinates along vertical axis
  const processedGeometry = useMemo(() => {
    const geom = geometry.clone();
    // Rotate geometry from Blender Z-up to Three.js Y-up
    geom.rotateX(-Math.PI / 2);
    geom.center();
    geom.computeVertexNormals();

    const pos = geom.attributes.position;
    const count = pos.count;
    geom.computeBoundingBox();
    const { min, max } = geom.boundingBox;
    const height = max.y - min.y || 1;

    const uvs = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Cylindrical mapping around upright vertical axis Y
      const u = 0.5 + Math.atan2(x, z) / (2 * Math.PI);
      const v = (y - min.y) / height;

      uvs[i * 2] = u;
      uvs[i * 2 + 1] = v;
    }
    geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    return geom;
  }, [geometry]);

  useFrame(() => {
    if (!robotRef.current) return;
    if (interactive && targetRotation) {
      robotRef.current.rotation.y = THREE.MathUtils.lerp(
        robotRef.current.rotation.y,
        targetRotation.y * 0.7,
        0.15
      );
      robotRef.current.rotation.x = THREE.MathUtils.lerp(
        robotRef.current.rotation.x,
        targetRotation.x * 0.45,
        0.15
      );
    }
  });

  return (
    <group ref={robotRef} position={position} scale={scale}>
      <mesh
        geometry={processedGeometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#FFFFFF"
          map={colorTexture}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.6, 0.6)}
          roughnessMap={roughnessMap}
          roughness={0.7}
          metalnessMap={metalnessMap}
          metalness={0.2}
          envMapIntensity={1.2}
        />
      </mesh>

      <mesh position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.8, 32]} />
        <meshBasicMaterial color="#94A3B8" opacity={0.2} transparent />
      </mesh>
    </group>
  );
};

let cachedGlbAvailable = null;

// Main Exported Component
export const RobotCustomModel3D = ({
  scale = 1.25,
  position = [0, -0.15, 0],
  interactive = true,
  targetRotation = { x: 0, y: 0 },
  textureUrl,
  color,
}) => {
  const storeColor = useCustomizerStore((state) => state.color);
  const activeColor = color || storeColor;
  const activeTexturePath = textureUrl || activeColor?.texture || '/models/Robot/textures/Mauxanh.png';

  const [glbAvailable, setGlbAvailable] = useState(cachedGlbAvailable === true);
  const [checked, setChecked] = useState(cachedGlbAvailable !== null);

  // Check if Robot.glb exists on the server (cached across mounts)
  useEffect(() => {
    if (cachedGlbAvailable !== null) return;
    let isMounted = true;
    fetch('/models/Robot/Robot.glb', { method: 'HEAD' })
      .then((res) => {
        cachedGlbAvailable = res.ok;
        if (isMounted) {
          setGlbAvailable(res.ok);
          setChecked(true);
        }
      })
      .catch(() => {
        cachedGlbAvailable = false;
        if (isMounted) {
          setGlbAvailable(false);
          setChecked(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!checked) {
    return null;
  }

  if (glbAvailable) {
    return (
      <GLTFErrorBoundary
        onError={() => setGlbAvailable(false)}
        fallback={
          <RobotSTLModel
            activeTexturePath={activeTexturePath}
            scale={scale}
            position={position}
            interactive={interactive}
            targetRotation={targetRotation}
          />
        }
      >
        <RobotGLBModel
          activeTexturePath={activeTexturePath}
          scale={scale}
          position={position}
          interactive={interactive}
          targetRotation={targetRotation}
        />
      </GLTFErrorBoundary>
    );
  }

  return (
    <RobotSTLModel
      activeTexturePath={activeTexturePath}
      scale={scale}
      position={position}
      interactive={interactive}
      targetRotation={targetRotation}
    />
  );
};

export default RobotCustomModel3D;
