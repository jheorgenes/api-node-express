import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, required: [true, "O título do livro é obrigatório"]
    },
    autor: { //(mongoose.Schema.Types.ObjectId,ref: 'autores') é uma associação no banco entre tabelas, e 'autores' é a referência do model autores que foi exportado
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores", 
      required: [true, "O(a) autor(a) é obrigatório"],
      autopopulate: { select: "nome"}
    }, 
    editora: {
      type: String, required: [true, "A editora é obrigatória"],
      enum: {
        values: ["Casa do código", "Alura"],
        message: "A editora '{VALUE}' não é um valor permitido"
      }
    },
    /**
     * Validação personalizada
     * A propriedade passada para o campo sempre se chama validate, seja ela uma função ou um objeto. 
     * Nesse caso, como é um objeto, ele deve ter uma função chamada validator, que recebe como parâmetro o valor fornecido para o campo 'numeroPaginas' e retorna true ou false para validar ou não o campo. 
     * Essa sintaxe de objeto também permite que a propriedade message seja passada para personalizar a mensagem de erro do campo.
     */
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => valor >= 10 && valor <= 5000,
        message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
      // validação simples de min e max de números
      // min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
      // max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"]
    }
  }
);

livroSchema.plugin(autopopulate);
const livros= mongoose.model("livros", livroSchema);

export default livros;