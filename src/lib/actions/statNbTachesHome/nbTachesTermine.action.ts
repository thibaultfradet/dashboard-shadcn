"use server";
import { prisma } from "../../prisma";

export default async function getNbTachesTermineAction() {
  const statutTermine = await prisma.statut.findFirst({
    where: {
      nom: {
        contains: "Termin", // Recherche partielle sur "Termin" ~ LIKE
      },
    },
  });

  if (!statutTermine) {
    return "Aucun statut terminé n'a été trouvé.";
  }

  const count = await prisma.tache.count({
    where: {
      statutId: statutTermine.id,
    },
  });

  return count;
}
