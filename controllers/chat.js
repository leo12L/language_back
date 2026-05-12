const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KT });



const getChat = async (req, res) => {
  const { message } = req.body;
  console.log("This is message=>", message)
  const chatCompletion = await genereteChat(message);
  res.json({ reply: chatCompletion.choices[0]?.message?.content });
}

const genereteChat = async(message) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama-3.1-8b-instant",
  });
}

module.exports = {
  getChat,
  genereteChat,
}