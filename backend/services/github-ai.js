const axios = require('axios');

const generateContent = async (prompt) => {
  try {
    const response = await axios.post('https://api.github.com/copilot/chat/completions', {
      model: 'github-chat',
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('GitHub AI Error:', error.response?.data || error.message);
    if (error.response?.status === 404) {
      throw new Error('GitHub Copilot API not accessible. Please ensure you have GitHub Copilot subscription and proper token permissions.');
    }
    throw new Error(error.response?.data?.message || error.message);
  }
};

module.exports = { generateContent }; 