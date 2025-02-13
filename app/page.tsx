import {
  getNbTachesByProjet,
  getStatNbStatutTacheAction,
} from "@/src/lib/actions/getStatNbStatutTache.action";
import getTacheRapideAction from "@/src/lib/actions/getTacheRapide.action";
import getNbTachesAFaireAction from "@/src/lib/actions/statNbTachesHome/nbTachesAFaire.action";
import getNbTachesEnCoursAction from "@/src/lib/actions/statNbTachesHome/nbTachesEnCours.action";
import getNbTachesTermineAction from "@/src/lib/actions/statNbTachesHome/nbTachesTermine.action";
import getNbTachesTotalAction from "@/src/lib/actions/statNbTachesHome/nbTachesTotal.action";
import {
  getTempPasse,
  getTempTotalEstimeProjetAction,
  getTempTotalEstimeTacheAction,
} from "@/src/lib/actions/statsTempsHome/TempTotalEstime.action";
import { LineTempsChart } from "@/src/lib/components/personal/LineTempsChart";
import PieNbTacheParProjet from "@/src/lib/components/personal/PieNbTacheParProjet";
import PieStatutChart from "@/src/lib/components/personal/PieStatutChart";
import StatCard from "@/src/lib/components/personal/StatCard";
import { TableTache } from "@/src/lib/components/personal/TableTaches";
import { Card, CardContent, CardHeader } from "@/src/lib/components/ui/card";

export default async function Home() {
  //tableau
  const tacheRapide = await getTacheRapideAction();
  // stat taches
  const nbTachesAFaire = await getNbTachesAFaireAction();
  const nbTachesEnCours = await getNbTachesEnCoursAction();
  const nbTachesTermine = await getNbTachesTermineAction();
  const nbTachesTotal = await getNbTachesTotalAction();
  // stat graph
  const nbTacheByStatut = await getStatNbStatutTacheAction();
  const nbTachesByProjet = await getNbTachesByProjet();
  //stat temps
  const tempEstimeTache = await getTempTotalEstimeTacheAction();
  const tempEstimeProjet = await getTempTotalEstimeProjetAction();
  const tempsDejaPasse = await getTempPasse();

  return (
    <div>
      <div className="flex flex-col gap-5 mt-6 p-6">
        {/* tache rapide et stat temps line */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="col-span-2">
            <CardHeader>
              <h3 className="text-3xl">Taches avec temps court</h3>
            </CardHeader>
            <CardContent>
              <TableTache taches={tacheRapide} isHome={true} projetId={null} />
            </CardContent>
          </Card>
          <div className="col-span-1">
            <LineTempsChart />
          </div>
        </div>
        {/* nb taches */}
        <div className="grid grid-cols-4 gap-3" id="statTaches">
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
        {/* pie stat */}
        <div className="grid grid-cols-3 gap-3" id="statGraph">
          <PieStatutChart data={nbTacheByStatut} />
          <PieNbTacheParProjet data={nbTachesByProjet} />
          <PieStatutChart data={nbTacheByStatut} />
        </div>
        {/* stat temps */}
        <div className="grid grid-cols-3 gap-3" id="statTemps">
          <StatCard
            title={"Temps estimé pour finir les taches"}
            value={String(tempEstimeTache) + " heures"}
            subTitle={null}
          />
          <StatCard
            title={"Temps estimé pour finir les projets"}
            value={String(tempEstimeProjet) + " heures"}
            subTitle={null}
          />
          <StatCard
            title={"Temps total déjà passé"}
            value={String(tempsDejaPasse) + " heures"}
            subTitle={null}
          />
        </div>
      </div>
    </div>
  );
}
