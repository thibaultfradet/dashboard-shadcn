
import { Button } from "@/src/lib/components/ui/button";
import { Card, CardContent } from "@/src/lib/components/ui/card";
import { Input } from "@/src/lib/components/ui/input";
import { Label } from "@/src/lib/components/ui/label";

export default function Fiche()
{
    return( 
        <div>
            <div className="w-full text-left flex items-center justify-between m-6 p-6">
                <h3 className="text-3xl">Fiche</h3>
                <Button >Ajouter un temps</Button>
            </div>
        <div className="flex flex-col">
                <div id="contentFiche flex">
                    <Card id="cumulTemps"></Card>                        
                    <Card id="formTemps w-48 flex flex-col">
                        <CardContent>
                        <form>
                            <Label> test</Label>
                            <Input />
                        </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}