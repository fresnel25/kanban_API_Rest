const express = require("express");
const {
  CreateColonne,
  ReadColonne,
  ReadOnlyColonne,
  UpdateColonne,
  DeleteColonne,
  MoveColonne
} = require("../controller/colonne.controller");

const colonneRouter = express.Router();

colonneRouter.post("/createcolonne", CreateColonne);
colonneRouter.get("/readcolonne", ReadColonne);
colonneRouter.get("/readonlycolonne/:id", ReadOnlyColonne);
colonneRouter.put("/updatecolonne/:id", UpdateColonne);
colonneRouter.delete("/deletecolonne/:id", DeleteColonne);
colonneRouter.put("/movecolonne/:id", MoveColonne)

module.exports = colonneRouter;
