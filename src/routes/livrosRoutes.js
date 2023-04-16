import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
  .get("/livros", LivroController.listarLivros)
  // .get("/livros/busca", LivroController.listarLivroPorEditora)
  .get("/livros/busca", LivroController.listarLivroPorFiltro)
  .get("/livros/:id", LivroController.listarLivroPorId) //Rotas com id são prioridades em relação com rotas que contém parâmetros. Sempre a rota de :id tem vir por último se houver outras rotas com parâmetros (se não dá erro)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro);

export default router;   