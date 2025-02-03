"use client"; // Ensure this is a client component if you're using hooks like useState
import { FormProjet } from "@/src/lib/components/personal/FormProjet";

export default function AddProjet() {
  return (
    <div className="flex items-center justify-center">
      <FormProjet />
    </div>
  );
}
