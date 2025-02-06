import getStatNbStatutTacheAction from "@/src/lib/actions/getStatNbStatutTache.action";
import getTacheRapideAction from "@/src/lib/actions/getTacheRapide.action";
import PieStatutChart from "@/src/lib/components/personal/PieStatutChart";
import { TableTache } from "@/src/lib/components/personal/TableTaches";
import { Card, CardContent, CardHeader } from "@/src/lib/components/ui/card";

export default async function Home() {
  const tacheRapide = await getTacheRapideAction();

  const nbTacheByStatut = await getStatNbStatutTacheAction();
  return (
    <div>
      <div className="flex flex-col gap-5">
        <Card className="">
          <CardHeader>
            <h3 className="text-3xl">Taches avec temps court</h3>
          </CardHeader>
          <CardContent>
            <TableTache taches={tacheRapide} />
          </CardContent>
        </Card>
        <div className="grid grid-cols-3 gap-3">
          <PieStatutChart data={nbTacheByStatut} />
          <PieStatutChart data={nbTacheByStatut} />
          <PieStatutChart data={nbTacheByStatut} />
        </div>
      </div>
      Home
    </div>
  );
}
