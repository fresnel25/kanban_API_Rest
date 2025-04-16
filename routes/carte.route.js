const express = require("express");
const {
  CreateCarte,
  ReadCarte,
  ReadOnlyCarte,
  UpdateCarte,
  DeleteCarte
} = require("../controller/carte.controller");

const carteRouter = express.Router();

carteRouter.post("/createcarte", CreateCarte);
carteRouter.get("/readcarte", ReadCarte);
carteRouter.get("/readonlycarte/:id", ReadOnlyCarte);
carteRouter.put("/updatecarte/:id", UpdateCarte);
carteRouter.delete("/deletecarte/:id", DeleteCarte);

module.exports = carteRouter;
