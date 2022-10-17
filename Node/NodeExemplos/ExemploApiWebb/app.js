let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const { application } = require("express");
const { json } = require("body-parser");
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static(__dirname + "\\form.html"));
app.use(express.static(__dirname + "/styleforms.css"));

let router = express.Router();
app.use("/form/", router);
let encodeUrl = bodyParser.urlencoded({ extended: false });

let clientes = [];

let cliente = {
  id: 1,
  nome: "John J Jonathan",
  endereco: "Rua Saturnino de brito 64",
  sexo: "Masculino",
  telefone: "234242999",
};

clientes.push(cliente);

let cliente2 = {
  id: 2,
  nome: "Ane Winter",
  endereco: "Rua Esqueci, 95",
  sexo: "Feminino",
  telefone: "2345342999",
};

clientes.push(cliente2);

let cliente3 = {
  id: 3,
  nome: "Gustavo Moretti da Silva",
  endereco: "Rua Saturday of brito, 74",
  sexo: "Masculino",
  telefone: "2345342999",
};

clientes.push(cliente3);

let cliente4 = {
  id: 4,
  nome: "Teste da Silva",
  endereco: "Rua Saturday of brito, 74",
  sexo: "Masculino",
  telefone: "23423422999",
};

clientes.push(cliente4);

let cliente5 = {
  id: 5,
  nome: "Testolina da Silva Sauro",
  endereco: "Rua dos testes, 74",
  sexo: "Feminino",
  telefone: "23423422999",
};

clientes.push(cliente5);

app.get("/form/", (req, res) => {
  console.log("mudanca 3333 get do form!!!!!");
  console.log(__dirname + "\\form.html");
  res.sendFile(__dirname + "/form.html");
});

app.get("/api/v1/clientes/ultimo/", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(clientes[clientes.length - 1].id));
});

app.get("/api/v1/clientes/primeiro/", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(clientes[0].id));
});

app.get("/api/v1/clientes/", (req, res) => {
  console.log("get no metodo de listagem de clientes");

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(clientes));
});

app.get("/api/v1/clientes/:id", (req, res) => {
  let clienteLocalizado = clientes.find(
    (cliente) => cliente.id == req.params.id
  );
  let posicao = clientes.indexOf(clienteLocalizado);

  let posanterior = posicao - 1;
  let posproximo = parseInt(req.params.id) + 1;
  console.log("soma dos valores de id " + posproximo);
  let cliAnterior = clientes[posanterior];
  let cliPosterior = clientes.find((cliente) => cliente.id >= posproximo);
  if (cliAnterior != null) {
    clienteLocalizado.prev = cliAnterior.id;
  } else {
    clienteLocalizado.prev = null;
  }

  if (cliPosterior != null) {
    clienteLocalizado.next = cliPosterior.id;
  } else {
    clienteLocalizado.next = null;
  }

  let statusHttp = 200;

  if (clienteLocalizado == null) {
    statusHttp = 404;
  }

  res.writeHead(statusHttp, { "Content-Type": "application/json" });
  res.end(JSON.stringify(clienteLocalizado));
});

app.get("/api/v1/clientes/nome/:nome", (req, res) => {
  let clienteLocalizado = clientes.find((cliente) =>
    cliente.nome.toLowerCase().includes(req.params.nome.toLowerCase())
  );
  let statusHttp = 200;

  if (clienteLocalizado == null) {
    statusHttp = 404;
  }

  res.writeHead(statusHttp, { "Content-Type": "application/json" });
  res.end(JSON.stringify(clienteLocalizado));
});

app.post("/api/v1/clientes/", encodeUrl, (req, res) => {
  console.log("post de cliente");
  let codigoStatushttp = 201;
  let novoCliente = req.body;

  let maiorid = Math.max(...clientes.map((o) => o.id));

  console.log("maiorid " + maiorid);

  if (maiorid > 0) {
    maiorid++;
  } else {
    maiorId = 1;
  }

  novoCliente.id = maiorid;
  clientes.push(novoCliente);

  res.writeHead(codigoStatushttp, { "Content-Type": "application/json" });
  res.end(JSON.stringify(novoCliente));
});

app.put("/api/v1/clientes/:id", encodeUrl, (req, res) => {
  console.log("método put para alteração de clientes");
  let clienteAntigo = clientes.find((cliente) => cliente.id == req.params.id);
  if (clienteAntigo == null) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify("Cliente não localizado com o id " + req.params.id));
  } else {
    let novoCliente = req.body;
    let campos = ["nome", "endereco", "sexo", "telefone"];

    if (Object.keys(novoCliente).some((o) => campos.includes(o))) {
      clienteAntigo.nome = novoCliente.nome;
      clienteAntigo.endereco = novoCliente.endereco;
      clienteAntigo.sexo = novoCliente.sexo;
      clienteAntigo.telefone = novoCliente.telefone;

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(clienteAntigo));
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify("Objeto JSon de cliente Inválido! "));
    }
  }
});

app.delete("/api/v1/clientes/:id", (req, res) => {
  console.log("delete req.params.id " + req.params.id);
  let clienteaDeletar = clientes.find((cliente) => cliente.id == req.params.id);
  if (clienteaDeletar == null) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify("Cliente não existe com o código " + req.params.id));
  } else {
    let posicao = clientes.indexOf(clienteaDeletar);
    console.log("posicao " + posicao);
    clientes.splice(posicao, 1);
    if (clientes[posicao + 1] != null) {
      posicao = clientes[posicao + 1].id;
    } else {
      posicao = clientes[posicao - 1].id;
    }
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(posicao));
  }
});

app.listen(5001, () => {
  console.log("Aplicação de API subiu na porta 5001");
});
