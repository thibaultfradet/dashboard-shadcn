"use server";

import { prisma } from "../../prisma";

export default async function editTacheAction({
  tache,
  tacheId,
}: {
  tache: {
    projet_id: number;
    nom: string;
    description: string;
    date_debut: Date;
    estimation_temps: number;
    statutId: number;
  };
  tacheId: number;
}) {
  try {
    // Récupérer la tâche existante à partir de l'ID
    const existingTache = await prisma.tache.findUnique({
      where: { id: tacheId },
    });

    // Vérifier si la tâche existe
    if (!existingTache) {
      throw new Error("Tâche non trouvée");
    }

    // Mettre à jour la tâche avec les nouvelles valeurs
    const updatedTache = await prisma.tache.update({
      where: { id: tacheId },
      data: {
        projet_id: tache.projet_id,
        nom: tache.nom,
        description: tache.description,
        date_debut: tache.date_debut,
        estimation_temps: tache.estimation_temps,
        statutId: tache.statutId,
      },
    });

    return { tache: updatedTache };
  } catch {
    return { tache: null };
  }
}
