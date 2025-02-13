"use server";
import { prisma } from "../prisma";

export async function getStatNbStatutTacheAction() {
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

export async function getNbTachesByProjet() {
  const nbTacheByProjet = await prisma.tache.groupBy({
    by: ["projet_id"],
    _count: {
      id: true,
    },
  });

  // Récupérer les labels des projets associés
  const statuses = await prisma.projet.findMany({
    where: {
      id: { in: nbTacheByProjet.map((t) => t.projet_id) },
    },
    select: {
      id: true,
      nom: true,
    },
  });

  // Associer les labels aux résultats
  const result = nbTacheByProjet.map((t) => ({
    label: statuses.find((s) => s.id === t.projet_id)?.nom || "Inconnu",
    count: t._count.id,
  }));

  return result;
}
