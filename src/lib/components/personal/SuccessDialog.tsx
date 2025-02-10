"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/src/lib/components/ui/dialog";
import { Button } from "@/src/lib/components/ui/button";

interface SuccessDialogProps {
  success: boolean;
  type: string;
}

export default function SuccessDialog({ success, type }: SuccessDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    if (success) {
      setOpen(true);
      if (type === "add") {
        setTitle("Projet créé avec succès 🎉");
        setSubTitle("Le projet a été ajouté avec succès.");
      } else if (type === "edit") {
        setTitle("Projet modifié avec succès ✨");
        setSubTitle("Le projet a été modifié avec succès.");
      }
    }
  }, [success, type]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {subTitle && <DialogDescription>{subTitle}</DialogDescription>}
        </DialogHeader>
        <DialogClose asChild>
          <Button onClick={() => setOpen(false)}>Fermer</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
