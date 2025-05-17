'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu} from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { links } from '@/lib/links';

export default function Navbar() {
    const pathname = usePathname();

  const { user } = useUser();
  
const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
          method: "POST",
          body: JSON.stringify({ clerkId: user.id }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const json = await res.json();
        setIsPremium(json?.ispremium ?? false);
      } catch (err) {
        console.error("Error checking premium status:", err);
      }
    };

    checkPremiumStatus();
  }, [user]);

  const isAdminUser = user?.emailAddresses[0]?.emailAddress === "mateuspalacio@gmail.com";
  const [loading, setLoading] = useState(false);
const [open, setOpen] = useState(false);

  const handleStripePortal = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-muted rounded-lg px-4 py-2 sticky top-0 z-10">
       {/* Mobile: Logo + Sidebar Trigger */}
  <div className="sm:hidden fixed top-0 left-0 right-0 z-40 px-4 py-2 flex items-center bg-muted justify-between rounded-lg">
    <Sheet open={open} onOpenChange={setOpen}>
       
      <SheetTrigger asChild>
        <Button variant="ghost" size="lg">
          <Menu className="w-16 h-16 text-white-600 animate-pulse" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64 h-full flex flex-col px-4 py-6">
        <SheetHeader>
  <SheetTitle>
    <Image
              src="/logo.png"
              alt="Elevio"
              width={60}
              height={60}
              className="transition-all"
            />
  </SheetTitle>
</SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <MobileSidebarLinks pathname={pathname} closeSidebar={() => setOpen(false)} />
        </div>
         {/* Divider */}
  <div className="h-px bg-border my-3" />

  {/* Auth Controls */}
  <div className="space-y-2 mt-2">
    <SignedIn>
      {isPremium ? (
        <Button
          onClick={handleStripePortal}
          variant="outline"
          size="sm"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Carregando...' : 'Gerenciar Inscrição'}
        </Button>
      ) : (
        <Link href="/precos">
          <Button variant="outline" size="sm" className="w-full">Ver Planos</Button>
        </Link>
      )}
      <div className="pt-2">
        <UserButton/>
      </div>
    </SignedIn>

    <SignedOut>
      <Link href="/precos">
        <Button variant="outline" size="sm" className="w-full">Ver Planos</Button>
      </Link>
      <div className='py-1'>
      <SignInButton mode="modal">
        <Button variant="outline" size="sm" className="w-full">Entrar</Button>
      </SignInButton>
      </div>
    </SignedOut>
  </div>
      </SheetContent>
    </Sheet>
    <Link href="/">
      <Image src="/logo.png" alt="Logo" width={30} height={40} />
    </Link>
  </div>

  {/* Desktop: Full Navbar */}
  <div className="hidden sm:flex px-4 py-2 sticky top-0 z-30 w-full justify-between items-center">
    <Link href="/">
      <Image src="/logo.png" alt="Logo" width={150} height={40} hidden />
    </Link>

    <div className="flex items-center gap-4">
          <SignedIn>
            {isPremium ? (
              <Button
                onClick={handleStripePortal}
                variant="outline"
                size="sm"
                disabled={loading}
              >
                {loading ? 'Carregando...' : 'Gerenciar Inscrição'}
              </Button>
            ) : (
              <Link href="/precos">
                <Button variant="outline" className='animate-pulse' size="sm">Ver Planos</Button>
              </Link>
            )}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <Link href="/precos">
              <Button variant="outline" className='animate-pulse' size="sm">Ver Planos</Button>
            </Link>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">Entrar</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
  function MobileSidebarLinks({
  pathname,
  closeSidebar,
}: {
  pathname: string;
  closeSidebar: () => void;
}) {
  return (
    <nav className="flex flex-col gap-2">
      {links.map(({ name, href, icon: Icon, isAdmin }) => (
        <Link key={href} href={href} onClick={closeSidebar} hidden={isAdmin ? isAdmin != isAdminUser ! : false}>
          <Button
            variant={pathname === href ? 'secondary' : 'ghost'}
            className="justify-start w-full font-normal"
          >
            <Icon className="w-4 h-4 mr-2" />
            {name}
          </Button>
        </Link>
      ))}
    </nav>
  );
}

}
