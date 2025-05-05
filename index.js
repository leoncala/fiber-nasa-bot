// Rota para receber as mensagens do WhatsApp
app.post("/webhook", async (req, res) => {
  try {
    // Log para ver a estrutura da requisição
    console.log("Corpo da requisição recebida:", req.body);

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

