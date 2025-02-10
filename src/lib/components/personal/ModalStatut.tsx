"use client";
import { useState, useEffect } from "react";
import { Button } from "@/src/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/lib/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import addStatutsAction from "../../actions/statuts/addStatuts.action";
import editStatutsAction from "../../actions/statuts/editStatuts.action";
import getStatutAction from "../../actions/statuts/getStatutAction.action";

interface ModalStatutProps {
  statutId: number | null;
  onRefresh: () => void; // Ajout de la prop onRefresh
}

export default function ModalStatut({ statutId, onRefresh }: ModalStatutProps) {
  const [nom, setNom] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setNom("");
      setDescription("");
      if (statutId) {
        const fetchStatut = async () => {
          const statut = await getStatutAction(statutId);
          if (statut) {
            setNom(statut.nom);
            setDescription(statut.description);
          }
        };
        fetchStatut();
      }
    }
  }, [isOpen, statutId]);

  const addStatut = async (FormData: FormData) => {
    const json = await addStatutsAction({
      nom: String(FormData.get("nom")),
      description: String(FormData.get("description")),
    });

    if (json) {
      setIsOpen(false);
      onRefresh(); // Appeler onRefresh après l'ajout
    }
  };

  const editStatut = async (FormData: FormData) => {
    const json = await editStatutsAction(
      {
        nom: String(FormData.get("nom")),
        description: String(FormData.get("description")),
      },
      statutId!
    );

    if (json) {
      setIsOpen(false);
      onRefresh(); // Appeler onRefresh après la modification
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          {statutId ? "Modifier un statut" : "Créer un statut"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>
            {statutId ? "Modifier un statut" : "Créer un statut"}
          </DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-7"
          action={async (formData) => {
            if (statutId) {
              await editStatut(formData);
            } else {
              await addStatut(formData);
            }
          }}
        >
          <div className="flex flex-col gap-3">
            <Label>Nom du statut</Label>
            <Input
              name="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Description du statut</Label>
            <Input
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button type="submit">{statutId ? "Modifier" : "Créer"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
