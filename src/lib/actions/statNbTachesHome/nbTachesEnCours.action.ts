"use server";
import { prisma } from "../../prisma";

export default async function getNbTachesEnCoursAction() {
  const statutIdEnCours = await prisma.statut.findFirst({
    where: {
      nom: "En cours",
    },
  });
  if (!statutIdEnCours) {
    return "Aucun statut en cours n'a été trouvé.";
  } else {
    const count = await prisma.tache.count({
      where: {
        statutId: statutIdEnCours!.id,
      },
    });
    return count;
  }
}
