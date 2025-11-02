import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface UnitSelectorProps {
  label: string;
  currentUnit: string;
  units: { value: string; label: string }[];
  onUnitChange: (unit: string) => void;
}

const UnitSelector = ({ label, currentUnit, units, onUnitChange }: UnitSelectorProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-base font-semibold text-secondary-foreground">{label}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 px-2 gap-1">
            <span className="text-sm">{currentUnit}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card">
          {units.map((unit) => (
            <DropdownMenuItem
              key={unit.value}
              onClick={() => onUnitChange(unit.value)}
              className={currentUnit === unit.value ? "bg-accent" : ""}
            >
              {unit.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UnitSelector;
