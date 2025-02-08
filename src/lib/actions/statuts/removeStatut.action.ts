"use server";
import { prisma } from "../../prisma";

export default async function removeStatutAction(statutId: number) {
  await prisma.statut.delete({
    where: {
      id: statutId,
    },
  });
}
