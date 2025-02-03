import { prisma } from "@/src/lib/prisma";

export default async function viewProjet(props: {
  params: { projetId: string };
}) {
  const projetId = parseInt(props.params.projetId, 10);

  const projet = await prisma.projet.findUnique({
    where: { id: projetId },
    include: {
      taches: true,
      statut: true,
    },
  });

  if (projet == null) {
    return (
      <div className="flex flex-col items-center gap-7">
        <h1 className="text-5xl">Aucun projet trouvé</h1>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-7">
        <h1 className="text-5xl">Projet {projet.nom}</h1>
      </div>
    );
  }
}
