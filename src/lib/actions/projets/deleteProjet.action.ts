"use server";
import { prisma } from "../../prisma";

export default async function deleteProjetAction(projetId: number) {
  try {
    const result = await prisma.projet.delete({
      where: {
        id: projetId,
      },
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}
