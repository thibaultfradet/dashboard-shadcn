"use server";
import { prisma } from "../../prisma";

export default async function getAllStatutsAction() {
  return await prisma.statut.findMany();
}
