//Express
const express = require("express")
const router = express.Router()

//Importando Controller de Index.
const indexController = require("../controllers/indexController")

router.get("/", indexController.getIndex) //Associando o controller à view.

router.get("/postagem/:slug", indexController.getPostagem)

router.get("/categorias", indexController.getCategorias)
router.get("/categorias/:slug", indexController.getCategoriaPostagens)

//Endpoints de registro de usuário no sistema.
router.get("/registrar", indexController.getRegistrar)
router.post("/registrar", indexController.postRegistrar)

//Endpoints de login do usuário.
router.get("/login", indexController.getLogin)
router.post("/login", indexController.postLogin)

module.exports = router