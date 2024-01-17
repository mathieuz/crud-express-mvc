//Express
const express = require("express")
const router = express.Router()

//Importando Controller de Admin.
const adminController = require("../controllers/adminController")

router.get("/", adminController.getIndex) //Associando o controller à view.

//Página que lista todas as categorias
router.get("/categorias", adminController.getCategorias)

//Acesso ao formulário de criação de categorias e o endpoint que processa a criação de categorias.
router.get("/categorias/adicionar", adminController.getAdicionarCategoria)
router.post("/categorias/adicionar", adminController.postAdicionarCategoria)

//Acesso ao formulário de edição de categoria e o endpoint que processa as mudanças feitas.
router.get("/categorias/editar/:id", adminController.getEditarCategoria)
router.post("/categorias/editar", adminController.postEditarCategoria)

//Endpoint que processa a exclusão de uma categoria.
router.post("/categorias/deletar", adminController.postDeletarCategoria)

//Endpoints referente às postagens.
router.get("/postagens", adminController.getPostagens)

router.get("/postagens/adicionar", adminController.getAdicionarPostagem)
router.post("/postagens/adicionar", adminController.postAdicionarPostagem)

module.exports = router