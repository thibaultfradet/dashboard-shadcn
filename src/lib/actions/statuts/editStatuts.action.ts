"use server";
import { prisma } from "../../prisma";

export default async function editStatutsAction(
  statut: {
    nom: string;
    description: string;
  },
  statutId: number
) {
  try {
    // Récupérer le statut existant à partir de l'ID
    const existingStatut = await prisma.statut.findUnique({
      where: { id: statutId },
    });

    // Vérifier si le statut existe
    if (!existingStatut) {
      throw new Error("Statut non trouvé");
    }

    // Mettre à jour le statut avec les nouvelles valeurs
    const updatedStatut = await prisma.statut.update({
      where: { id: statutId },
      data: {
        nom: statut.nom,
        description: statut.description,
      },
    });

    return { statut: updatedStatut };
  } catch (error) {
    console.error("Erreur lors de la modification du statut:", error);
    return { statut: null };
  }
}
