const prisma = require("../db/dbconfig.js");

const Createcategorie = async (req, res) => {
  // recherche d'une categorie à partir de son nom dans la base de données
  const findName = await prisma.categorie.findUnique({
    where: {
      name: req.body.name
    }
  });

  // Vérifie si le nom de la categorie a été trouvée
  if (findName) {
    return res.status(409).json({ message: "this category already exists" });
  } else {
    const categorieCreate = await prisma.categorie.create({
      data: {
        name: req.body.name,
        description: req.body.description
      }
    });
    return res
      .status(201)
      .json({ message: "category created successfully", data: categorieCreate });
  }
};

const ReadCategorie = async (req, res) => {
  // recupère toutes les categories présentes dans la base de données via prisma
  const getcategorie = await prisma.categorie.findMany({
    include: {
      cartes: true // Inclut les cartes associées à chaque categorie
    }
  });
  // retourne une réponse 200 avec toutes les categories et leurs cartes
  return res
    .status(200)
    .json({ message: "categories retrieved successfully", data: getcategorie });
};

const ReadOnlyCategorie = async (req, res) => {
  // Récupère l'identifiant de la categorie depuis les paramètres de l'URL
  const categorieId = req.params.id;

  // Recherche une categorie unique dans la base de données via Prisma
  const findCategorie_ById = await prisma.categorie.findUnique({
    where: {
      id: Number(categorieId) // Convertit l'ID en nombre (car il est reçu sous forme de chaîne)
    },
    include: {
      cartes: true // Inclut les cartes associées à cette categorie
    }
  });

  // Vérifie si la categorie a été trouvée
  if (!findCategorie_ById) {
    // Si non, retourne une réponse 404 avec un message d'erreur
    return res.status(404).json({ message: "this category does not exist" });
  } else {
    // Si oui, retourne une réponse 200 avec la categorie et ses cartes
    return res
      .status(200)
      .json({
        message: "category retrieved successfully",
        data: findCategorie_ById
      });
  }
};

const UpdateCategorie = async (req, res) => {
  // Récupère l'identifiant de la categorie depuis les paramètres de l'URL
  const categorieId = req.params.id;

  // Recherche une categorie unique dans la base de données via Prisma
  const findcategorie_ById = await prisma.categorie.findUnique({
    where: {
      id: Number(categorieId) // Convertit l'ID en nombre (car il est reçu sous forme de chaîne)
    }
  });

  // Vérifie si la categorie a été trouvée
  if (!findcategorie_ById) {
    // Si non, retourne une réponse 404 avec un message d'erreur
    return res.status(404).json({ message: "this category does not exist" });
  } else {
    const updatecategorie = await prisma.categorie.update({
      where: {
        id: Number(categorieId)
      },
      data: {
        name: req.body.name,
        description: req.body.description
      }
    });
    // Si oui, valide les modifications et retourne une réponse 201 avec la categorie et ses cartes
    return res
      .status(201)
      .json({ message: "category updated successfully", data: updatecategorie });
  }
};

const DeleteCategorie = async (req, res) => {
  // Récupère l'identifiant de la categorie depuis les paramètres de l'url
  const categorieId = req.params.id;

  // recherche une categorie unique dans la base de données via Prisma
  const findcategorie_ById = await prisma.categorie.findUnique({
    where: {
      id: Number(categorieId)
    }
  });

  // Vérifie si la categorie a été trouvée
  if (findcategorie_ById) {
    // Si oui, supprime la categorie et retourne une réponse 204
    await prisma.categorie.delete({
      where: {
        id: Number(categorieId)
      }
    });
    return res.status(204).json({ message: "category deleted successfully" });
  } else {
    // Si non, retourne une réponse 404 avec un message d'erreur
    return res.status(404).json({ message: "this category does not exist" });
  }
};

module.exports = {
  Createcategorie,
  ReadCategorie,
  ReadOnlyCategorie,
  UpdateCategorie,
  DeleteCategorie
};
