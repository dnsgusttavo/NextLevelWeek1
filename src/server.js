const express = require("express");
const server = express();

//Pegar o banco de dados
const db = require("./database/db")

//Configurando a pasta pública
server.use(express.static("public"));

//Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true}))

//Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

//Configurar caminhos
server.get("/", (req,resp) => {
     return resp.render("index.html");
})

server.get("/create-point", (req,resp) => {
    console.log(req.query);
    return resp.render("create-point.html");
})

server.post("/savepoint", (req,resp) => {
    
    console.log(req.query);

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    db.run(query, values, function(err){
        if(err){
            console.log(err);
            return resp.send("Erro no cadastro!");
        }

        console.log("Cadastrado com sucesso!");
        console.log(this);
        return resp.render("create-point.html", {saved: true});
    })

    
})

server.get("/search", (req,resp) => {

    //Pesquisa vazia
    const search = req.query.search;


    if(search == "")
        return resp.render("search-results.html", {total: 0});
    //Pegar os dados do banco de dados
    //Consultar dados com comandos sql
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err);
        }

        console.log("Aqui estão seus registros: ");
        console.log(rows);

        const total = rows.length;
        return resp.render("search-results.html", {places: rows, total: total});
    })

})
//Ligar o servidor
server.listen(3000);