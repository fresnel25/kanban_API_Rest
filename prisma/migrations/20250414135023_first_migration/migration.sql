-- CreateTable
CREATE TABLE "colonne" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colonne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carte" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "colonneId" INTEGER,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorie" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carte_categorie" (
    "id" SERIAL NOT NULL,
    "carteId" INTEGER NOT NULL,
    "categorieId" INTEGER NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carte_categorie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "colonne_name_key" ON "colonne"("name");

-- CreateIndex
CREATE UNIQUE INDEX "carte_name_key" ON "carte"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categorie_nom_key" ON "categorie"("nom");

-- AddForeignKey
ALTER TABLE "carte" ADD CONSTRAINT "carte_colonneId_fkey" FOREIGN KEY ("colonneId") REFERENCES "colonne"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carte_categorie" ADD CONSTRAINT "carte_categorie_carteId_fkey" FOREIGN KEY ("carteId") REFERENCES "carte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carte_categorie" ADD CONSTRAINT "carte_categorie_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
