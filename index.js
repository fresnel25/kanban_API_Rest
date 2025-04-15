const express = require("express")
const colonneRouter = require("./routes/colonne/colonne.route")
require('dotenv').config()
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/colonne", colonneRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Le serveur tourne sur le port ${PORT}`)
})