const express = require("express");
const server = express();

//Configurando a pasta pública
server.use(express.static("public"));

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
    return resp.render("create-point.html");
})

server.get("/search", (req,resp) => {
    return resp.render("search-results.html");
})
//Ligar o servidor
server.listen(3000);