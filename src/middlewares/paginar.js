import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
    // Usando destructuring para extrair de ordenação, o nome e ordem passados como argumentos do parâmetro
    let [ campoOrdenacao, ordem ] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if(limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado.find()
        //Essa forma de passar [] dentro de um objeto, permite inferir o valor de uma variável como atributo do objeto
        .sort({ [campoOrdenacao]: ordem }) //Ordena de forma crescente (1) ou decrescente (-1)
        .skip((pagina - 1) * limite) //define o número páginas a serem puladas
        .limit(limite) //define o limite de resultados retornados
        .exec();
        
      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (erro) {
    next(erro);
  }
}

export default paginar;