const prisma = require("../../db/dbconfig.js");

const CreateColonne = async (req, res) => {
  // check if colonne exist
  const checkName = await prisma.colonne.findUnique({
    where: {
      name: req.body.name
    }
  });

  if (checkName) {
    return res.status(409).json({ message: "this colonne already exists" });
  } else {
    const colonneCreate = await prisma.colonne.create({
      data: {
        name: req.body.name,
        description: req.body.description
      }
    });
    return res
      .status(201)
      .json({ message: "colonne created successfully", data: colonneCreate });
  }
};


module.exports = {
  CreateColonne
};
