const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Z-API credentials
const ZAPI_INSTANCE_ID = "3E0B7DA2FA9790AEE56202121E6AE94B";
const ZAPI_TOKEN = "E5B1E4CB01F1B9F236FCED95";

// ChatGPT endpoint
const CHATGPT_API = "https://chatgpt.apinepdev.workers.dev/";

// Webhook to receive WhatsApp messages
app.post("/webhook", async (req, res) => {
  const message = req.body?.message?.text?.body;
  const sender = req.body?.message?.from;

  if (!message || !sender) {
    return res.sendStatus(400);
  }

  console.log(`Mensagem recebida de ${sender}: ${message}`);

  try {
    // Consulta à API gratuita do ChatGPT 3.5
    const chatResponse = await axios.post(CHATGPT_API, {
      messages: [{ role: "user", content: message }]
    });

    const reply = chatResponse.data.choices?.[0]?.message?.content || "Desculpe, não entendi.";

    // Enviar resposta pelo WhatsApp via Z-API
    await axios.post(`https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`, {
      phone: sender,
      message: reply
    });

    console.log(`Resposta enviada para ${sender}: ${reply}`);
    res.sendStatus(200);
  } catch (error) {
    console.error("Erro ao responder:", error.message);
    res.sendStatus(500);
  }
});

// Página inicial para teste
app.get("/", (req, res) => {
  res.send("🤖 Fiber Nasa Bot está online!");
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
