/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/src/lib/components/ui/input";
import { Textarea } from "@/src/lib/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/src/lib/components/ui/select";
import { Button } from "@/src/lib/components/ui/button";
import { Label } from "@/src/lib/components/ui/label";
import { Calendar } from "@/src/lib/components/ui/calendar";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function FormTache({
  tacheId = null,
  projetId,
}: {
  tacheId?: string | null;
  projetId: string;
}) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [statuts, setStatuts] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [taskData, setTaskData] = useState<any>(null);

  //A CHANGER
  const serverAction = tacheId ? "editTache" : "createTache";

  useEffect(() => {
    setIsClient(true);
    setDate(new Date());
  }, []);

  useEffect(() => {
    async function fetchStatuts() {
      const response = await fetch("/api/statuts/");
      const data = await response.json();
      setStatuts(data);
    }

    fetchStatuts();
  }, []);

  useEffect(() => {
    if (tacheId) {
      async function fetchTaskData() {
        const response = await fetch(`/api/taches/${tacheId}`);
        const data = await response.json();
        setTaskData(data);
      }

      fetchTaskData();
    }
  }, [tacheId]);

  return (
    <Card className="m-5 w-3/4">
      <CardHeader>
        <CardTitle>
          {tacheId ? "Modifier une tâche" : "Ajouter une tâche"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={serverAction}
          className="flex flex-col items-center justify-center gap-5"
        >
          {tacheId && <input type="hidden" name="tacheId" value={tacheId} />}
          <input type="hidden" name="projet_id" value={projetId} />
          <Label>Nom de la tâche</Label>
          <Input type="text" name="nom" defaultValue={taskData?.nom || ""} />
          <Label>Description de la tâche</Label>
          <Textarea
            name="description"
            defaultValue={taskData?.description || ""}
          />
          <Label>Date de début</Label>
          {isClient && (
            <Calendar
              mode="single"
              selected={
                taskData?.date_debut ? new Date(taskData.date_debut) : date
              }
              onSelect={setDate}
            />
          )}
          <Label>Temps estimé (heures)</Label>
          <Input
            type="number"
            name="estimation_temps"
            defaultValue={taskData?.estimation_temps || ""}
          />
          <Label>Statut</Label>
          <Select defaultValue={taskData?.statutId || ""}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionnez un statut" />
            </SelectTrigger>
            <SelectContent>
              {statuts.map((statut) => (
                <SelectItem key={statut.id} value={statut.id}>
                  {statut.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit">{tacheId ? "Modifier" : "Créer"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
