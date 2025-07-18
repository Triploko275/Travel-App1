"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/auth-context";
import { useWishlist } from "@/components/context/wishlist-context";
import { useToast } from "@/hooks/use-toast";
import { packages as allPackages, agents } from "@/lib/data";

type Package = (typeof allPackages)[0];

export const PackageCard = ({ pkg }: { pkg: Package }) => {
  const agent = agents.find((a) => a.id === pkg.agentId);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleWishlistToggle = () => {
    const wasWishlisted = isInWishlist(pkg.id);
    const success = toggleWishlist(pkg.id);
    if (!success) {
      toast({
        title: "Create account to save packages",
        description:
          "Sign up or log in to save packages to your wishlist and access them anytime.",
        variant: "default",
      });
    } else {
      toast({
        title: wasWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
        description: `"${pkg.title}" has been ${wasWishlisted ? "removed from" : "added to"} your wishlist.`,
      });
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg transition-transform duration-300 hover:scale-105 flex flex-col">
      <CardContent className="p-0 flex flex-col flex-grow">
        <div className="relative">
          <Link href={`/packages/${pkg.slug}`} passHref>
            <Image
              src={pkg.image}
              alt={pkg.title}
              width={600}
              height={400}
              className="h-48 w-full object-cover"
              data-ai-hint={pkg.hint}
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-background/90 hover:bg-background shadow-lg border border-primary/30"
            onClick={handleWishlistToggle}
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
          >
            <Heart
              className={`h-6 w-6 transition-colors duration-200 ${
                isInWishlist(pkg.id)
                  ? "text-primary fill-current drop-shadow"
                  : "text-foreground"
              }`}
            />
          </Button>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <Link href={`/packages/${pkg.slug}`} passHref>
            <h3 className="font-headline text-lg font-bold truncate hover:underline">
              {pkg.title}
            </h3>
          </Link>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{pkg.destination}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{pkg.duration}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-accent fill-current" />
              <span className="font-bold">{pkg.rating}</span>
            </div>
            <div className="text-lg font-bold text-foreground">
              <span className="text-sm font-normal">From ₹</span>
              {pkg.price}
            </div>
          </div>

          {/* Quick actions for guest users */}
          {!user && (
            <div className="mt-3 flex gap-2">
              <Link href={`/packages/${pkg.slug}`} className="flex-1">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  View Details
                </Button>
              </Link>
              <Button
                size="sm"
                className="flex-1 text-xs"
                onClick={() => {
                  toast({
                    title: "Sign up to book instantly",
                    description:
                      "Create an account to add packages to cart and complete secure booking.",
                    variant: "default",
                  });
                }}
              >
                Quick Book
              </Button>
            </div>
          )}

          <div className="border-t my-4"></div>
          <div className="flex items-center gap-3 mt-auto">
            {agent && (
              <Link href={`/agents/${agent.id}`} passHref>
                <Avatar className="w-10 h-10 border-2 border-primary">
                  <AvatarImage src={agent.logo} data-ai-hint={agent.hint} />
                  <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Link>
            )}
            {agent && (
              <div>
                <Link href={`/agents/${agent.id}`} passHref>
                  <p className="font-semibold text-sm hover:underline">
                    {agent.name}
                  </p>
                </Link>
                <p className="text-xs text-muted-foreground">Tour Operator</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
