"use server";
import { prisma } from "../../prisma";

export default async function editProjetAction(
  projet: {
    nom: string;
    description: string;
    date_debut: Date;
    estimation_temps: number;
    statut_id: number;
  },
  projetId: number
) {
  try {
    // Récupérer le projet existant à partir de l'ID
    const existingProjet = await prisma.projet.findUnique({
      where: { id: parseInt(String(projetId), 10) },
    });
    // Vérifier si le projet existe
    if (!existingProjet) {
      throw new Error("projet non trouvé.");
    }
    // Mettre à jour le projet avec les nouvelles valeurs
    const updatedProjet = await prisma.projet.update({
      where: { id: parseInt(String(projetId), 10) },
      data: {
        nom: projet.nom,
        description: projet.description,
        date_debut: projet.date_debut,
        estimation_temps: projet.estimation_temps,
        statutId: projet.statut_id,
      },
    });

    return { projet: updatedProjet };
  } catch {
    return { projet: null };
  }
}
