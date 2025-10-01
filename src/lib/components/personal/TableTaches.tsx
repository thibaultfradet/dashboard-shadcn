import { Tache } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import DeleteButtonTache from "./DeleteButtonTache";

export function TableTache({
  taches,
  isHome,
  projetId,
}: {
  taches: Tache[];
  isHome: boolean;
  projetId: number | null;
}) {

  return (
    <Card className="">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date de début</TableHead>
              <TableHead>Estimation (h)</TableHead>
              <TableHead>Statut</TableHead>
              {!isHome && (
                <>
                  <TableHead>Modifier le tâche</TableHead>
                  <TableHead>Supprimer le tâche</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {taches.map((tache: Tache) => (
              <TableRow key={tache.id}>
                <TableCell className="font-medium">{tache.id}</TableCell>
                <TableCell>{tache.nom}</TableCell>
                <TableCell>{tache.description || "N/A"}</TableCell>
                <TableCell>
                  {new Date(tache.date_debut).toLocaleDateString()}
                </TableCell>
                <TableCell>{tache.estimation_temps}</TableCell>
                <TableCell>{tache.statut.nom}</TableCell>
                {!isHome && (
                  <>
                    <TableCell>
                      <Button
                        asChild
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        <Link href={`/projets/${projetId!}/edit`}>
                          Modifier
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <DeleteButtonTache tacheId={tache.id} />
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>

          {/* <TableFooter className="w-full">
        <TableRow className="w-full">
          <TableCell colSpan={4}>Total des tâches</TableCell>
          <TableCell className="text-right">{taches.taches.length}</TableCell>
        </TableRow>
      </TableFooter> */}
        </Table>
      </CardContent>
    </Card>
  );
}
