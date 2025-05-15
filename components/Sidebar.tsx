'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/context/SidebarContext';
import { links } from '@/lib/links';
import { useUser } from '@clerk/nextjs';

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggleCollapsed } = useSidebar(); // get from context

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          'hidden sm:flex flex-col border-r bg-muted/40 transition-all h-screen fixed top-0 left-0 z-40',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-4 px-2">
          <Link href="/">
            <Image
              src={collapsed? "/logo_simple.png": "/logo.png"}
              alt="Elevio"
              width={collapsed ? 32 : 120}
              height={40}
              className="transition-all"
              priority
            />
          </Link>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto px-2">
          <SidebarLinks pathname={pathname} collapsed={collapsed} />
        </div>

        {/* Collapse Button */}
        <div className="p-2 border-t">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="w-full"
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
      </div>
    </>
  );
}
function SidebarLinks({
  pathname,
  collapsed,
}: {
  pathname: string;
  collapsed: boolean;
}) {
  
  const { user } = useUser();
  const isAdminUser = user?.emailAddresses[0]?.emailAddress === "mateuspalacio@gmail.com";
  return (
    <nav className="flex flex-col gap-2">
      {links.map(({ name, href, icon: Icon, isAdmin }) => (
        <Link key={href} href={href} hidden={isAdmin ? isAdmin != isAdminUser ! : false}>
          <Button
            variant={pathname === href ? 'default' : 'ghost'}
            className={cn(
              'justify-start w-full font-normal transition-all transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100',
              collapsed ? 'px-2' : 'px-3',
              pathname === href && 'bg-muted'
            )}
          >
            <Icon className="w-4 h-4 mr-2" />
            {!collapsed && name}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
