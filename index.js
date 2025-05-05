const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const token = "E5B1E4CB01F1B9F236FCED95"; // token da Z-API
const instancia = "3E0B7DA2FA9790AEE56202121E6AE94B"; // ID da instância Z-API

// Rota para receber mensagens do Z-API
app.post("/webhook", async (req, res) => {
  const message = req.body.message?.body;
  const sender = req.body.message?.from;

  if (message && sender) {
    const resposta = `Olá! Você disse: "${message}"`;

    // Envia a resposta pelo WhatsApp usando a API da Z-API
    await axios.post(`https://api.z-api.io/instances/${instancia}/token/${token}/send-text`, {
      phone: sender,
      message: resposta,
    });
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
