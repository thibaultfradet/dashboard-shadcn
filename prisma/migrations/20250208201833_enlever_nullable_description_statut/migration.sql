-- CreateTable
CREATE TABLE `Projet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `date_debut` DATETIME(3) NOT NULL,
    `estimation_temps` INTEGER NOT NULL,
    `statutId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tache` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `projet_id` INTEGER NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `date_debut` DATETIME(3) NOT NULL,
    `estimation_temps` INTEGER NOT NULL,
    `statutId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TachesTemps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tache_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `temps` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Statut` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Projet` ADD CONSTRAINT `Projet_statutId_fkey` FOREIGN KEY (`statutId`) REFERENCES `Statut`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tache` ADD CONSTRAINT `Tache_statutId_fkey` FOREIGN KEY (`statutId`) REFERENCES `Statut`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tache` ADD CONSTRAINT `Tache_projet_id_fkey` FOREIGN KEY (`projet_id`) REFERENCES `Projet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TachesTemps` ADD CONSTRAINT `TachesTemps_tache_id_fkey` FOREIGN KEY (`tache_id`) REFERENCES `Tache`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
