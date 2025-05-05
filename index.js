import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Example route
app.get('/', (req, res) => {
  res.send('Olá, Fiber Nasa Bot está funcionando!');
});

// Your chatbot logic goes here (como integração com o WhatsApp ou com o ChatGPT)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
