const express = require('express');
const app = express();
const port = 8003;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Form.html');
});

app.listen(port, () => {
  console.log(`Exercicio 1 hospedado em porta:  ${port}`)
});