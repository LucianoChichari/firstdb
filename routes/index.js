const {Router} = require("express");
const router = Router();
let contenedor = require("../services/index.js");

function serverRouter(app) {
    
    app.use("/", router);
    
    app.get("/", (req, res) =>{
    res.send(true)
    })


// EJS--------------------------------------------
    router.get("/productosEJS", async (req, res) => {
        let response = await contenedor.getAll()
        res.render("pages/index", {response})
    })
    
    router.get("/productosejs/:id", async (req, res, next) => {
        let { id } = req.params
        let response = await contenedor.getProdById(parseInt(id))
        res.render("pages/index", {response})
    })

    router.delete("/productosejs/:id", async (req, res, next) => {
        let { id } = req.params
        let response = await contenedor.getProdById(parseInt(id))
        res.render("pages/index", {response})
    })

    router.put("/productos-ejs/:id", async (req, res) => {
        let {obj} = req.body
        let { id } = req.params
        let response = await contenedor.updateProduct(obj, parseInt(id))
        res.json(response)
    })

    router.post("/productosEJS", (req, res) => {
        let obj = req.body;
        contenedor.newProd(obj);
        console.log(obj)
        res.redirect("/productosEJS")
    })  
}




module.exports = serverRouter;