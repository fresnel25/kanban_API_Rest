const prisma = require("../db/dbconfig.js");

const CreateCarte = async (req, res) => {
  // recherche d'une carte à partir de son nom dans la base de données
  const findName = await prisma.carte.findUnique({
    where: {
      name: req.body.name
    }
  });
  // Vérifie si le nom de la carte a été trouvée
  if (!findName) {
    const createCarte = await prisma.carte.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        colonneId: req.body.colonneId
      }
    });
    return res
      .status(201)
      .json({ message: "card created successfully", data: createCarte });
  } else {
    return res.status(409).json({ message: "this card already exists" });
  }
};

const ReadCarte = async (req, res) => {
  // recupère toutes les cartes présentes dans la base de données via prisma
  const getCarte = await prisma.carte.findMany();
  // retourne une réponse 200 avec toutes les cartes et leurs cartes
  return res
    .status(200)
    .json({ message: "cards retrieved successfully", data: getCarte });
};

const ReadOnlyCarte = async (req, res) => {
  // Récupère l'identifiant de la carte depuis les paramètres de l'URL
  const carteId = req.params.id;

  // Recherche une carte unique dans la base de données via Prisma
  const findCarte_ById = await prisma.carte.findUnique({
    where: {
      id: Number(carteId) // Convertit l'ID en nombre (car il est reçu sous forme de chaîne)
    },
  });

  // Vérifie si la carte a été trouvée
  if (!findCarte_ById) {
    // Si non, retourne une réponse 404 avec un message d'erreur
    return res.status(404).json({ message: "this card does not exist" });
  } else {
    // Si oui, retourne une réponse 200 avec la carte et ses cartes
    return res.status(200).json({
      message: "card retrieved successfully",
      data: findCarte_ById
    });
  }
};

const UpdateCarte = async (req, res) => {
  // Récupère l'identifiant de la carte depuis les paramètres de l'URL
  const carteId = req.params.id;

  // Recherche une carte unique dans la base de données via Prisma
  const findCarte_ById = await prisma.carte.findUnique({
    where: {
      id: Number(carteId) // Convertit l'ID en nombre (car il est reçu sous forme de chaîne)
    }
  });

  // Vérifie si la carte a été trouvée
  if (!findCarte_ById) {
    // Si non, retourne une réponse 404 avec un message d'erreur
    return res.status(404).json({ message: "this card does not exist" });
  } else {
    const updatecarte = await prisma.carte.update({
      where: {
        id: Number(carteId)
      },
      data: {
        name: req.body.name,
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        colonneId: req.body.colonneId
      }
    });
    // Si oui, valide les modifications et retourne une réponse 201 avec la carte et ses cartes
    return res
      .status(201)
      .json({ message: "card updated successfully", data: updatecarte });
  }
};

const DeleteCarte = async (req, res) => {
  // Récupère l'identifiant de la carte depuis les paramètres de l'url
  const carteId = req.params.id;

  // recherche une carte unique dans la base de données via Prisma
  const findCarte_ById = await prisma.carte.findUnique({
    where: {
      id: Number(carteId)
    }
  });

  // Vérifie si la carte a été trouvée
  if (findCarte_ById) {
    // Si oui, supprime la carte et retourne une réponse 204
    await prisma.carte.delete({
      where: {
        id: Number(carteId)
      }
    });
    return res.status(204).json({ message: "card deleted successfully" });
  } else {
    // Si non, retourne une réponse 404 avec un message d'erreur
    return res.status(404).json({ message: "this card does not exist" });
  }
};

module.exports = {
  CreateCarte,
  ReadCarte,
  ReadOnlyCarte,
  UpdateCarte,
  DeleteCarte
};
