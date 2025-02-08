"use server";
import { prisma } from "../../prisma";

export default async function addStatutsAction(statut: {
  nom: string;
  description: string;
}) {
  try {
    const newStatut = await prisma.statut.create({
      data: {
        nom: statut.nom,
        description: statut.description,
      },
    });
    return { statut: newStatut };
  } catch {
    return { statut: null };
  }
}
