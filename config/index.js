require("dotenv").config()


let config = {

    port: process.env.PORT || "3000",
    cors: process.env.CORS || "*",

}

let db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    newtable: process.env.T_NAME_PRODUCTS 
}

module.exports = {config, db}