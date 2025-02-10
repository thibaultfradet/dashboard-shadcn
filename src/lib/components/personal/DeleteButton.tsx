"use client";

import { Button } from "@/src/lib/components/ui/button";
import { redirect } from "next/navigation";
import deleteProjetAction from "../../actions/projets/deleteProjet.action";
import { useState } from "react";

export default function DeleteButtonProjet({ projetId }: { projetId: number }) {
  const [isConfirm, setIsConfirm] = useState(false);

  const handleDelete = async () => {
    const result = await deleteProjetAction(projetId);
    if (result === true) {
      redirect("/projets");
    } else {
      alert("Une erreur est survenue lors de la suppression du projet.");
    }
  };

  return (
    <Button
      variant={isConfirm ? "destructive" : "outline"}
      onClick={() => {
        if (isConfirm) {
          handleDelete();
        } else {
          setIsConfirm(true);
        }
      }}
    >
      Supprimer
    </Button>
  );
}
