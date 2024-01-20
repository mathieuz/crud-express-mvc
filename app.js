//Módulos
const express = require("express"),
      mongoose = require("mongoose"),
      ejslayouts = require("express-ejs-layouts"),
      path = require("path")

const session = require("./src/middlewares/session"),
      flash = require("connect-flash"),
      sessionmiddleware = require("./src/middlewares/session-middleware")

//Inicialização e configuração do Express
const app = express()

app.use(express.urlencoded({extended: true})) //Utilizando Body Parser
app.use(express.json()) //Utilizando JSON Parser

app.use(express.static(path.join(__dirname, "/node_modules", "/bootstrap"))) //Definindo caminho do css e js do bootstrap.

app.set("views", "src/views") //Setando diretório 'views' no caminho 'src/views'.
app.set("view engine", "ejs") //Setando 'ejs' como view engine principal da aplicação.
app.use(ejslayouts) //Utilizando o middleware 'ejslayouts' para definir uma estrutura HTML main (layout.ejs).

app.use(session()) //Utilizando express-session para criação de sessões e habilitando mensagens flash.
app.use(flash()) //Utilizando flash para mensagens flash.
app.use(sessionmiddleware()) //Utilizando middleware de sessão

//Inicialização das rotas
const indexRoutes = require("./src/routes/indexRoutes")
const adminRoutes = require("./src/routes/adminRoutes")

app.use("/", indexRoutes)
app.use("/admin", adminRoutes)

//Inicialização do servidor
const PORT = process.env.PORT || 4085
const HOST = process.env.HOST || "localhost"

mongoose.connect("mongodb://127.0.0.1:27017/protonodejs7").then(() => {
    app.listen(PORT, HOST, () => {
        console.log(`Servidor aberto em '${HOST}:${PORT}/'.`)
    })

}).catch((err) => {
    console.log("Houve um erro ao se conectar com o banco de dados.\n" + err)

})