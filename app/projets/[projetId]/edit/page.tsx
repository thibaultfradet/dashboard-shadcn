import { FormProjet } from "@/src/lib/components/personal/FormProjet";

export default async function EditProjet({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projetId: number }>;
}) {
  const { projetId } = await params;
  return (
    <div className="flex items-center justify-center">
      <FormProjet projetId={projetId} />
    </div>
  );
}
