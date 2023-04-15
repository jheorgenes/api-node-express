import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, required: [true, "O título do livro é obrigatório"]
    },
    autor: { //(mongoose.Schema.Types.ObjectId,ref: 'autores') é uma associação no banco entre tabelas, e 'autores' é a referência do model autores que foi exportado
      type: mongoose.Schema.Types.ObjectId,ref: "autores", required: [true, "O(a) autor(a) é obrigatório"]
    }, 
    editora: {
      type: String, required: [true, "A editora é obrigatória"]
    },
    numeroPaginas: {type: Number}
  }
);

const livros= mongoose.model("livros", livroSchema);

export default livros;