const prisma = require("../../db/dbconfig.js");

const CreateColonne = async (req, res) => {
  // recherche d'une colonne à partir de son nom dans la base de données
  const findName = await prisma.colonne.findUnique({
    where: {
      name: req.body.name
    }
  });

  // Vérifie si le nom de la colonne a été trouvée
  if (findName) {
    return res.status(409).json({ message: "this column already exists" });
  } else {
    const colonneCreate = await prisma.colonne.create({
      data: {
        name: req.body.name,
        description: req.body.description
      }
    });
    return res
      .status(201)
      .json({ message: "column created successfully", data: colonneCreate });
  }
};

const ReadColonne = async (req, res) => {
  // recupère toutes les colonnes présentes dans la base de données via prisma
  const getColonne = await prisma.colonne.findMany({
    include: {
      cartes: true // Inclut les cartes associées à chaque colonne
    }
  });
  // retourne une réponse 200 avec toutes les colonnes et leurs cartes
  return res
    .status(200)
    .json({ message: "columns retrieved successfully", data: getColonne });
};

const ReadOnlyColonne = async (req, res) => {
  // Récupère l'identifiant de la colonne depuis les paramètres de l'URL
  const colonneId = req.params.id;

  // Recherche une colonne unique dans la base de données via Prisma
  const findColonne_ById = await prisma.colonne.findUnique({
    where: {
      id: Number(colonneId) // Convertit l'ID en nombre (car il est reçu sous forme de chaîne)
    },
    include: {
      cartes: true // Inclut les cartes associées à cette colonne
    }
  });

  // Vérifie si la colonne a été trouvée
  if (!findColonne_ById) {
    // Si non, retourne une réponse 404 avec un message d'erreur
    return res.status(404).json({ message: "this column does not exist" });
  } else {
    // Si oui, retourne une réponse 200 avec la colonne et ses cartes
    return res
      .status(200)
      .json({
        message: "column retrieved successfully",
        data: findColonne_ById
      });
  }
};

const UpdateColonne = async (req, res) => {
  // Récupère l'identifiant de la colonne depuis les paramètres de l'URL
  const colonneId = req.params.id;

  // Recherche une colonne unique dans la base de données via Prisma
  const findColonne_ById = await prisma.colonne.findUnique({
    where: {
      id: Number(colonneId) // Convertit l'ID en nombre (car il est reçu sous forme de chaîne)
    }
  });

  // Vérifie si la colonne a été trouvée
  if (!findColonne_ById) {
    // Si non, retourne une réponse 404 avec un message d'erreur
    return res.status(404).json({ message: "this column does not exist" });
  } else {
    const updateColonne = await prisma.colonne.update({
      where: {
        id: Number(colonneId)
      },
      data: {
        name: req.body.name,
        description: req.body.description
      }
    });
    // Si oui, valide les modifications et retourne une réponse 201 avec la colonne et ses cartes
    return res
      .status(201)
      .json({ message: "column updated successfully", data: updateColonne });
  }
};

const DeleteColonne = async (req, res) => {
  // Récupère l'identifiant de la colonne depuis les paramètres de l'url
  const colonneId = req.params.id;

  // recherche une colonne unique dans la base de données via Prisma
  const findColonne_ById = await prisma.colonne.findUnique({
    where: {
      id: Number(colonneId)
    }
  });

  // Vérifie si la colonne a été trouvée
  if (findColonne_ById) {
    // Si oui, supprime la colonne et retourne une réponse 204
    await prisma.colonne.delete({
      where: {
        id: Number(colonneId)
      }
    });
    return res.status(204).json({ message: "column deleted successfully" });
  } else {
    // Si non, retourne une réponse 404 avec un message d'erreur
    return res.status(404).json({ message: "this column does not exist" });
  }
};

module.exports = {
  CreateColonne,
  ReadColonne,
  ReadOnlyColonne,
  UpdateColonne,
  DeleteColonne
};
