const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/arq.html');
});

app.get('/css/', (req, res) => {
  res.sendFile(__dirname + '/ExemploPosicionamentoZindex.html');
});

app.listen(port, () => {
  console.log(`Exemplo de aplicação escutando na porta  ${port}`)
});