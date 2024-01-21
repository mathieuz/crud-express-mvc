//Middleware que realiza a autênticação do usuário.
//Este middleware é chamado dentro das rotas de administração e checa se o usuário está logado e se é administrador.

//Importando model de usuário.
const Usuario = require("../models/Usuario")

module.exports = (req, res, next) => {
    //Verifica se o usuário está logado.
    if (req.session.usuarioId) {

        //Verfica se quem está logado possui permissão (isAdmin == true)
        Usuario.findById(req.session.usuarioId).then((usuario) => {
            if (usuario.isAdmin === true) {
                next() //Se o usuário foi autenticado, passa para os próximos middlewares/renderização de páginas/processos.

            } else {
                req.flash("error_msg", "Você não possui permissão para acessar este conteúdo.")
                res.redirect("/")
                
            }

        }).catch(() => {
            req.flash("error_msg", "Houve um erro ao fazer algumas verificações. Por favor, tente novamente.")
            res.redirect("/")

        })

    } else {
        req.flash("error_msg", "Faça login para acessar este conteúdo.")
        res.redirect("/login")
    }
}