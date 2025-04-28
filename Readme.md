# 3NJS - API REST Kanban

    Bienvenue sur le projet 3NJS, une API REST réalisée avec Node.js, Express, et Prisma.
    Cette API permet de gérer un tableau Kanban : colonnes, cartes et catégories, dans l'esprit d'outils comme Trello.

## 🚀 Fonctionnalités principales

    🔹 CRUD complet pour les Colonnes
    🔹 CRUD complet pour les Cartes, avec déplacement entre colonnes
    🔹 CRUD complet pour les Catégories
    🔹 Gestion des positions pour ordonner colonnes et cartes
    🔹 Documentation interactive via Swagger

## 🏗️ Technologies utilisées

    🔹Node.js
    🔹Express.js
    🔹Prisma ORM
    🔹PostgreSQL
    🔹Swagger UI pour la documentation API


## ⚙️ Installation et lancement du projet

### Cloner le projet :

    git clone https://github.com/ton-repo/3NJS.git

    cd 3NJS

### Installer les dépendances :

    npm install

### Configurer la base de données :

    npx prisma generate
    npx prisma migrate dev --name init

### Lancer le serveur :

    🔹npm run dev (ou nodemon index.js si tu utilises nodemon)
    🔹npm run start


## 📖 Documentation API

La documentation complète de l'API est disponible via Swagger.

### Accéder à l'API Documentation Swagger :

    http://localhost:5000/api-docs

### Exemples d’endpoints :

    GET /colonne/read → Liste de toutes les colonnes

    POST /colonne/create → Créer une nouvelle colonne

    GET /cards → Obtenir toutes les cartes

    PUT /cards/{id}/move → Déplacer une carte entre colonnes

    GET /categories → Récupérer toutes les catégories

## 📬 Contact
    Pour toute question ou suggestion, vous pouvez me contacter ici :
    LinkedIn : [www.linkedin.com/in/ngaleu-fakmou-junior-fresnel]


