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

router.get("/categorias/editar/:id", adminController.getEditarCategoria)
router.post("/categorias/editar", adminController.postEditarCategoria)

module.exports = router