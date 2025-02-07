import { prisma } from "../../prisma";

export default async function getNbTachesTotal() {
  const count = await prisma.tache.count();
  return count;
}
