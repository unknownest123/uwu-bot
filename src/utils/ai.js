const axios = require('axios');

const conversationHistory = new Map();

async function getAIResponse(userInput, userId) {
  try {
    // Initialize conversation history for user if not exists
    if (!conversationHistory.has(userId)) {
      conversationHistory.set(userId, []);
    }

    const history = conversationHistory.get(userId);

    // Add user message to history
    history.push({
      role: 'user',
      content: userInput,
    });

    // Keep only last 10 messages for context
    if (history.length > 10) {
      history.shift();
    }

    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are uwu, a cute and helpful Discord bot. Keep responses short and friendly (under 200 characters). Use emojis occasionally. Be playful and fun!',
          },
          ...history,
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiMessage = response.data.choices[0].message.content;

    // Add AI response to history
    history.push({
      role: 'assistant',
      content: aiMessage,
    });

    return aiMessage;
  } catch (error) {
    console.error('AI Error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { getAIResponse };

