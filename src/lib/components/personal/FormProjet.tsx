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

export function FormProjet({ projetId = null }: { projetId?: string | null }) {
  const [date, setDate] = useState<Date | undefined>(undefined); // Initialize as undefined
  const [statuts, setStatuts] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering
  const [projectData, setProjectData] = useState<any>(null); // State to store fetched project data

  // A CHANGER
  const serverAction = projetId ? "editProjetAction" : "createProjetAction";

  useEffect(() => {
    setIsClient(true); // Set isClient to true after hydration
    setDate(new Date()); // Set the current date after hydration
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
    if (projetId) {
      async function fetchProjectData() {
        const response = await fetch(`/api/statuts/${projetId}`);
        const data = await response.json();
        setProjectData(data);
      }

      fetchProjectData();
    }
  }, [projetId]);

  return (
    <Card className="m-5 w-3/4 ">
      <CardHeader>
        <CardTitle>Ajouter un projet</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={serverAction}
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
          {isClient && ( // Render Calendar only on the client side
            <Calendar
              mode="single"
              selected={
                projectData?.date_debut
                  ? new Date(projectData.date_debut)
                  : date
              }
              onSelect={setDate}
            />
          )}
          <Label>Estimations temps du projet</Label>
          <Input
            type="number"
            name="estimation_temps"
            defaultValue={projectData?.estimation_temps || ""}
          />
          <Label>Statut du projet</Label>
          <Select defaultValue={projectData?.statut_id || ""}>
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
          <Button type="submit">Créer</Button>
        </form>
      </CardContent>
    </Card>
  );
}

// "use client";
// import { Input } from "@/src/lib/components/ui/input";
// import { Textarea } from "@/src/lib/components/ui/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/src/lib/components/ui/select";
// import { Button } from "@/src/lib/components/ui/button";
// import { Label } from "@/src/lib/components/ui/label";
// import { Calendar } from "@/src/lib/components/ui/calendar";
// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// export function FormProjet({ projetId = null }: { projetId?: string | null }) {
//   const [date, setDate] = useState<Date | undefined>(undefined); // Initialize as undefined
//   const [statuts, setStatuts] = useState<any[]>([]);
//   const [isClient, setIsClient] = useState(false); // Track client-side rendering

//   const serverAction = projetId ? "editProjet" : "createProjet";

//   useEffect(() => {
//     setIsClient(true); // Set isClient to true after hydration
//     setDate(new Date()); // Set the current date after hydration
//   }, []);

//   useEffect(() => {
//     async function fetchStatuts() {
//       const response = await fetch("/api/statuts/");
//       const data = await response.json();
//       setStatuts(data);
//     }

//     fetchStatuts();
//   }, []);

//   return (
//     <Card className="m-5 w-3/4 ">
//       <CardHeader>
//         <CardTitle>Ajouter un projet</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form
//           action={serverAction}
//           className="flex flex-col items-center justify-center gap-5"
//         >
//           {projetId && <input type="hidden" name="projetId" value={projetId} />}
//           <Label>Nom du projet</Label>
//           <Input type="text" name="nom" />
//           <Label>Description du projet</Label>
//           <Textarea name="description" />
//           <Label>Date de début du projet</Label>
//           {isClient && ( // Render Calendar only on the client side
//             <Calendar mode="single" selected={date} onSelect={setDate} />
//           )}
//           <Label>Estimations temps du projet</Label>
//           <Input type="number" name="estimation_temps" />
//           <Label>Statut du projet</Label>
//           <Select>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Sélectionnez un statut" />
//             </SelectTrigger>
//             <SelectContent>
//               {statuts.map((statut) => (
//                 <SelectItem key={statut.id} value={statut.id}>
//                   {statut.nom}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <Button type="submit">Créer</Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
