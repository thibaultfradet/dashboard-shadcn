import getStatNbStatutTacheAction from "@/src/lib/actions/getStatNbStatutTache.action";
import getTacheRapideAction from "@/src/lib/actions/getTacheRapide.action";
import getNbTachesAFaire from "@/src/lib/actions/statNbTachesHome/nbTachesAFaire.action";
import getNbTachesEnCours from "@/src/lib/actions/statNbTachesHome/nbTachesEnCours.action";
import getNbTachesTermine from "@/src/lib/actions/statNbTachesHome/nbTachesTermine.action";
import getNbTachesTotal from "@/src/lib/actions/statNbTachesHome/nbTachesTotal.action";
import PieStatutChart from "@/src/lib/components/personal/PieStatutChart";
import StatCard from "@/src/lib/components/personal/StatCard";
import { TableTache } from "@/src/lib/components/personal/TableTaches";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/lib/components/ui/card";

export default async function Home() {
  //tableau
  const tacheRapide = await getTacheRapideAction();
  // stat taches
  const nbTachesAFaire = await getNbTachesAFaire();
  const nbTachesEnCours = await getNbTachesEnCours();
  const nbTachesTermine = await getNbTachesTermine();
  const nbTachesTotal = await getNbTachesTotal();
  // stat graph
  const nbTacheByStatut = await getStatNbStatutTacheAction();
  return (
    <div>
      <div className="flex flex-col gap-5 mt-6 p-6">
        <Card className="">
          <CardHeader>
            <h3 className="text-3xl">Taches avec temps court</h3>
          </CardHeader>
          <CardContent>
            <TableTache taches={tacheRapide} />
          </CardContent>
        </Card>
        <div className="grid grid-cols-4 gap-3" id="statGeneral">
          <StatCard
            title={"Nombre de tâches à faire"}
            value={String(nbTachesAFaire)}
            subTitle={null}
          />
          <StatCard
            title={"Nombre de tâches en cours"}
            value={String(nbTachesEnCours)}
            subTitle={null}
          />
          <StatCard
            title={"Nombre de tâches terminées"}
            value={String(nbTachesTermine)}
            subTitle={null}
          />
          <StatCard
            title={"Nombre de tâches totales"}
            value={String(nbTachesTotal)}
            subTitle={null}
          />
        </div>
        <div className="grid grid-cols-3 gap-3" id="statGraph">
          <PieStatutChart data={nbTacheByStatut} />
          <PieStatutChart data={nbTacheByStatut} />
          <PieStatutChart data={nbTacheByStatut} />
        </div>
      </div>
      Home
    </div>
  );
}
