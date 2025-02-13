"use server";
import { prisma } from "../../prisma";

export default async function deleteProjetAction(tacheId: number) {
  try {
    const result = await prisma.tache.delete({
      where: {
        id: tacheId,
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
