const express = require('express');
const app = express();
const port = 8001;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/imagem.html');
});

app.listen(port, () => {
  console.log(`Exemplo de aplicação escutando na porta  ${port}`)
});