const Postagem = require("../models/Postagem")
const Categorias = require("../models/Categoria")
const Categoria = require("../models/Categoria")

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

    }).catch(() => {
        req.flash("error_msg", "Houve um erro ao recuperar alguns recursos. Tente novamente.")
        res.redirect("/")

    })
}

exports.getCategorias = (req, res) => {
    Categoria.find().then((categorias) => {
        res.render("index/categorias", {categorias: categorias, qtdCategorias: categorias.length})
    })
}

exports.getCategoriaPostagens = (req, res) => {
    const slug = req.params.slug

    Categoria.findOne({slug: slug}).then((categoria) => {
        if (categoria) {

            Postagem.find({categoria: categoria._id}).populate("categoria", "nome").then((postagens) => {
                res.render("index/categoria-postagens", {postagens: postagens, categoriaNome: categoria.nome, qtdPostagens: postagens.length})

            }).catch(() => {
                req.flash("error_msg", "Houve um erro ao recuperar alguns recursos. Tente novamente.")
                res.redirect("/")

            })

        } else {
            req.flash("error_msg", "A categoria que você acessou não existe. Talvez tenha sido movida ou excluída.")
            res.redirect("/")

        }
    })
}