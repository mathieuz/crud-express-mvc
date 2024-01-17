const mongoose = require("mongoose")

const postagemSchema = new mongoose.Schema({
    titulo: { type: String, require: true },
    descricao: { type: String, require: true },
    slug: { type: String, require: true },
    conteudo: { type: String, require: true },

    categoria: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "categorias",
        required: true
    }
})

const Postagem = mongoose.model("postagens", postagemSchema)

module.exports = Postagem