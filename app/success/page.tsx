import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { BadgeCheck, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function SuccessPage() {
  const user = await currentUser();

  const { data } = await supabase
    .from("users")
    .select("ispremium")
    .eq("clerk_id", user?.id)
    .single();

  const isPro = data?.ispremium ?? false;

  return (
    <div className="max-w-2xl mx-auto text-center py-20 px-6 space-y-6">
      <div className="flex justify-center">
        <BadgeCheck className="text-green-500 w-16 h-16" />
      </div>

      <h1 className="text-3xl font-bold">
        {isPro ? "Bem-vindo ao plano PRO!" : "Obrigado pela assinatura!"}
      </h1>

      <p className="text-muted-foreground">
        {isPro
          ? "Você agora tem acesso total aos treinos mensais, histórico e muito mais."
          : "Seu pagamento está sendo processado. Se o acesso PRO não aparecer de imediato, aguarde um momento e atualize a página."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <Link href="/dashboard">
          <Button size="lg">
            <Dumbbell className="mr-2 w-4 h-4" />
            Ir para meus treinos
          </Button>
        </Link>

        <Link href="/planos">
          <Button size="lg" variant="outline">
            Ver planos
          </Button>
        </Link>
      </div>
    </div>
  );
}
