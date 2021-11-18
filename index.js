const express = require("express");
const path = require("path")
let {config} = require("./config")
const serverRoutes = require("./routes")
let db_obj = require("./config/db")
let db = db_obj.client;
let Sockets = require("./utils/sockets")
const { Server: HttpServer } = require('http');

(async()=>{
    try {
        
        let respuesta = await db.from('productos')
        console.log(respuesta)

    } catch (error) {
        console.log("ERROR EN ASYNC TRY-CATCH",error)
    }
})();

// Initializations
const app = express();
let httpServer = new HttpServer(app);
let socket = new Sockets(httpServer);
socket.listenConnection();

// Settings
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// EJS----------------------------------------------------
app.set("views", path.join(__dirname, "views", "ejs"))
app.set("view engine", "ejs")
//Pages
app.use(express.static(path.join(__dirname, "views")));


//Middlewares
const cors = require("cors");
app.use(cors(`${config.cors}`));



serverRoutes(app);

httpServer.listen(config.port, ()=>{
    console.log(`Connected to URL:: http://localhost:${config.port}`)
});
app.on("error", err => console.log("Fallo de conexion al servidor", err));