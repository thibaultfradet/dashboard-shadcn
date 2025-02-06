import { prisma } from "@/src/lib/prisma";

export default async function ViewProjet({
  params,
}: {
  params: { tacheId: string };
}) {
  const tacheIddString = params.tacheId;
  const tacheId = parseInt(tacheIddString, 10);

  // Fetch the tache data
  const tache = await prisma.tache.findUnique({
    where: { id: tacheId },
    include: {
      statut: true,
    },
  });

  if (!tache) {
    return <div>Tache not found</div>;
  }

  return (
    <div>
      <h1>{tache.nom}</h1>
      <p>{tache.description}</p>
    </div>
  );
}
