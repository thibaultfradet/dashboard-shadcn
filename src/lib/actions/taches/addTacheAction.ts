"use server";

import { prisma } from "../../prisma";

export default async function addTacheAction(tache: {
  projet_id: number;
  nom: string;
  description: string;
  date_debut: Date;
  estimation_temps: number;
  statutId: number;
}) {
  try {
    const newTache = await prisma.tache.create({
      data: {
        projet_id: tache.projet_id,
        nom: tache.nom,
        description: tache.description,
        date_debut: tache.date_debut,
        estimation_temps: tache.estimation_temps,
        statutId: tache.statutId,
      },
    });
    return { tache: newTache };
  } catch {
    return { tache: null };
  }
}
