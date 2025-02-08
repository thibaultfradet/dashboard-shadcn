"use server";
import { prisma } from "../../prisma";

export default async function getNbTachesAFaireAction() {
  const statutIdAFaire = await prisma.statut.findFirst({
    where: {
      nom: "A faire",
    },
  });
  if (!statutIdAFaire) {
    return "Aucun statut à faire n'a été trouvé.";
  } else {
    const count = await prisma.tache.count({
      where: {
        statutId: statutIdAFaire!.id,
      },
    });
    return count;
  }
}
