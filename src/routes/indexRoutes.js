//Express
const express = require("express")
const router = express.Router()

//Importando Controller de Index.
const indexController = require("../controllers/indexController")

router.get("/", indexController.getIndex) //Associando o controller à view.

router.get("/postagem/:slug", indexController.getPostagem)

router.get("/categorias", indexController.getCategorias)
router.get("/categorias/:slug", indexController.getCategoriaPostagens)

module.exports = router