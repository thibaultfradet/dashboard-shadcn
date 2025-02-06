import { FormProjet } from "@/src/lib/components/personal/FormProjet";

export default async function EditProjet({
  params,
}: {
  params: { projetId: string };
}) {
  const projetId = params.projetId;

  return (
    <div className="flex items-center justify-center">
      <FormProjet projetId={projetId} />
    </div>
  );
}
