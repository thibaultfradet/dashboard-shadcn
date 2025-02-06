import { Button } from "@/src/lib/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/lib/components/ui/card";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

export default async function Projets() {
  const projets = await prisma.projet.findMany({
    include: {
      statut: true,
    },
  });

  return (
    <div className="flex flex-col items-center gap-7">
      <div className=" w-full text-left flex items-center justify-between m-6 p-6">
        <h1 className="text-5xl">Liste des projets</h1>
        <Button asChild>
          <Link href="/projets/add">Créer un projet</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-7">
        {projets.map((projet) => (
          <Link href={`/projets/${projet.id}`} key={projet.id}>
            <Card>
              <CardHeader>
                <CardTitle>{projet.nom}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{projet.description}</p>
                <p>
                  Date de début :
                  {new Date(projet.date_debut).toLocaleDateString()}
                </p>
                <p>Estimation de temps : {projet.estimation_temps} heures</p>
                <p>Statut : {projet.statut.nom}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
