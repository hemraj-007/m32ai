const axios = require('axios');

const generateContent = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api.cohere.ai/generate',
      {
        model: 'command',
        prompt,
        max_tokens: 300,
        temperature: 0.7,
        k: 0,
        stop_sequences: [],
        return_likelihoods: 'NONE',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const output = response.data?.text;
    if (!output) throw new Error("Cohere returned no text");

    return output;
  } catch (err) {
    throw new Error('Cohere API failed');
  }
};

module.exports = { generateContent };
