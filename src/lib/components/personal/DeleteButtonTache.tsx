"use client";

import { Button } from "@/src/lib/components/ui/button";
import { redirect } from "next/navigation";
import deleteTacheAction from "../../actions/taches/deleteTache.action";

export default function DeleteButtonTache({ tacheId }: { tacheId: number }) {
  //handle clic du bouton
  const handleDelete = async () => {
    const result = await deleteTacheAction(tacheId);
    if (result === true) {
      redirect("/Taches");
    } else {
      alert("Une erreur est survenue lors de la suppression du Tache.");
    }
  };

  return (
    <Button
      variant="destructive"
      onClick={() => {
        handleDelete();
      }}
    >
      Supprimer
    </Button>
  );
}
