import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {type: String, required: true},
    autor: {type: mongoose.Schema.Types.ObjectId,ref: 'autores', required: true}, //(mongoose.Schema.Types.ObjectId,ref: 'autores') é uma associação no banco entre tabelas, e 'autores' é a referência do model autores que foi exportado
    editora: {type: String, required: true},
    numeroPaginas: {type: Number}
  }
);

const livros= mongoose.model('livros', livroSchema);

export default livros;