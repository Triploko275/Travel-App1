"use client";

import * as React from "react";
import { Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { destinations } from "@/lib/data";

export const FilterSheet = ({
  onApplyFilters,
}: {
  onApplyFilters?: (filters: any) => void;
}) => {
  const [destination, setDestination] = React.useState("All");
  const [budget, setBudget] = React.useState([100000]);
  const [duration, setDuration] = React.useState("any");
  const [rating, setRating] = React.useState(1);

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({
        destination,
        budget: budget[0],
        duration,
        rating,
      });
    }
  };

  const handleClear = () => {
    setDestination("All");
    setBudget([100000]);
    setDuration("any");
    setRating(1);
    if (onApplyFilters) {
      onApplyFilters({
        destination: "All",
        budget: 100000,
        duration: "any",
        rating: 1,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 shrink-0">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl max-h-[80vh] overflow-y-auto"
      >
        <SheetHeader className="text-left">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Refine your search for the perfect getaway.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid gap-3">
            <Label htmlFor="destination">Destination</Label>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger id="destination">
                <SelectValue placeholder="Select a destination" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((dest) => (
                  <SelectItem key={dest.name} value={dest.name}>
                    {dest.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="budget">
              Budget (per person) - ₹{budget[0].toLocaleString()}
            </Label>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹10k</span>
              <span>₹1L+</span>
            </div>
            <Slider
              value={budget}
              onValueChange={setBudget}
              max={100000}
              min={10000}
              step={1000}
            />
          </div>
          <div className="grid gap-3">
            <Label>Duration</Label>
            <RadioGroup
              value={duration}
              onValueChange={setDuration}
              className="flex flex-wrap gap-2"
            >
              {["any", "1-3", "4-6", "7+"].map((d) => (
                <div key={d} className="flex items-center">
                  <RadioGroupItem value={d} id={`d-${d}`} className="sr-only" />
                  <Label
                    htmlFor={`d-${d}`}
                    className="border rounded-full px-4 py-2 cursor-pointer has-[[data-state=checked]]:bg-primary has-[[data-state=checked]]:text-primary-foreground has-[[data-state=checked]]:border-primary capitalize"
                  >
                    {d === "any" ? "Any" : d === "7+" ? "7+ Days" : `${d} Days`}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="grid gap-3">
            <Label>Rating</Label>
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`h-8 w-8 cursor-pointer ${i < rating ? "text-accent fill-current" : "text-muted"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="ghost" onClick={handleClear}>
            Clear
          </Button>
          <SheetClose asChild>
            <Button type="submit" className="flex-1" onClick={handleApply}>
              Apply Filters
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
