let express = require("express");
let bodyParser = require("body-parser");

let router = express.Router();
let app = express();

app.use(express.static(__dirname));
app.use("/",router);

let encodeUrl = bodyParser.urlencoded({ extended: false });

router.get('/', function(req,res){
    res.sendfile("login.html");
});

router.post('/', encodeUrl, (req, res) => {
    console.log("Post da aplicacão");

    console.log("Usuario: " + req.body.usuario);
    console.log("senha: " + req.body.senha);
    let usuario = req.body.usuario;
    let senha = req.body.senha;

    if (usuario == "nicolas" && senha == "123") {
      res.sendfile("acesso.html");  
    } else {
        res.end("<script>alert('Usuário ou senha incorretos!'); history.go(-1); </script>");  
    }

    
} );


app.listen(3000, () => {
    console.log("Aplicação de login com post subiu na porta 3000")
})

