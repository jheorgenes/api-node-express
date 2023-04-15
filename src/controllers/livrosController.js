import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor") //Irá popular a entidade autor completa (que estiver vinculado ao livro )
        .exec();
      res.status(200).json(livrosResultado);
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros.findById(id)
        .populate("autor", "nome") //Irá popular apenas o nome do autor
        .exec();
      res.status(200).send(livroResultado);
    } catch (erro) {
      res.status(400).send({message: `${erro.message} - Id do livro não localizado.`});
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    try {
      //Pegando do parâmetro da url definido como editora
      const editora = req.query.editora;
      //Buscando = parâmetro ({'nome de associação do parametro da query': valor do parametro da query}, {opcoes de query});
      const livrosResultado = await livros.find({"editora": editora});
      res.status(200).send(livrosResultado);
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON()); //Retorna o json do livro cadastrado
    } catch (erro) {
      res.status(500).send({message: `${erro.message} - falha ao cadastrar livro.`});
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      //$set é utilizado para indicar que será feita uma alteração no corpo da requisição
      await livros.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Livro atualizado com sucesso"});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({message: "Livro removido com sucesso"});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };
  
}

export default LivroController;