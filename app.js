const express = require("express");
const methodOverride = require("method-override");
const app = express();
const PORT = 4000;
const routerMain = require("./routes/main");
const routerProducts = require("./routes/products");





/* Configuraciones */
app.set("view engine", "ejs");
app.set("views",__dirname + "/views");

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(methodOverride("_method"));


/*RUTAS*/

app.use("/",routerMain);
app.use("/products", routerProducts)



/*SERVIDOR*/

app.listen(PORT,()=> console.log("Servidor corriendo en el puerto " + PORT))