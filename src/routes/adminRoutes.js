//Express
const express = require("express")
const router = express.Router()

//Middlewares
const checkAuth = require("../middlewares/check-auth")

//Importando Controller de Admin.
const adminController = require("../controllers/adminController")

router.get("/", checkAuth, adminController.getIndex) //Associando o controller à view.

//Página que lista todas as categorias
router.get("/categorias", checkAuth, adminController.getCategorias)

//Acesso ao formulário de criação de categorias e o endpoint que processa a criação de categorias.
router.get("/categorias/adicionar", checkAuth, adminController.getAdicionarCategoria)
router.post("/categorias/adicionar", checkAuth, adminController.postAdicionarCategoria)

//Acesso ao formulário de edição de categoria e o endpoint que processa as mudanças feitas.
router.get("/categorias/editar/:id", checkAuth, adminController.getEditarCategoria)
router.post("/categorias/editar", checkAuth, adminController.postEditarCategoria)

//Endpoint que processa a exclusão de uma categoria.
router.post("/categorias/deletar", checkAuth, adminController.postDeletarCategoria)

//Endpoints referente às postagens.
router.get("/postagens", checkAuth, adminController.getPostagens)

router.get("/postagens/adicionar", checkAuth, adminController.getAdicionarPostagem)
router.post("/postagens/adicionar", checkAuth, adminController.postAdicionarPostagem)

router.get("/postagens/editar/:id", checkAuth, adminController.getEditarPostagem)
router.post("/postagens/editar", checkAuth, adminController.postEditarPostagem)

router.post("/postagens/deletar", checkAuth, adminController.postDeletarPostagem)

module.exports = router