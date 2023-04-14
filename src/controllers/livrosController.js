import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = (req, res) => {
    livros
      .find()
      .populate('autor') //Irá popular a entidade autor completa (que estiver vinculado ao livro )
      .exec((err, livros) => res.status(200).json(livros))
  }

  static listarLivroPorId = (req, res) => {
    const id = req.params.id;

    livros
      .findById(id)
      .populate('autor', 'nome') //Irá popular apenas o nome do autor
      .exec((err, livros) => {
        if(err) {
          res.status(400).send({message: `${err.message} - Id do livro não localizado.`})
        } else {
          res.status(200).send(livros);
        }
      })
  }

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);

    livro.save((err) => {
      if(err) {
        res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})
      } else {
        res.status(201).send(livro.toJSON()) //Retorna o json do livro cadastrado
      }
    })
  }

  static atualizarLivro = (req, res) => {
    const id = req.params.id;
    //$set é utilizado para indicar que será feita uma alteração no corpo da requisição
    livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Livro atualizado com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static excluirLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Livro removido com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static listarLivroPorEditora = (req, res) => {
    //Pegando do parâmetro da url definido como editora
    const editora = req.query.editora;
    //Buscando = parâmetro ({'nome de associação do parametro da query': valor do parametro da query}, {opcoes de query}, (callback de erro, callback do model livros)  
    livros.find({'editora': editora}, {}, (err, livros) => {
      res.status(200).send(livros);
    })
  }

}

export default LivroController