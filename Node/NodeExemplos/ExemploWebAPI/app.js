let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let clientes = [];

let cliente1 = {
    id: 1,
    nome: 'Nicolas',
    endereco: 'Rua Joao Colin, 243',
    sexo: 'masculino',
    telefone: '47989244434',
};

clientes.push(cliente1);

let cliente2 = {
    id: 2,
    nome: 'Eduarda',
    endereco: 'Rua Joao Colin, 164',
    sexo: 'feminino',
    telefone: '47989546766'
};

clientes.push(cliente2);    

app.get('/api/v1/clientes', (req, res) => {

    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify(clientes));
});

app.listen(5000, () => {
    console.log("Aplicação de api, porta: 5000!")
});