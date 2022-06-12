const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//bodyparser tradutor de dados para captura no backend
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) =>{
    res.render("index",);
});

app.get("/perguntar", (req, res) =>{
    res.render("perguntar")
})

app.post("/salvarpergunta",(req, res) =>{
    var titulo = req.body.titulo;
    var descrição = req.body.descricao;
    res.send("Formulário recebido! titulo" + " " + titulo + " " + "descrição " + descrição);
});

app.listen(8080, ()=>{
    console.log("App rodando!");
});  