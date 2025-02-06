import { prisma } from "../prisma";

export default async function getTacheRapideAction() {
  const taches = await prisma.tache.findMany({
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
