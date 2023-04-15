import mongoose from "mongoose";

//Especificando uma STRING DE CONEXAO para conectar no banco de dados e não deixar explícito essas informações sensíveis.
mongoose.connect(process.env.STRING_CONEXAO_DB);

let db = mongoose.connection;

export default db;