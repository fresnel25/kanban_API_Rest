const express = require("express");
const { CreateColonne } = require("../../controller/colonne/colonne.controller");

const colonneRouter = express.Router();

colonneRouter.post("/createcolonne", CreateColonne)

module.exports = colonneRouter;