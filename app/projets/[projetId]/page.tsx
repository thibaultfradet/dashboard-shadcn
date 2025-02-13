/* eslint-disable @typescript-eslint/no-unused-vars */

import DeleteButtonProjet from "@/src/lib/components/personal/DeleteButtonProjet";
import { TableTache } from "@/src/lib/components/personal/TableTaches";
import { Button } from "@/src/lib/components/ui/button";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

export default async function ViewProjet({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projetId: string }>;
}) {
  const { projetId } = await params;

  // Fetch the projet data
  const projet = await prisma.projet.findUnique({
    where: { id: parseInt(projetId, 10) },
    include: {
      taches: {
        include: {
          statut: true,
        },
      },
      statut: true,
    },
  });

  if (!projet) {
    return <div>Projet not found</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full text-left flex items-center justify-between my-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">{projet.nom}</h1>
          <p className="text-xl">{projet.description}</p>
        </div>
        <Button asChild>
          <Link href={`/projets/${projet.id}/taches/add`}>
            Ajouter une tâche
          </Link>
        </Button>
      </div>
      <TableTache taches={projet.taches} isHome={false} projetId={projet.id} />
      <div className="w-full flex flex-row-reverse m-6 p-6">
        <DeleteButtonProjet projetId={projet.id} />
      </div>
    </div>
  );
}
