//Express
const express = require("express")
const router = express.Router()

//Importando Controller de Admin.
const adminController = require("../controllers/adminController")

router.get("/", adminController.getIndex) //Associando o controller à view.

router.get("/categorias", adminController.getCategorias)

router.get("/categorias/adicionar", adminController.getAdicionarCategoria)
router.post("/categorias/adicionar", adminController.postAdicionarCategoria)

module.exports = router