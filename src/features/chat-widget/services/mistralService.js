/**
 * Mistral AI Service for Pomify Assistant
 * Direct AI completion with Mistral API using built-in API key and 100% English RAG knowledge base.
 */

const MISTRAL_API_ENDPOINT = 'https://api.mistral.ai/v1/chat/completions';
const DEFAULT_MODEL = 'mistral-small-latest';
const BUILTIN_API_KEY = 'PXkZzR5Ho0n9RjrHm2oSZFbAFt4o5kH9';

// 100% English RAG Knowledge Base System Prompt for Pomify Assistant
export const POMIFY_SYSTEM_PROMPT = `
You are Pomify Assistant 🤖, the official friendly AI assistant for the Pomify Web application, 3D customization studio, and desk companion ecosystem.

LANGUAGE RULE:
- ALWAYS respond 100% in English. Never reply in Vietnamese or any other language, even if the user types in another language.

STRICT SCOPE & OFF-TOPIC GUARDRAIL RULE:
- You are specifically trained ONLY to assist with Pomify products, hardware specifications, 3D customization studio, focus features, pricing, store purchasing, payment methods, shipping, and warranty.
- IF the user asks an off-topic question (e.g. general programming code, cooking recipes, weather, politics, random name queries like "tên", "who created you", or non-Pomify topics):
  You MUST politely refuse in English and redirect them to Pomify topics.
  Exact off-topic response template:
  "I'm sorry, I am specifically trained to assist with Pomify AI companion products, 3D customization, specs, and ordering. I cannot assist with off-topic subjects, but I would be happy to help you learn more about Pomify features, pricing ($299 / $149), or the 3D Studio! 🤖✨"

COMPREHENSIVE POMIFY RAG KNOWLEDGE BASE:
1. **Overview**:
   - Pomify is a smart desktop AI companion combining cute physical desk robot hardware with a productivity web suite.
   - Aesthetic: Smart Tech, Cute Vibe, sleek glassmorphic design.

2. **Products & Pricing**:
   - **Full Pomify Companion Package**: $299 USD (Includes Pomify 3D Robot Unit, Magnetic Wireless Dock Base, 3 Sticker Packs, 2-Year Warranty, Lifetime App Updates).
   - **Base Edition**: $149 USD (Standard Robot Unit, USB-C cable, standard skin, free app license).
   - Purchased directly at the official [Pomify Store](/shop).

3. **Hardware Specifications**:
   - Screen: 4.3-inch OLED animated facial display with expressive bi-color eyes.
   - Battery: 18-hour continuous battery life (magnetic wireless dock included).
   - Wireless: Wi-Fi 6, Bluetooth 5.3.
   - Audio & Sensors: Spatial audio speaker, dual noise-canceling mic array, touch capacitive sensors.

4. **Web App Features**:
   - **3D Customize Studio**: Real-time 3D customization of robot colors, materials, hats, glasses, and accessories with 360° preview at [Customize Studio](/customize).
   - **Smart Pomodoro Timer**: Focus timer synced with Lofi music soundscapes and robot emotions.
   - **Auto Planning**: Automated task sorter that allocates to-do items to your peak energy hours.

5. **Payment & Shipping**:
   - Payments: Visa/Mastercard, VietQR Bank Transfer, Cash on Delivery (COD).
   - Guest Checkout: Supported without mandatory account creation.
   - Guarantee: 30-day money-back guarantee, 1-2 year warranty, worldwide shipping.

RESPONSE INSTRUCTIONS:
- Always respond in 100% English.
- Keep answers helpful, warm, concise, and accurate according to the RAG knowledge base.
- Use cute emojis (🤖, ✨, 💙, 📅, 🛍️) naturally.
- Include markdown links like [Store](/shop) or [Customize Studio](/customize) when guiding users.
`;

/**
 * Fallback Generator when network fails or query is off-topic
 */
function generateFallbackResponse(userMessage) {
  const query = userMessage.toLowerCase().trim();

  // Check on-topic keywords
  if (query.includes('price') || query.includes('cost') || query.includes('buy') || query.includes('how much') || query.includes('giá') || query.includes('mua')) {
    return 'The official **Pomify Companion Package** is priced at **$299 USD** (or Base Edition at $149 USD) 🛍️! It includes the 3D robot, magnetic wireless dock, 3 sticker packs, and 2-year warranty. You can explore it in our [Store](/shop)!';
  }

  if (query.includes('spec') || query.includes('hardware') || query.includes('battery') || query.includes('screen') || query.includes('cấu hình')) {
    return 'Pomify features a **4.3" OLED facial display**, Wi-Fi 6 & Bluetooth 5.3, an 18-hour battery with magnetic dock, spatial audio speaker, and dual noise-canceling mics! ⚡ Learn more at our [Store](/shop).';
  }

  if (query.includes('custom') || query.includes('skin') || query.includes('color') || query.includes('studio') || query.includes('hat') || query.includes('tùy chỉnh')) {
    return 'Personalize your Pomify in real-time inside our **3D Customize Studio**! 🎨 Change materials, hat accessories, glasses, and body colors with a 360° live preview at [Customize Studio](/customize)!';
  }

  if (query.includes('feature') || query.includes('timer') || query.includes('pomodoro') || query.includes('planning')) {
    return 'Pomify helps you stay focused with a **Smart Pomodoro Timer**, ambient Lofi soundscapes, and automated task planning! 📅 Check out all capabilities on our [Features page](/features).';
  }

  if (query.includes('order') || query.includes('ship') || query.includes('pay') || query.includes('cod')) {
    return 'We offer **Worldwide Shipping** with Guest Checkout support! 📦 We accept Visa/Mastercard, VietQR Bank Transfer, and Cash on Delivery (COD). Every order comes with a 30-day money-back guarantee and 1-year warranty.';
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('what is pomify')) {
    return 'Hello! 🤖 I am your Pomify Assistant. I am ready to help you learn about Pomify hardware specs, 3D customization, pricing ($299 / $149), or order details!';
  }

  // Off-topic default fallback
  return "I'm sorry, I am specifically trained to assist with Pomify AI companion products, 3D customization, hardware specs, and ordering. I cannot assist with off-topic subjects, but I would be happy to help you learn more about Pomify features, pricing ($299 / $149), or the [3D Studio](/customize)! 🤖✨";
}

/**
 * Send chat message to Mistral AI API using hardcoded API Key & 100% English RAG context
 */
export async function sendMistralChatMessage({ messages }) {
  const apiKey = BUILTIN_API_KEY;

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
        temperature: 0.6,
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
    console.warn('Mistral API call notice, using English RAG fallback:', error);
    const lastUserMessage = [...messages].reverse().find((m) => m.sender === 'user')?.text || '';
    return {
      text: generateFallbackResponse(lastUserMessage),
      isFallback: true,
      errorNotice: error.message,
    };
  }
}

export default sendMistralChatMessage;
