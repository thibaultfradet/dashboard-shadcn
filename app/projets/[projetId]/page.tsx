import { TableTache } from "@/src/lib/components/personal/TableTaches";
import { prisma } from "@/src/lib/prisma";

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
    <div>
      <h1>{projet.nom}</h1>
      <p>{projet.description}</p>
      <TableTache taches={projet.taches} />
    </div>
  );
}
