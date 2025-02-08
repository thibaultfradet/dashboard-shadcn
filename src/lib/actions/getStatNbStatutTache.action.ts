"use server";
import { prisma } from "../prisma";

export default async function getStatNbStatutTacheAction() {
  const nbStatutByTache = await prisma.tache.groupBy({
    by: ["statutId"],
    _count: {
      id: true,
    },
  });

  // Récupérer les labels des statuts associés
  const statuses = await prisma.statut.findMany({
    where: {
      id: { in: nbStatutByTache.map((t) => t.statutId) },
    },
    select: {
      id: true,
      nom: true,
    },
  });

  // Associer les labels aux résultats
  const result = nbStatutByTache.map((t) => ({
    label: statuses.find((s) => s.id === t.statutId)?.nom || "Inconnu",
    count: t._count.id,
  }));

  return result;
}
