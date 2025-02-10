"use server";
import { prisma } from "../../prisma";

export default async function getProjetAction(projetId: number) {
  try {
    const projet = await prisma.projet.findUnique({
      where: {
        id: parseInt(String(projetId), 10),
      },
    });
    return projet ? { projet: projet } : { projet: null };
  } catch {
    return { projet: null };
  }
}
