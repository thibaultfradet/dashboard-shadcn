"use server";
import { prisma } from "../../prisma";

export default async function getNbTachesTermineAction() {
  const statutIdTermine = await prisma.statut.findFirst({
    where: {
      nom: "Terminé",
    },
  });
  if (!statutIdTermine) {
    return "Aucun statut terminé n'a été trouvé.";
  } else {
    const count = await prisma.tache.count({
      where: {
        statutId: statutIdTermine!.id,
      },
    });
    return count;
  }
}
