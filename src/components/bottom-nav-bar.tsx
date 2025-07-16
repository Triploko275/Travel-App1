"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home as HomeIcon, Briefcase, Heart, Gem } from "lucide-react";

export const BottomNavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/my-trips", icon: Briefcase, label: "My Trips" },
    { href: "/shortlist", icon: Heart, label: "Shortlist" },
    { href: "/honeymoon", icon: Gem, label: "Honeymoon" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full bg-background/80 backdrop-blur-sm border-t md:hidden">
      <div className="mx-auto max-w-2xl">
        <div className="flex justify-around items-center p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link href={item.href} key={item.label} passHref>
                <div
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 w-20 h-16 rounded-lg transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
