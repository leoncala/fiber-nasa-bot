// Importando o express
const express = require("express");
const axios = require("axios");  // Para fazer requisições HTTP

// Inicializando o app do express
const app = express();

// Configurando o express para interpretar o corpo da requisição como JSON
app.use(express.json());

// Variáveis da Z-API
const instancia = "3E0B7DA2FA9790AEE56202121E6AE94B";  // Substitua pelo seu ID de instância
const token = "E5B1E4CB01F1B9F236FCED95";  // Substitua pelo seu token

// Rota para receber as mensagens do WhatsApp
app.post("/webhook", async (req, res) => {
  try {
    // Log para ver a estrutura da requisição
    console.log("Corpo da requisição recebida:", req.body);

    const message = req.body.text?.message;  // Corpo da mensagem recebida (ajustado para o novo campo)
    const sender = req.body.phone;            // Número do remetente (ajustado para o novo campo)

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

// Definindo a porta para o servidor Express
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
