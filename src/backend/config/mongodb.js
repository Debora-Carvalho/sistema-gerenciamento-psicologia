// config/db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://serenAdmins:seren123@seren.ow7lda9.mongodb.net/?retryWrites=true&w=majority&appName=Seren";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function connectToDatabase() {
    if (!db) {
        try {
            await client.connect();
            console.log("✅ Conectado ao MongoDB com sucesso!");
            db = client.db("SerenDB"); // nome do banco
        } catch (error) {
            console.error("❌ Erro ao conectar no MongoDB:", error);
            throw error;
        }
    }
    return db;
}

module.exports = connectToDatabase;


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://serenAdmins:seren123@seren.ow7lda9.mongodb.net/?retryWrites=true&w=majority&appName=Seren";
// // por favor utilizar esta conexão acima para conectar no mongodb Compass, apenas o link.

// // criando um cliente mongo com as configurações da api do servidor do mongo.
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// })

// // função apenas para testar a conexão, caso necessário dê cd em src, depois em database e escreva node mongodb.js para ver o funcionamento!

// async function run() {
//   try {
//     // conectando cliente com o database.
//     await client.connect();
//     // ping para confirmar conexão.
//     await client.db("admin").command({ ping: 1 });
//     console.log("Prontinho! Você se conectou ao banco");
//   } finally {
//     // quando terminar desconecta a conexão.
//     await client.close();
//   }
// }
// run().catch(console.dir);

// // exportamos o módulo para que possa ser utilizado a conexão com clientes em nossos outros arquivos js.
// module.exports = { client };