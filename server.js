const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors()); // Habilitar CORS para todas as rotas

app.get('/convert', async (req, res) => {
    const { base, target } = req.query; // Obtém 'base' e 'target' da requisição
    const apiKey = process.env.API_KEY; // Chave da API armazenada em variáveis de ambiente
    
    try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/0356ac29cb7f374f47ba57db/latest/USD`);
        res.json(response.data); // Retorna os dados da API para o cliente
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter dados da API' }); // Retorna erro caso falhe
    }
});


app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
