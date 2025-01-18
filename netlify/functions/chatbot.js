const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { question } = JSON.parse(event.body);

  try {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Sai Mounika's portfolio assistant." },
          { role: "user", content: question }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ response: data.choices[0].message.content })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error processing request" })
    };
  }
};