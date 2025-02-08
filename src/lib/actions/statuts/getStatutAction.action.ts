"use server";
import { prisma } from "../../prisma";

export default async function getStatutAction(statutId: number) {
  const result = await prisma.statut.findUnique({
    where: {
      id: statutId,
    },
  });
  return result;
}
