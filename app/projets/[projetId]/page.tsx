import { TableTache } from "@/src/lib/components/personal/TableTaches";
import { Button } from "@/src/lib/components/ui/button";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

export default async function ViewProjet({
  params,
}: {
  params: { projetId: string };
}) {
  const projetIdString = params.projetId;
  const projetId = parseInt(projetIdString, 10);

  // Fetch the projet data
  const projet = await prisma.projet.findUnique({
    where: { id: projetId },
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
      <div className="w-full text-left flex items-center justify-between m-6 p-6">
        <div className="flex flex-col">
          <h1>{projet.nom}</h1>
          <p>{projet.description}</p>
        </div>
        <Button asChild>
          <Link href={`/projets/${projet.id}/taches/add`}>
            Ajouter une tâche
          </Link>
        </Button>
      </div>
      <TableTache taches={projet.taches} />
    </div>
  );
}
