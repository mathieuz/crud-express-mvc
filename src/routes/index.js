//Express
const express = require("express")
const router = express.Router()

//Importando Controller de Index.
const indexController = require("../controllers/indexController")

router.get("/", indexController.getIndex) //Associando o controller à view.

module.exports = router