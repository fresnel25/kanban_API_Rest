const express = require("express");
const { CreateCarte, ReadCarte, ReadOnlyCarte, UpdateCarte, DeleteCarte } = require("../../controller/carte/carte.controller");

carteRouter = express.Router();

carteRouter.post("/createcarte", CreateCarte)
carteRouter.get("/readcarte", ReadCarte )
carteRouter.get("/readonlycarte/:id", ReadOnlyCarte)
carteRouter.put("/updatecarte/:id", UpdateCarte)
carteRouter.delete("/deletecarte/:id", DeleteCarte )

module.exports = carteRouter;