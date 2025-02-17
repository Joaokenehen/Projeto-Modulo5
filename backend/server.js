require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(cors());
app.use(express.json());

app.get('/teste', (req, res) => {
  res.json({ message: 'funcionando!' });
});

app.get('/frontend', (req, res) => {
    res.json({ message: ' frontend funcionando com backend',
        imgurl: 'https://lastfm.freetls.fastly.net/i/u/770x0/3147132525dcc2b9182d71d8bb1874a9.jpg#3147132525dcc2b9182d71d8bb1874a9'
     });
    });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
