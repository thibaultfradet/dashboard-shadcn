"use server";

import { prisma } from "../../prisma";

export default async function addProjetAction(projet: {
  nom: string;
  description: string;
  date_debut: Date;
  estimation_temps: number;
  statut_id: number;
}) {
  try {
    const newProjet = await prisma.projet.create({
      data: {
        nom: projet.nom,
        description: projet.description,
        date_debut: projet.date_debut,
        estimation_temps: projet.estimation_temps,
        statutId: projet.statut_id,
      },
    });
    return { projet: newProjet };
  } catch {
    return { projet: null };
  }
}
