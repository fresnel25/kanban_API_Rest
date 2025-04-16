const express = require("express");
const {
  Createcategorie,
  ReadCategorie,
  ReadOnlyCategorie,
  UpdateCategorie,
  DeleteCategorie
} = require("../controller/categorie.controller");

const categorieRouter = express.Router();

categorieRouter.post("/createcategorie", Createcategorie);
categorieRouter.get("/readcategorie", ReadCategorie);
categorieRouter.get("/readonlycategorie/:id", ReadOnlyCategorie);
categorieRouter.put("/updatecategorie/:id", UpdateCategorie);
categorieRouter.delete("/deletecategorie/:id", DeleteCategorie);

module.exports = categorieRouter;
