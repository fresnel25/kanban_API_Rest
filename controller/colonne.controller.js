const prisma = require("../db/dbconfig");

const CreateColonne = async (req, res) => {
  // recherche d'une colonne à partir de son nom dans la base de données
  const findName = await prisma.colonne.findUnique({
    where: {
      name: req.body.name
    }
  });

  // Trouve la plus grande position actuelle dans la base
  const maxPos = await prisma.colonne.aggregate({
    _max: { position: true }
  });

  // Vérifie si le nom de la colonne a été trouvée
  if (findName) {
    return res.status(409).json({ message: "this column already exists" });
  } else {
    const colonneCreate = await prisma.colonne.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        position: (maxPos._max.position || 0) + 1
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
    return res.status(200).json({
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
    // Réorganiser les positions : décrémente les colonnes suivantes
    await prisma.colonne.updateMany({
      where: { position: { gt: findColonne_ById.position } },
      data: { position: { decrement: 1 } }
    });

    return res.status(204).json({ message: "column deleted successfully" });
  } else {
    // Si non, retourne une réponse 404 avec un message d'erreur
    return res.status(404).json({ message: "this column does not exist" });
  }
};

const MoveColonne = async (req, res) => {
  const id = Number(req.params.id);
  const newPosition = Number(req.body.position); // la position cible

  const colonne = await prisma.colonne.findUnique({ where: { id } });
  if (!colonne) return res.status(404).json({ message: "column not found" });

  const currentPosition = colonne.position;

  // Cas : montée
  if (newPosition < currentPosition) {
    await prisma.colonne.updateMany({
      where: { position: { gte: newPosition, lt: currentPosition } },
      data: { position: { increment: 1 } }
    });
  }

  // Cas : descente
  if (newPosition > currentPosition) {
    await prisma.colonne.updateMany({
      where: { position: { lte: newPosition, gt: currentPosition } },
      data: { position: { decrement: 1 } }
    });
  }

  // Appliquer la nouvelle position
  const updated = await prisma.colonne.update({
    where: { id },
    data: { position: newPosition }
  });

  return res.status(200).json({ message: "column moved", data: updated });
};

module.exports = {
  CreateColonne,
  ReadColonne,
  ReadOnlyColonne,
  UpdateColonne,
  DeleteColonne,
  MoveColonne
};
