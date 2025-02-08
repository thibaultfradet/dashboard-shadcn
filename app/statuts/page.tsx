"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/src/lib/components/ui/table";
import { Button } from "@/src/lib/components/ui/button";
import getAllStatuts from "@/src/lib/actions/statuts/getAllStatuts.action";
import { Statut } from "@prisma/client";
import ModalStatut from "@/src/lib/components/personal/ModalStaut";
import removeStatutAction from "@/src/lib/actions/statuts/removeStatut.action";

export default function StatutsPage() {
  const [allStatuts, setAllStatuts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStatuts = async () => {
    try {
      const statuts = await getAllStatuts();
      setAllStatuts(statuts);
    } catch (error) {
      console.error("Erreur lors de la récupération des statuts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuts();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="flex flex-col items-center gap-7">
      <div className="w-full text-left flex items-center justify-between m-6 p-6">
        <h2 className="text-4xl">Liste des statuts</h2>
        <ModalStatut statutId={null} onRefresh={fetchStatuts} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allStatuts.map((statut: Statut) => (
            <TableRow key={statut.id}>
              <TableCell>{statut.id}</TableCell>
              <TableCell>{statut.nom}</TableCell>
              <TableCell>{statut.description}</TableCell>
              <TableCell className="flex gap-7">
                {/* bouton modifier */}
                <Button className="mr-2" asChild>
                  <ModalStatut statutId={statut.id} onRefresh={fetchStatuts} />
                </Button>
                {/* bouton supprimer */}
                <Button
                  variant="destructive"
                  onClick={() => {
                    removeStatutAction(statut.id);
                    fetchStatuts();
                  }}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
