let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

let encodeUrl = bodyParser.urlencoded({ extended: false });

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

let cliente3 = {
    id: 3,
    nome: 'Tulio',
    endereco: 'Rua Joao Colin, 565',
    sexo: 'masculino',
    telefone: '4798937732'
};

clientes.push(cliente3);    

let cliente4 = {
    id: 4,
    nome: 'Pamela',
    endereco: 'Rua Joao Colin, 565',
    sexo: 'feminino',
    telefone: '47989262866'
};

clientes.push(cliente4);  

app.get('/api/v1/clientes', (req, res) => {

    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(clientes));
});

app.get('/api/v1/clientes/:id/', (req, res) => {

    let clienteLocalizado = clientes.find(cliente => cliente.id == req.params.id);
    let statusHttp = 200;
    if (clienteLocalizado != null) {
        statusHttp = 404;
    }

    res.writeHead(statusHttp, {"Content-Type": "application/json"});
    res.end(JSON.stringify(clienteLocalizado));
});

app.get('/api/v1/clientes/nome/:nome/', (req, res) => {

    
    let clienteLocalizado = clientes.find(cliente => cliente.nome.toLowerCase().includes(req.params.nome.toLowerCase()));
    let statusHttp = 200;
    if (clienteLocalizado != null) {
        statusHttp = 404;
    };

    res.writeHead(statusHttp, {"Content-Type": "application/json"});
    res.end(JSON.stringify(clienteLocalizado));
});

app.post('/api/v1/clientes/', encodeUrl, (req, res) => {
    let statusHttp = 200;
    let novoCliente = req.body;
    let maiorId = Math.max(...clientes.map (cliente => cliente.id));

    if (maiorId > 0) {
        maiorId ++;
    } else {
        maiorId = 1;
    };

    novoCliente.id = maiorId;
    clientes.push(novoCliente);

    res.writeHead(statusHttp, {"Content-Type": "application/json"});
    res.end(JSON.stringify(novoCliente));
});

app.put('/api/v1/clientes/:id/', encodeUrl, (req, res) => {
    let clienteAntigo = clientes.find(cliente => cliente.id == req.params.id);
    if (clienteAntigo == null) {
        res.writeHead(400, {"Content-Type": "application/json"});
        res.end(JSON.stringify("Cliente não localizado com o id: " + req.params.id));
    } else {
        let novoCliente = req.body;
        novoCliente.id = clienteAntigo.id;
        let campos = ['nome', 'endereco', 'sexo', 'telefone']
        res.writeHead(201, {"Content-Type": "application/json"});
        res.end(JSON.stringify(novoCliente));
    }
});

app.listen(5000, () => {
    console.log("Aplicação de api, porta: 5000!");
});