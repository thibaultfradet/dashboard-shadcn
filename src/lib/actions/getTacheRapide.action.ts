"use server";
import { prisma } from "../prisma";

export default async function getTacheRapideAction() {
  const taches = await prisma.tache.findMany({
    where: {
      statut: {
        nom: {
          notIn: ["Terminé", "Suspendu"],
        },
      },
    },
    orderBy: {
      estimation_temps: "asc",
    },
    take: 15,
    include: {
      statut: true,
    },
  });
  return taches;
}
