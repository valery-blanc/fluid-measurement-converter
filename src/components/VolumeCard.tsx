import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const VolumeCard = () => {
  const [liters, setLiters] = useState<string>("");
  const [deciliters, setDeciliters] = useState<string>("");
  const [usGallon, setUsGallon] = useState<string>("");
  const [usCup, setUsCup] = useState<string>("");
  const [usTablespoon, setUsTablespoon] = useState<string>("");
  const [usTeaspoon, setUsTeaspoon] = useState<string>("");

  // Conversion from liters to all other units
  const updateFromLiters = (litersVal: number) => {
    setDeciliters((litersVal * 10).toFixed(5));
    setUsGallon((litersVal / 3.785411784).toFixed(5));
    setUsCup((litersVal * 4.22675284).toFixed(5));
    setUsTablespoon((litersVal * 67.6280454).toFixed(5));
    setUsTeaspoon((litersVal * 202.884136).toFixed(5));
  };

  // Conversion from deciliters to all other units
  const updateFromDeciliters = (decilitersVal: number) => {
    const litersValue = decilitersVal * 0.1;
    setLiters(litersValue.toFixed(5));
    setUsGallon((litersValue / 3.785411784).toFixed(5));
    setUsCup((litersValue * 4.22675284).toFixed(5));
    setUsTablespoon((litersValue * 67.6280454).toFixed(5));
    setUsTeaspoon((litersValue * 202.884136).toFixed(5));
  };

  // Conversion from US gallon to all other units
  const updateFromUsGallon = (usGallonVal: number) => {
    const litersValue = usGallonVal * 3.785411784;
    setLiters(litersValue.toFixed(5));
    setDeciliters((litersValue * 10).toFixed(5));
    setUsCup((usGallonVal * 16).toFixed(5));
    setUsTablespoon((usGallonVal * 256).toFixed(5));
    setUsTeaspoon((usGallonVal * 768).toFixed(5));
  };

  // Conversion from US cup to all other units
  const updateFromUsCup = (usCupVal: number) => {
    const litersValue = usCupVal / 4.22675284;
    setLiters(litersValue.toFixed(5));
    setDeciliters((litersValue * 10).toFixed(5));
    setUsGallon((usCupVal / 16).toFixed(5));
    setUsTablespoon((usCupVal * 16).toFixed(5));
    setUsTeaspoon((usCupVal * 48).toFixed(5));
  };

  // Conversion from US tablespoon to all other units
  const updateFromUsTablespoon = (usTablespoonVal: number) => {
    const litersValue = usTablespoonVal / 67.6280454;
    setLiters(litersValue.toFixed(5));
    setDeciliters((litersValue * 10).toFixed(5));
    setUsGallon((usTablespoonVal / 256).toFixed(5));
    setUsCup((usTablespoonVal / 16).toFixed(5));
    setUsTeaspoon((usTablespoonVal * 3).toFixed(5));
  };

  // Conversion from US teaspoon to all other units
  const updateFromUsTeaspoon = (usTeaspoonVal: number) => {
    const litersValue = usTeaspoonVal / 202.884136;
    setLiters(litersValue.toFixed(5));
    setDeciliters((litersValue * 10).toFixed(5));
    setUsGallon((usTeaspoonVal / 768).toFixed(5));
    setUsCup((usTeaspoonVal / 48).toFixed(5));
    setUsTablespoon((usTeaspoonVal / 3).toFixed(5));
  };

  const handleLitersChange = (value: string) => {
    setLiters(value);
    const litersNum = parseFloat(value) || 0;
    updateFromLiters(litersNum);
  };

  const handleDecilitersChange = (value: string) => {
    setDeciliters(value);
    const decilitersNum = parseFloat(value) || 0;
    updateFromDeciliters(decilitersNum);
  };

  const handleUsGallonChange = (value: string) => {
    setUsGallon(value);
    const usGallonNum = parseFloat(value) || 0;
    updateFromUsGallon(usGallonNum);
  };

  const handleUsCupChange = (value: string) => {
    setUsCup(value);
    const usCupNum = parseFloat(value) || 0;
    updateFromUsCup(usCupNum);
  };

  const handleUsTablespoonChange = (value: string) => {
    setUsTablespoon(value);
    const usTablespoonNum = parseFloat(value) || 0;
    updateFromUsTablespoon(usTablespoonNum);
  };

  const handleUsTeaspoonChange = (value: string) => {
    setUsTeaspoon(value);
    const usTeaspoonNum = parseFloat(value) || 0;
    updateFromUsTeaspoon(usTeaspoonNum);
  };

  return (
    <Card className="w-full max-w-md p-4 space-y-2 shadow-lg">
      <div className="space-y-2">
        {/* Liters Section */}
        <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
          <Label htmlFor="liters" className="text-base font-semibold text-secondary-foreground">
            Liters (L)
          </Label>
          <Input
            id="liters"
            type="number"
            value={liters}
            onChange={(e) => handleLitersChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            min="0"
            step="any"
            autoFocus
            inputMode="numeric"
          />
        </div>

        {/* Deciliters Section */}
        <div className="space-y-2 p-3 bg-accent/20 rounded-xl">
          <Label htmlFor="deciliters" className="text-base font-semibold text-secondary-foreground">
            Deciliters (dL)
          </Label>
          <Input
            id="deciliters"
            type="number"
            value={deciliters}
            onChange={(e) => handleDecilitersChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-accent transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        {/* US Gallon Section */}
        <div className="space-y-2 p-3 bg-primary/10 rounded-xl">
          <Label htmlFor="usGallon" className="text-base font-semibold text-secondary-foreground">
            US Gallon (gal)
          </Label>
          <Input
            id="usGallon"
            type="number"
            value={usGallon}
            onChange={(e) => handleUsGallonChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        {/* US Cup Section */}
        <div className="space-y-2 p-3 bg-secondary/20 rounded-xl">
          <Label htmlFor="usCup" className="text-base font-semibold text-secondary-foreground">
            US Cup (cup)
          </Label>
          <Input
            id="usCup"
            type="number"
            value={usCup}
            onChange={(e) => handleUsCupChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-secondary transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        {/* US Tablespoon Section */}
        <div className="space-y-2 p-3 bg-accent/30 rounded-xl">
          <Label htmlFor="usTablespoon" className="text-base font-semibold text-secondary-foreground">
            US Tablespoon (tbsp)
          </Label>
          <Input
            id="usTablespoon"
            type="number"
            value={usTablespoon}
            onChange={(e) => handleUsTablespoonChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-accent transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        {/* US Teaspoon Section */}
        <div className="space-y-2 p-3 bg-primary/15 rounded-xl">
          <Label htmlFor="usTeaspoon" className="text-base font-semibold text-secondary-foreground">
            US Teaspoon (tsp)
          </Label>
          <Input
            id="usTeaspoon"
            type="number"
            value={usTeaspoon}
            onChange={(e) => handleUsTeaspoonChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center text-sm text-muted-foreground">
          <p>1 L = 10 dL = 4.23 cups • 1 gal = 3.79 L</p>
        </div>
        
        <Button 
          onClick={() => {
            setLiters("");
            setDeciliters("");
            setUsGallon("");
            setUsCup("");
            setUsTablespoon("");
            setUsTeaspoon("");
          }}
          variant="outline"
          className="w-full"
        >
          Clear
        </Button>
      </div>
    </Card>
  );
};

export default VolumeCard;
