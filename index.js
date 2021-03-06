const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection =require("./database/database");
const Pergunta =  require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//database
connection.authenticate()
.then(()=>{
 console.log("Conexão com banco de dados realizada")
})
.catch ((msgErro)=>{
    console.log(MSGERRO)
})

//estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//bodyparser tradutor de dados para captura no backend
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) =>{
    Pergunta.findAll({raw: true, order:[
        ['id', 'DESC'] // ASC crescente e DESC descrescente
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });
    })
    
});

app.get("/perguntar", (req, res) =>{
    res.render("perguntar")
})

app.post("/salvarpergunta",(req, res) =>{
    var titulo = req.body.titulo;
    var descrição = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descrição,
    }).then(()=>{
        res.redirect("/");
    })
});

    //busca condicional
app.get("/pergunta/:id",(req, res) =>{
    var id = req.params.id;
    Pergunta.findOne({
        where:{id: id},
    
    }).then(pergunta =>{
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId : pergunta.id},
                order:[ ['id', 'DESC'] ]

            }).then(respostas => {
                res.render("pergunta",{
                    pergunta : pergunta,
                    respostas: respostas
            });          
         });
        }else{
            res.redirect("/")
        }
    })
});

    app.post("/responder", (req, res) => {
        var corpo =  req.body.corpo;
        var perguntaId = req.body.pergunta;
        Resposta.create({
            corpo: corpo,
            perguntaId: perguntaId,
        }).then(() => {
            res.redirect("/pergunta/"+perguntaId); 
        })
    });


app.listen(8080, ()=>{
    console.log("App rodando!");
});  