import SuccessDialog from "@/src/lib/components/personal/SuccessDialog";
import { Button } from "@/src/lib/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/lib/components/ui/card";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

interface ProjetsProps {
  searchParams: {
    successAddProjet?: string;
    successEditProjet?: string;
  };
}

export default async function Projets({ searchParams }: ProjetsProps) {
  const { successAddProjet, successEditProjet } = await searchParams;

  const projets = await prisma.projet.findMany({
    include: { statut: true },
  });

  const success = successAddProjet === "1" || successEditProjet === "1";
  const type =
    successAddProjet === "1" ? "add" : successEditProjet === "1" ? "edit" : "";

  return (
    <div>
      <SuccessDialog success={success} type={type} />
      <div className="flex flex-col items-center gap-7">
        <div className="w-full text-left flex items-center justify-between m-6 p-6">
          <h1 className="text-4xl">Liste des projets</h1>
          <Button asChild>
            <Link href="/projets/add">Créer un projet</Link>
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-7">
          {projets.map((projet) => (
            <Link href={`/projets/${projet.id}`} key={projet.id}>
              <Card className="bg-slate-900">
                <CardHeader className="inline-flex flex-row w-96 justify-between items-center">
                  <p className="">{projet.nom}</p>
                  <Button
                    asChild
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    <Link href={`/projets/${projet.id}/edit`}>Modifier</Link>
                  </Button>
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
    </div>
  );
}
