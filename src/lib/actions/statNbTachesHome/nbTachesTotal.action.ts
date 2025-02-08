"use server";
import { prisma } from "../../prisma";

export default async function getNbTachesTotalAction() {
  const count = await prisma.tache.count();
  return count;
}
