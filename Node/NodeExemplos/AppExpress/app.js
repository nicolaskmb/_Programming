const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Oi Mundo Express!!!');
  console.log('Us guri!');
});

app.listen(port, () => {
  console.log(`Exemplo de aplicação escutando na porta  ${port}`)
});