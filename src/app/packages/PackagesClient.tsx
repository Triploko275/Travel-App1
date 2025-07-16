"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Heart, UserRound, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PackageCard } from "@/components/package-card";
import { FilterSheet } from "@/components/filter-sheet";
import { packages as allPackages, destinations } from "@/lib/data";
import { useWishlist } from "@/components/context/wishlist-context";

type Package = (typeof allPackages)[0];

const PackagesHeader = () => (
  <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="mx-auto flex max-w-2xl items-center justify-between p-4">
      <Link href="/" passHref>
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
      </Link>
      <h1 className="text-xl font-bold text-foreground font-headline">
        All Packages
      </h1>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Wishlist</span>
        </Button>
        <Button variant="ghost" size="icon">
          <UserRound className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </div>
  </header>
);

export default function PackagesClient() {
  const searchParams = useSearchParams();
  const [packageList, setPackageList] = React.useState<Package[]>(allPackages);
  const [searchQuery, setSearchQuery] = React.useState(
    searchParams.get("search") || "",
  );
  const [filters, setFilters] = React.useState({
    destination: "All",
    budget: 100000,
    duration: "any",
    rating: 1,
  });

  const applyFilters = React.useCallback(
    (newFilters?: any, searchTerm?: string) => {
      if (newFilters) {
        setFilters(newFilters);
      }

      const currentFilters = newFilters || filters;
      const currentSearch = searchTerm !== undefined ? searchTerm : searchQuery;

      let filtered = allPackages;

      // Apply search filter first
      if (currentSearch && currentSearch.trim()) {
        const normalizedQuery = currentSearch.toLowerCase().trim();
        filtered = filtered.filter((pkg) => {
          return (
            pkg.title.toLowerCase().includes(normalizedQuery) ||
            pkg.destination.toLowerCase().includes(normalizedQuery) ||
            pkg.duration.toLowerCase().includes(normalizedQuery)
          );
        });
      }

      // Apply destination filter
      if (currentFilters.destination !== "All") {
        filtered = filtered.filter(
          (p) => p.destination === currentFilters.destination,
        );
      }

      // Apply budget filter
      filtered = filtered.filter(
        (p) => parseInt(p.price.replace(/,/g, "")) <= currentFilters.budget,
      );

      // Apply duration filter
      if (currentFilters.duration !== "any") {
        const durationValue = currentFilters.duration;
        if (durationValue === "7+") {
          filtered = filtered.filter((p) => parseInt(p.duration) >= 7);
        } else {
          const [min, max] = durationValue.split("-").map(Number);
          filtered = filtered.filter((p) => {
            const duration = parseInt(p.duration);
            return duration >= min && duration <= max;
          });
        }
      }

      // Apply rating filter
      filtered = filtered.filter((p) => p.rating >= currentFilters.rating);

      setPackageList(filtered);
    },
    [filters, searchQuery],
  );

  // Handle initial search from URL parameters
  React.useEffect(() => {
    const initialSearch = searchParams.get("search");
    if (initialSearch) {
      setSearchQuery(initialSearch);
      applyFilters(undefined, initialSearch);
    } else {
      applyFilters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    applyFilters(undefined, value);
  };

  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-2xl">
        <div className="flex min-h-screen w-full flex-col">
          <PackagesHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-4">
              <div className="relative mb-4">
                <Input
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search packages, destinations..."
                  className="pl-10 h-10 text-base rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold font-headline">
                  {packageList.length} Packages Found
                </h2>
                <FilterSheet onApplyFilters={applyFilters} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {packageList.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 