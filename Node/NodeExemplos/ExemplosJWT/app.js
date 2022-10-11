let express = require("express");
let jwt = require("jsonwebtoken");
let app = express();
const port = 5000;

let segredo = "Conteudo secreto do token";
let chaveCabec = "token";

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
