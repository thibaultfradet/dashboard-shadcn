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
import editProjetAction from "../../actions/projets/editProjet.action";
import { Projet, Statut } from "@prisma/client";
import getAllStatutsAction from "../../actions/statuts/getAllStatuts.action";
import { redirect } from "next/navigation";
import addProjetAction from "../../actions/projets/addProjet.action";
import getProjetAction from "../../actions/projets/getProjet.action";

export function FormProjet({ projetId = null }: { projetId?: number | null }) {
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState<Projet | null>(null);
  const [statuts, setStatuts] = useState<Statut[] | null>(null);
  const [selectedStatut, setSelectedStatut] = useState<number | null>(null);

  // Initialisation de la page
  useEffect(() => {
    async function fetchData() {
      try {
        await fetchStatutsData();
        if (projetId) {
          await fetchProjectData();
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  });

  // Fonction de récupération de données des statuts
  async function fetchStatutsData() {
    const tempStatutsAll = await getAllStatutsAction();
    setStatuts(tempStatutsAll);

    if (!projetId) {
      setSelectedStatut(tempStatutsAll[0].id);
    }
  }

  // Fonction de récupération des données du projet
  async function fetchProjectData() {
    const response = await getProjetAction(projetId!);
    if (response.projet) {
      setProjectData(response.projet);
      setSelectedStatut(response.projet.statutId);
    } else {
      redirect("/projets");
    }
  }

  //handle form submit on add
  const addProjet = async (FormData: FormData) => {
    const nom = FormData.get("nom") as string | null;
    const description = FormData.get("description") as string | null;
    const dateDebutStr = FormData.get("date_debut") as string | null;
    const estimationTempsStr = FormData.get("estimation_temps") as
      | string
      | null;

    const dateDebut = dateDebutStr ? new Date(dateDebutStr) : new Date(); // Utilise la date du jour si null
    const estimationTemps = estimationTempsStr ? Number(estimationTempsStr) : 0; // Par défaut, 0 si null

    const json = await addProjetAction({
      nom: nom || "",
      description: description || "",
      date_debut: dateDebut,
      estimation_temps: estimationTemps,
      statut_id: selectedStatut!,
    });

    //Si projet bien créer on redirige l'utilisateur vers la page de liste de projets
    if (json.projet) {
      redirect("/projets?successAddProjet=1");
    }
  };

  //handle form submit on edit
  const editProjet = async (FormData: FormData) => {
    const nom = FormData.get("nom") as string | null;
    const description = FormData.get("description") as string | null;
    const dateDebutStr = FormData.get("date_debut") as string | null;
    const estimationTempsStr = FormData.get("estimation_temps") as
      | string
      | null;

    const dateDebut = dateDebutStr ? new Date(dateDebutStr) : new Date(); // Date du jour par défaut
    const estimationTemps = estimationTempsStr ? Number(estimationTempsStr) : 0; // Par défaut, 0 si null
    const json = await editProjetAction(
      {
        nom: nom || "",
        description: description || "",
        date_debut: dateDebut,
        estimation_temps: estimationTemps,
        statut_id: selectedStatut!,
      },
      projetId!
    );
    if (json.projet) {
      redirect("/projets?successEditProjet=1");
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <Card className="m-5 w-3/4 ">
      <CardHeader>
        <CardTitle>Ajouter un projet</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            //modification
            if (projetId) {
              editProjet(formData);
            }

            //Création d'un projet
            else {
              addProjet(formData);
            }
          }}
          className="flex flex-col items-center justify-center gap-5"
        >
          {projetId && <input type="hidden" name="projetId" value={projetId} />}
          <Label>Nom du projet</Label>
          <Input type="text" name="nom" defaultValue={projectData?.nom || ""} />
          <Label>Description du projet</Label>
          <Textarea
            name="description"
            defaultValue={projectData?.description || ""}
          />
          <Label>Date de début du projet</Label>
          <Calendar
            mode="single"
            selected={
              projectData?.date_debut
                ? new Date(projectData.date_debut)
                : new Date()
            }
          />
          <Label>Estimations temps du projet</Label>
          <Input
            type="number"
            name="estimation_temps"
            defaultValue={projectData?.estimation_temps || ""}
          />
          <Label>Statut du projet</Label>
          <Select
            defaultValue={String(selectedStatut)}
            onValueChange={(value) => setSelectedStatut(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionnez un statut" />
            </SelectTrigger>
            <SelectContent>
              {statuts!.map((statut) => (
                <SelectItem key={statut.id} value={String(statut.id)}>
                  {statut.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit">Créer</Button>
        </form>
      </CardContent>
    </Card>
  );
}
