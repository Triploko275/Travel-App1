"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageCard } from "@/components/package-card";
import { useWishlist } from "@/components/context/wishlist-context";
import { useAuth } from "@/components/auth/auth-context";
import { LoginDialog } from "@/components/auth/login-dialog";

const ShortlistHeader = () => (
  <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
      <Link href="/" passHref>
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
      </Link>
      <h1 className="text-xl font-bold text-foreground font-headline">
        My Shortlist
      </h1>
      <div className="w-10"></div>
    </div>
  </header>
);

export default function ShortlistPage() {
  const { user } = useAuth();
  const { getWishlistPackages, clearWishlist, wishlistItems } = useWishlist();
  const wishlistPackages = getWishlistPackages();

  if (!user) {
    return (
      <div className="bg-background text-foreground">
        <div className="mx-auto max-w-2xl">
          <div className="flex min-h-screen w-full flex-col">
            <ShortlistHeader />
            <main className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  Sign in to view your shortlist
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Save your favorite travel packages and access them anytime by
                  signing in to your account.
                </p>
                <LoginDialog />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistPackages.length === 0) {
    return (
      <div className="bg-background text-foreground">
        <div className="mx-auto max-w-2xl">
          <div className="flex min-h-screen w-full flex-col">
            <ShortlistHeader />
            <main className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  Your shortlist is empty
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Start exploring our amazing travel packages and save the ones
                  you love for later.
                </p>
                <Link href="/packages">
                  <Button>Explore Packages</Button>
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-2xl">
        <div className="flex min-h-screen w-full flex-col">
          <ShortlistHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold font-headline">
                {wishlistPackages.length} Package
                {wishlistPackages.length !== 1 ? "s" : ""} Saved
              </h2>
              {wishlistPackages.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearWishlist}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {wishlistPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>

            <div className="mt-8 p-6 bg-muted rounded-lg text-center">
              <h3 className="text-lg font-bold mb-2">Ready to book?</h3>
              <p className="text-muted-foreground mb-4">
                Compare your shortlisted packages and start planning your
                adventure.
              </p>
              <Link href="/packages">
                <Button variant="outline">Explore More Packages</Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
