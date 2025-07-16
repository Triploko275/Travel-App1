
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  Briefcase,
  Settings,
  LogOut,
  Building,
  UserCheck,
  PanelLeft,
  Bell
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const SuperAdminSidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const navItems = [
    { href: "/superadmin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/superadmin/agents", icon: UserCheck, label: "Agents" },
    { href: "/superadmin/packages", icon: Package, label: "Packages" },
    { href: "/superadmin/bookings", icon: Briefcase, label: "Bookings" },
    { href: "/superadmin/customers", icon: Users, label: "Customers" },
    { href: "/superadmin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className={cn("flex flex-col h-full bg-background border-r", className)}>
      <div className="flex items-center justify-center border-b h-16 shrink-0 px-4">
        <Link href="/superadmin/dashboard" className="flex items-center gap-2 font-semibold">
          <Building className="h-6 w-6 text-primary" />
          <span>Super Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <ul className="space-y-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.label}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-auto border-t p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person face" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@roam.com</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/superadmin">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log Out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <SuperAdminSidebar />
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[280px]">
              <SuperAdminSidebar />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
          <Button variant="ghost" size="icon">
             <Bell className="h-5 w-5" />
             <span className="sr-only">Notifications</span>
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
