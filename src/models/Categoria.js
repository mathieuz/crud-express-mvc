const mongoose = require("mongoose")

const categoriaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    slug: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now() }
})

const Categoria = mongoose.model("categorias", categoriaSchema)

module.exports = Categoria