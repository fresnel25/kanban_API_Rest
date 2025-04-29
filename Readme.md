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
    ``` bash

    1- git clone https://github.com/fresnel25/kanban_API_Rest.git

    2- cd 3NJS

### Installer les dépendances :
    ``` bash

    npm install

### Configurer la base de données :

    1- créer un fichier .env dans lequel vous ajouterez :

    2- PORT = 5000               (ceci est un exemple)

    3- DATABASE_URL="postgresql://DB_USER:DB_PASSWORD@localhost:5432/DB_NAME?schema=public"       (ceci est un exemple de config batabase postgresql)

### Faite les migrations dans votre DB
    ``` bash

    1- npx prisma generate
    2- npx prisma migrate dev --name init

### Lancer le serveur :
    ``` bash
    🔹npm run dev (ou nodemon index.js si tu utilises nodemon)
    🔹npm run start


## 📖 Documentation API

La documentation complète de l'API est disponible via Swagger.

### Accéder à l'API Documentation Swagger :

    http://localhost:5000/api/docs

### Exemples d’endpoints :

    GET /colonne/readcolonne → Liste de toutes les colonnes

    POST /colonne/createcolonne → Créer une nouvelle colonne

    GET /carte/readcarte → Obtenir toutes les cartes

    PUT /carte/movecarte/{id} → Déplacer une carte entre colonnes

    GET /categorie/readcategorie → Récupérer toutes les catégories

## 📬 Contact
    Pour toute question ou suggestion, vous pouvez me contacter ici :
    LinkedIn : [www.linkedin.com/in/ngaleu-fakmou-junior-fresnel]
