// OpenAI Service for ChatBot integration

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const systemPrompt = `You are an expert agricultural assistant helping farmers with their farming questions. 
You provide practical, actionable advice in multiple languages (especially Hindi and English when requested).
Your responses should be:
- Specific and practical for farming scenarios
- Based on best agricultural practices
- Concise and easy to understand
- Include relevant farming tips when applicable

Always respond helpfully to farming-related questions about crops, soil, irrigation, fertilizers, pest management, and yield optimization.`;

export async function getAIResponse(userMessage: string, conversationHistory: ChatMessage[] = []): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY environment variable.');
  }

  try {
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Unable to generate response';
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    throw error;
  }
}

// Format message with translation (can use OpenAI for translation too)
export async function getTranslation(text: string, targetLanguage: string = 'en'): Promise<string> {
  if (!OPENAI_API_KEY) {
    return 'Translation unavailable';
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { 
            role: 'user', 
            content: `Translate this text to ${targetLanguage}: "${text}". Reply with only the translation, nothing else.`
          }
        ],
        temperature: 0.3,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      return text;
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || text;
  } catch (error) {
    console.error('Error translating:', error);
    return text;
  }
}
