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
import ModalStatut from "@/src/lib/components/personal/ModalStatut";
import removeStatutAction from "@/src/lib/actions/statuts/removeStatut.action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/src/lib/components/ui/dialog";

export default function StatutsPage() {
  const [allStatuts, setAllStatuts] = useState<Statut[]>([]);
  const [loading, setLoading] = useState(true);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const fetchStatuts = async () => {
    try {
      const statuts = await getAllStatuts();
      setAllStatuts(statuts);
    } catch (error) {
      console.error("Erreur lors du chargement des statuts :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStatut = async (statutId: number) => {
    try {
      await removeStatutAction(statutId);
      fetchStatuts();
    } catch (error) {
      console.error("Impossible de supprimer le statut :", error);
      setIsErrorDialogOpen(true);
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
          {allStatuts.map((statut) => (
            <TableRow key={statut.id}>
              <TableCell>{statut.id}</TableCell>
              <TableCell>{statut.nom}</TableCell>
              <TableCell>{statut.description}</TableCell>
              <TableCell className="flex gap-7">
                {/* bouton modifier */}
                <ModalStatut statutId={statut.id} onRefresh={fetchStatuts} />
                {/* bouton supprimer */}
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveStatut(statut.id)}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modale d'erreur */}
      <Dialog open={isErrorDialogOpen} onOpenChange={setIsErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Information</DialogTitle>
            <DialogDescription>
              ⚠️ Le statut ne peut pas être supprimé car il est utilisé par au
              moins un projet ou un autre statut ! ⚠️
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button onClick={() => setIsErrorDialogOpen(false)}>Fermer</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
