// src/components/SearchBar.tsx
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpRight } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative top-4 left-4 w-80 flex items-center bg-white rounded-full shadow-md px-3 py-1">
      <Search size={18} className="text-gray-500" />
      <Input
        placeholder="Search a place"
        className="border-none focus:ring-0 focus:outline-none px-2"
      />
      <Button
        variant="ghost"
        size="icon"
        className="bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <ArrowUpRight size={16} />
      </Button>
    </div>
  );
}
