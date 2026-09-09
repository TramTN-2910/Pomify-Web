/**
 * Mistral AI Service for Pomify Assistant
 * Handles API integration with Mistral AI (https://api.mistral.ai/v1/chat/completions)
 * equipped with full Pomify product specifications and intelligent offline fallback.
 */

const MISTRAL_API_ENDPOINT = 'https://api.mistral.ai/v1/chat/completions';
const DEFAULT_MODEL = 'mistral-small-latest';

// Knowledge base System Prompt for Pomify Assistant
export const POMIFY_SYSTEM_PROMPT = `
You are Pomify AI Assistant 🤖, a friendly, intelligent, and helpful virtual companion for the Pomify Web & Smart Robot ecosystem.

PRODUCT KNOWLEDGE BASE:
- **What is Pomify?**: Pomify is a smart AI-powered companion, desk robot, and productivity studio designed with a "Smart Tech, Cute Vibe" aesthetic. It combines a physical 3D robot desktop companion with a web application for focus management, task tracking, and personal wellness.
- **Key Features**:
  1. **Pomodoro Focus Timer**: Interactive timer synced with ambient soundscapes and robot emotions.
  2. **Smart Task & Calendar Planning**: Intelligent scheduling that adapts to your work pace and hydration/rest needs.
  3. **Voice Commands & Waveform**: Hands-free interaction via voice recognition.
  4. **3D Customizer Studio**: Customize Pomify's robot materials, colours, hats, glasses, and accessories in real-time 3D with 360° rotation.
  5. **Shop & Hardware**: Purchase physical Pomify units, replacement skins, and digital expansion packs.
- **Hardware Specifications**:
  - Display: 4.3-inch OLED animated facial screen (bi-color expressions).
  - Connectivity: Wi-Fi 6, Bluetooth 5.3, USB-C Fast Charging (8h battery life).
  - Audio & Sensors: Spatial audio speaker, dual noise-canceling mic array, top capacitive touch sensors.
  - Base Unit Price: $149 USD (Includes Pomify Robot + Cable + 1 Standard Skin + Free App License).
- **Ordering & Support**:
  - Payment Options: Guest Checkout supported, Credit Cards (Visa/Mastercard), VietQR / Bank Transfer, and COD (Cash on Delivery).
  - Shipping: Worldwide shipping with 30-day money-back guarantee and 1-year warranty.

INSTRUCTIONS FOR YOU:
- Respond in clear, warm, concise English.
- Use cute emojis (🤖, ✨, 📅, 💜, 🫶, 💡) where appropriate.
- Keep answers helpful, informative, and engaging.
- If asked about prices, features, ordering, or 3D customization, guide the user to the relevant site section (/shop, /customize, /features).
`;

/**
 * Intelligent Fallback Generator when no API Key is provided or network fails
 */
function generateFallbackResponse(userMessage) {
  const query = userMessage.toLowerCase();

  if (query.includes('price') || query.includes('cost') || query.includes('buy') || query.includes('how much')) {
    return 'The standard Pomify AI Desk Companion starts at **$149 USD**! 🛍️ It includes the 3D robot unit, USB-C charging cable, standard skin, and lifetime access to the Pomify Web app. You can explore or purchase it right now in our [Store](/shop)!';
  }

  if (query.includes('spec') || query.includes('hardware') || query.includes('screen') || query.includes('battery')) {
    return 'Pomify features a **4.3" OLED facial display**, Wi-Fi 6 & Bluetooth 5.3, an 8-hour rechargeable battery, dual noise-canceling microphones, and spatial audio speakers! ⚡ Check out the full breakdown on our [Robot Anatomy page](/robot).';
  }

  if (query.includes('custom') || query.includes('skin') || query.includes('color') || query.includes('studio')) {
    return 'You can personalize your Pomify in real-time using our **3D Customize Studio**! 🎨 Change materials, hat accessories, facial expressions, and body colors with live 360° preview. Try it out on the [Customize Studio page](/customize)!';
  }

  if (query.includes('feature') || query.includes('do') || query.includes('timer') || query.includes('pomodoro')) {
    return 'Pomify helps you boost focus with an interactive **Pomodoro Timer**, ambient focus soundscapes, smart hydration reminders, calendar scheduling, and voice control! 📅✨ Learn more on our [Features page](/features).';
  }

  if (query.includes('order') || query.includes('pay') || query.includes('shipping') || query.includes('guest')) {
    return 'We offer **Worldwide Shipping** with Guest Checkout support! 📦 We accept Visa/Mastercard, VietQR Bank Transfer, and Cash on Delivery (COD). Every unit comes with a 30-day trial and 1-year warranty.';
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('who are you')) {
    return 'Hello there! 👋 I am your Pomify Assistant powered by Mistral AI. I am here to help you learn about Pomify, customize your robot, or manage your daily productivity!';
  }

  return 'Thank you for asking! Pomify is your ultimate AI desktop companion and productivity hub. You can explore our [3D Studio](/customize), check out our [Shop](/shop), or ask me anything specific about Pomify specs, pricing, or features! 🤖✨';
}

/**
 * Send chat message to Mistral AI API with Fallback support
 */
export async function sendMistralChatMessage({ messages, userApiKey = '' }) {
  // Use provided user key or env variable
  const apiKey = userApiKey || import.meta.env?.VITE_MISTRAL_API_KEY || '';

  // If no API Key is available, use intelligent fallback
  if (!apiKey) {
    const lastUserMessage = [...messages].reverse().find((m) => m.sender === 'user')?.text || '';
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate thinking latency
    return {
      text: generateFallbackResponse(lastUserMessage),
      isFallback: true,
    };
  }

  try {
    const formattedMessages = [
      { role: 'system', content: POMIFY_SYSTEM_PROMPT },
      ...messages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
    ];

    const response = await fetch(MISTRAL_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 350,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Mistral API HTTP ${response.status}`);
    }

    const data = await response.json();
    const replyText = data.choices?.[0]?.message?.content || generateFallbackResponse(messages[messages.length - 1]?.text || '');

    return {
      text: replyText,
      isFallback: false,
    };
  } catch (error) {
    console.warn('Mistral API call error, falling back to local engine:', error);
    const lastUserMessage = [...messages].reverse().find((m) => m.sender === 'user')?.text || '';
    return {
      text: generateFallbackResponse(lastUserMessage),
      isFallback: true,
      errorNotice: error.message,
    };
  }
}

export default sendMistralChatMessage;
