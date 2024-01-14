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
    if (erros.length === 0) {
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

exports.getEditarCategoria = (req, res) => {
    const docId = req.params.id //Recuperando ID do documento da URL requisitada.

    //Recuperando o documento e renderizando a página de edições em seguida.
    Categoria.findOne({_id: docId}).then((categoria) => {
        res.render("admin/editar-categoria", {categoria: categoria})

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao recuperar alguns recursos. Tente novamente.")
        res.redirect("/admin/categorias")

    })
}

exports.postEditarCategoria = (req, res) => {
    const { id, nome, slug } = req.body

    let erros = []

    if (!nome) {
        erros.push({msg: "O campo de nome está vazio."})
    }

    if (!slug) {
        erros.push({msg: "O campo de slug está vazio."})
    }

    if (erros.length === 0) {
        Categoria.findOne({_id: id}).then((categoria) => {
            categoria.nome = nome,
            categoria.slug = slug

            categoria.save().then(() => {
                req.flash("success_msg", "Postagem editada com sucesso!")
                res.redirect("/admin/categorias")

            }).catch(() => {
                req.flash("error_msg", "Houve um erro inesperado ao editar a postagem. Tente novamente.")
                res.redirect("/admin/categorias")

            })

        }).catch(() => {
            req.flash("error_msg", "Houve um erro ao recuperar alguns recursos. Tente novamente.")
            res.redirect("/admin/categorias")
            
        })

    }
}