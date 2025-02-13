import { prisma } from "../../prisma";

export async function getTempTotalEstimeTacheAction() {
  const result = await prisma.tache.aggregate({
    _sum: {
      estimation_temps: true,
    },
  });
  return result._sum.estimation_temps;
}
export async function getTempTotalEstimeProjetAction() {
  const result = await prisma.projet.aggregate({
    _sum: {
      estimation_temps: true,
    },
  });

  return result._sum.estimation_temps;
}

export async function getTempPasse() {
  const result = await prisma.tachesTemps.aggregate({
    _sum: {
      temps: true,
    },
  });

  return result._sum.temps;
}
