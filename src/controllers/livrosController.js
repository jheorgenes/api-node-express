import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find()
        .populate("autor") //Irá popular a entidade autor completa (que estiver vinculado ao livro )
        .exec();
      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros
        .findById(id)
        .populate("autor", "nome") //Irá popular apenas o nome do autor
        .exec();

      if(livroResultado !== null){
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);
      if (busca !== null) {
        const livrosResultado = await livros
          .find(busca)
          .populate("autor");
        res.status(200).send(livrosResultado);
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON()); //Retorna o json do livro cadastrado
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      //$set é utilizado para indicar que será feita uma alteração no corpo da requisição
      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if(livroResultado !== null){
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros.findByIdAndDelete(id);

      if(livroResultado !== null){
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
  
}

/**
 *  Function interna para extração de parâmetros passados na URL e retornar o tipo de busca a ser realizado  
 */
async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
  let busca = {}; //Recebendo um objeto vazio
  if (editora) busca.editora = editora; //Cria uma propriedade editora para receber o valor da variável
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" }; //Não diferencia minúsculas de maiúsculas
  /** 
   * Para efetuar a busca de min e max páginas corretamente
   * Precisa reinicializar a instância 'busca' (sendo um Object vazio ou não) para criar a propriedade 'numeroPaginas' (recebendo outro Object vazio)
   * Assim será possível adicionar à propriedade o valor que será filtrado.
   */
  if (minPaginas || maxPaginas) busca.numeroPaginas = {};
  // $gte = Greater than or Equal = Corresponde a valores maiores ou iguais a um valor especificado.
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  // $lte = Less than or Equal = Corresponde a valores menores ou iguais a um valor especificado.
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor){
    const autor = await autores.findOne({ nome: nomeAutor });
    if (autor !== null) 
      busca.autor = autor._id;
    else 
      busca = null;
  }
  return busca;
}

export default LivroController;