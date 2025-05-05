const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Substitua pelos seus valores da Z-API
const token = "E5B1E4CB01F1B9F236FCED95";  // token da Z-API
const instancia = "3E0B7DA2FA9790AEE56202121E6AE94B";  // ID da instância Z-API

// Rota para receber as mensagens do WhatsApp
app.post("/webhook", async (req, res) => {
  try {
    const message = req.body.message?.body;  // Corpo da mensagem recebida
    const sender = req.body.message?.from;   // Número do remetente

    if (message && sender) {
      console.log(`Mensagem recebida: ${message} de ${sender}`);

      // Resposta simples (você pode personalizar mais aqui)
      const resposta = `Você disse: "${message}"`;

      // Envia a resposta usando a Z-API
      await axios.post(`https://api.z-api.io/instances/${instancia}/token/${token}/send-text`, {
        phone: sender,
        message: resposta,
      });

      console.log("Mensagem enviada com sucesso!");
    } else {
      console.log("Sem mensagem ou número de remetente.");
    }

    res.sendStatus(200);  // Responde OK para a Z-API
  } catch (error) {
    console.error("Erro ao processar a mensagem:", error);
    res.sendStatus(500);  // Caso ocorra erro, responde com erro
  }
});

// Inicia o servidor na porta definida
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
