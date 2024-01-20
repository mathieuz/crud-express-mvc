const Postagem = require("../models/Postagem")

exports.getIndex = (req, res) => {
    Postagem.find()
    .populate("categoria", "nome")
    .then((postagens) => {
        res.render("index/index", {postagens: postagens, qtdPostagens: postagens.length})
    })
}

exports.getPostagem = (req, res) => {
    const slug = req.params.slug

    Postagem.findOne({slug: slug}).populate("categoria", "nome slug").then((postagem) => {
        //Verificando se a postagem existe.
        if (postagem) {
            res.render("index/postagem", {postagem: postagem})

        } else {
            req.flash("error_msg", "A postagem que você acessou não existe. Talvez tenha sido movida ou excluída.")
            res.redirect("/")
        }
    })
}