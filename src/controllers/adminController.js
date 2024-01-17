//Importando models necessárias
const Categoria = require("../models/Categoria")
const Postagem = require("../models/Postagem")

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
            req.flash("success_msg", "Categoria adicionada com sucesso!")
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

exports.postDeletarCategoria = (req, res) => {
    const docId = req.body.id

    Categoria.findOneAndDelete({_id: docId}).then((categoria) => {
        req.flash("success_msg", `Categoria '${categoria.nome}' deletada com sucesso!`)
        res.redirect("/admin/categorias")

    }).catch(() => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria. Tente novamente.")
        res.redirect("/admin/categorias")

    })
}

exports.getPostagens = (req, res) => {
    Postagem.find().populate("categoria", "nome").then((postagens) => {
        res.render("admin/postagens", {
            postagens: postagens,
            qtdPostagens: postagens.length
        })

    })
}

exports.getAdicionarPostagem = (req, res) => {
    Categoria.find().then((categorias) => {
        res.render("admin/adicionar-postagem", {categorias: categorias, qtdCategorias: categorias.length})

    }).catch(() => {
        req.flash("error_msg", "Houve um erro ao recuperar alguns recursos. Tente novamente.")
        res.redirect("/admin/categorias")

    })
}

exports.postAdicionarPostagem = (req, res) => {
    const { titulo, descricao, slug, categoria, conteudo } = req.body

    let erros = []

    if (!titulo) {
        erros.push({msg: "Campo de título está vazio."})
    }

    if (!descricao) {
        erros.push({msg: "Campo de descrição está vazio."})
    }

    if (!slug) {
        erros.push({msg: "Campo de slug está vazio."})
    }

    if (!conteudo) {
        erros.push({msg: "Campo de conteúdo está vazio."})
    }

    if (categoria === "0") {
        erros.push({msg: "É necessário associar uma categoria a postagem."})
    }

    if (erros.length === 0) {
        new Postagem({
            titulo: titulo,
            descricao: descricao,
            slug: slug,
            categoria: categoria,
            conteudo: conteudo

        }).save().then(() => {
            req.flash("success_msg", "Postagem adicionada com sucesso!")
            res.redirect("/admin/postagens")

        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a postagem. Tente novamente.")
            res.redirect("/admin/postagens/adicionar")
        })

    } else {
        Categoria.find().then((categorias) => {
            res.render("admin/adicionar-postagem", {erros: erros, qtdCategorias: categorias.length})

        }).catch(() => {
            req.flash("error_msg", "Erro ao criar a nova postagem. Tente novamente.")
            res.redirect("/admin/postagens/adicionar")

        })
    }
}