const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const OPENAI_KEY = "sua_openai_key_aqui";
const ZAPI_INSTANCE = "sua_instance_id";
const ZAPI_TOKEN = "seu_token_zapi";

app.post("/webhook", async (req, res) => {
  const mensagem = req.body.message?.body;
  const telefone = req.body.message?.from;

  if (!mensagem || !telefone) return res.sendStatus(200);

  console.log(`Mensagem de ${telefone}: ${mensagem}`);

  try {
    const gptResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: mensagem }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const resposta = gptResponse.data.choices[0].message.content;

    await axios.post(
      `https://api.z-api.io/instances/${ZAPI_INSTANCE}/token/${ZAPI_TOKEN}/send-text`,
      {
        phone: telefone,
        message: resposta,
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.error("Erro ao responder:", error?.response?.data || error);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => res.send("Bot Fiber Nasa ativo"));
app.listen(process.env.PORT || 3000, () => console.log("Servidor rodando"));
