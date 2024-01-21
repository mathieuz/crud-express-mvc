//Módulos
const bcrypt = require("bcryptjs")

//Models
const Postagem = require("../models/Postagem"),
      Categoria = require("../models/Categoria"),
      Usuario = require("../models/Usuario")

exports.getIndex = (req, res) => {
    console.log(req.session.usuarioId ? "Está logado." : "Não está logado.")

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

//Acesso página de registro de usuários.
exports.getRegistrar = (req, res) => {
    res.render("index/registrar")
}

exports.postRegistrar = (req, res) => {
    const { nome, email, senha, confirmarSenha } = req.body

    let erros = []

    //Comparando os campos:
    if (!nome) {
        erros.push({msg: "Campo de nome está vazio."})
    }

    if (!email) {
        erros.push({msg: "Campo de e-mail está vazio."})
    }

    if (!confirmarSenha) {
        erros.push({msg: "Campo de confirmar senha está vazio."})
    }

    if (!senha) {
        erros.push({msg: "Campo de senha está vazio"})

    } else if (senha != confirmarSenha) {
        erros.push({msg: "As senhas inseridas não conferem. Tente novamente."})
    }

    //Verificando se há erros ou não para cadastrar o usuário no banco.
    if (erros.length === 0) {

        //Hasheando a senha antes de cadastrar no banco de dados.
        const senhaHash = bcrypt.hashSync(senha, bcrypt.genSaltSync(10))

        new Usuario({
            nome: nome,
            email: email,
            senha: senhaHash

        }).save().then(() => {
            req.flash("success_msg", "Você foi registrado com sucesso!")
            res.redirect("/")

        }).catch(() => {
            req.flash("error_msg", "Houve um erro ao tentar realizar o cadastro. Tente novamente.")
            res.redirect("/registrar")

        })

    } else {
        res.render("index/registrar", {erros: erros})
    }
}

exports.getLogin = (req, res) => {
    res.render("index/login")
}

exports.postLogin = (req, res) => {
    const { email, senha } = req.body

    let erros = []

    if (!email) {
        erros.push({msg: "O e-mail não foi informado."})
    }

    if (!senha) {
        erros.push({msg: "A senha não foi informada."})
    }

    //Verificando se há erros para executar os proximos procedimentos.
    //Se não, é porque os campos foram informados...
    if (erros.length === 0) {
        Usuario.findOne({email: email}).then((usuario) => {

            //Verificando se o usuário existe.
            if (usuario) {

                const auth = bcrypt.compareSync(senha, usuario.senha)

                //auth recebe se as senhas batem. Se sim, o usuário é logado.
                if (auth) {
                    req.session.usuarioId = usuario._id //Armazenando a id do usuário na propriedade da sessão 'usuarioId'.

                    req.flash("success_msg", "Login feito com sucesso!")
                    res.redirect("/")

                } else {
                    req.flash("error_msg", "Senha incorreta.")
                    res.redirect("/login")
                }

            } else {
                req.flash("error_msg", "A conta informada não existe.")
                res.redirect("/login")
            }
        })

    } else {
        res.render("index/login", {erros: erros})
    }
}