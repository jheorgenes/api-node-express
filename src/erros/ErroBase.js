class ErroBase extends Error {
  constructor(mensagem = "Erro interno do servidor", status = 500) { //Definindo mensagem padrão, caso as propriedades não venham preenchidas
    super();
    this.message = mensagem;
    this.status = status;
  }

  enviarResposta(res){
    res.status(this.status).send({
      mensagem: this.message,
      status: this.status
    });
  }
}

export default ErroBase;