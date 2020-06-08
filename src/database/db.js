//Importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//Iniciar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

//Utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {
    //Criar uma tabela com comandos sql

    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)

    //Inserir dados com comandos sql
    
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `

    // const values = [
    //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    //     "Papersider",
    //     "Guilherme Gemballa, Jardim América",
    //     "Nº 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Papeis e Papelões"
    // ];

    // db.run(query, values, function(err){
    //     if(err){
    //         return console.log(err);
    //     }

    //     console.log("Cadastrado com sucesso!");
    //     console.log(this);
    // })

    //Consultar dados com comandos sql
    // db.all(`SELECT * FROM places`, function(err, rows){
    //     if(err){
    //         return console.log(err);
    //     }

    //     console.log("Aqui estão seus registros: ");
    //     console.log(rows);
    // })

    // Deletar dados com comandos sql
    // db.run(`DELETE FROM places WHERE id = ?`, [9], function(err){
    //     if(err){
    //         console.log(err);
    //     }

    //     console.log("Registro deletado com sucesso!")
    // })

})