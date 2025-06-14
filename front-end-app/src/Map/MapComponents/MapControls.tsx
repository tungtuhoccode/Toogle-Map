// src/components/MapControls.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function MapControls({
  sidebarOpen,
  toggleSidebar,
}: {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <div className="absolute top-4 left-4 z-20 flex space-x-2">
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      {/* add more buttons / nav here */}
    </div>
  );
}
