const mongoose = require("mongoose")

const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
})

const Usuario = mongoose.model("usuarios", usuarioSchema)

module.exports = Usuario