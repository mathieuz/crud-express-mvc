//Importando models necessárias
const Categoria = require("../models/Categoria")

//Criando Controllers

exports.getIndex = (req, res) => {
    res.redirect("/admin/categorias")
}

exports.getCategorias = (req, res) => {
    Categoria.find().then((categorias) => {

        res.render("admin/categorias", {
            categorias: categorias, //Array de objeto com todos os documentos.
            qtdCategorias: Object.keys(categorias).length //Recuperando quantidade de documentos.
        })

    })
}

exports.getAdicionarCategoria = (req, res) => {
    res.render("admin/adicionar-categoria")
}

exports.postAdicionarCategoria = (req, res) => {
    const { nome, slug } = req.body //Recuperando valores enviados do formulário.

    let erros = [] //Criando array de erros.

    //Comparando os campos.
    if (!nome) {
        erros.push({msg: "O campo de nome está vazio."})
    }

    if (!slug) {
        erros.push({msg: "O campo de slug está vazio."})
    }

    //Se não há erros, o registro é realizado.
    if (erros.length == 0) {
        new Categoria({
            nome: nome,
            slug: slug

        }).save().then(() => {
            req.flash("success_msg", "Cadastro realizado com sucesso!")
            res.redirect("/admin/categorias")

        }).catch((err) => {
            req.flash("error_msg", "Um erro ocorreu ao realizar o cadastro. Tente novamente.")
            res.redirect("/admin/categorias/adicionar")
            
        })

    } else {
        res.render("admin/adicionar-categoria", {erros: erros})

    }
}