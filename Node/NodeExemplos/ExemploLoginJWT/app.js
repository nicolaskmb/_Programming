let express = require("express");
let jwt = require("jsonwebtoken");
let bodyParser = require("body-parser");
const port = 5000;

let encodeUrl = bodyParser.urlencoded({ extended: false });
let app = express();
app.use(express.static(__dirname));

let segredo = "Conteudo secreto do token";
let chaveCabec = "token";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/", encodeUrl, (req, res) => {
  let usuario = req.body.usuario;
  let senha = req.body.senha;

  let dados = {
    Data: new Date(),
    id: "Nicolas",
  };

  segredo = senha;
  let token = jwt.sign(dados, segredo);
  res.status(200).send(token);
});

app.post("/user/generateToken/", (req, res) => {
  let dados = {
    Data: new Date(),
    id: "Nicolas",
  };

  let token = jwt.sign(dados, segredo);
  res.send(token);
});

app.get("/user/validateToken/", (req, res) => {
  try {
    let tokenText = req.header(chaveCabec);
    let tokenVerify = jwt.verify(tokenText, segredo);
    console.log("Hash do token");
    console.log(tokenText);
    console.log("Conteudo de token");
    console.log(tokenVerify);

    if (tokenVerify) {
      res.send("Verificação de token concluída com sucesso!");
    }
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
  res.status(401);
});

app.listen(port, () => console.log(`Aplicação na porta ${port}`));
