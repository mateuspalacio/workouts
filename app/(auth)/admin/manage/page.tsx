import AdminWorkoutManager from "@/components/AdminWorkoutManager";

export default function AdminManagePage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Treinos</h1>
      <AdminWorkoutManager />
    </main>
  );
}
