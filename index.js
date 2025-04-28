const express = require("express")
const colonneRouter = require("./routes/colonne.route");
const carteRouter = require("./routes/carte.route");
const categorieRouter = require("./routes/categorie.route");
const swagger = require("./swagger");
require('dotenv').config()
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/colonne", colonneRouter)
app.use("/api/carte", carteRouter)
app.use("/api/categorie", categorieRouter)
app.use('/api/docs', swagger.serve, swagger.setup); // ✅

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Le serveur tourne sur le port ${PORT}`)
})