import { FormProjet } from "@/src/lib/components/personal/FormProjet";

export default async function editProjet(props: {
  params: { projetId: string };
}) {
  const projetId = await props.params.projetId;
  return (
    <div className="flex items-center justify-center">
      <FormProjet projetId={projetId} />
    </div>
  );
}
