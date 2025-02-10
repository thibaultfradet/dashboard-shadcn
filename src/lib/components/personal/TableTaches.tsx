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

export function TableTache(taches: Tache[]) {
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {taches.taches.map((tache: Tache) => (
              <TableRow key={tache.id}>
                <TableCell className="font-medium">{tache.id}</TableCell>
                <TableCell>{tache.nom}</TableCell>
                <TableCell>{tache.description || "N/A"}</TableCell>
                <TableCell>
                  {new Date(tache.date_debut).toLocaleDateString()}
                </TableCell>
                <TableCell>{tache.estimation_temps}</TableCell>
                <TableCell>{tache.statut.nom}</TableCell>
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
