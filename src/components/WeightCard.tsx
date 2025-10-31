import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const WeightCard = () => {
  const [kg, setKg] = useState<string>("");
  const [lb, setLb] = useState<string>("");
  const [oz, setOz] = useState<string>("");

  // Conversion kg -> lb and oz
  const updateFromKg = (kgVal: number) => {
    const lbValue = kgVal * 2.20462;
    const ozValue = kgVal * 35.274;
    setLb(lbValue.toFixed(5));
    setOz(ozValue.toFixed(5));
  };

  // Conversion lb -> kg and oz
  const updateFromLb = (lbVal: number) => {
    const kgValue = lbVal / 2.20462;
    const ozValue = lbVal * 16;
    setKg(kgValue.toFixed(5));
    setOz(ozValue.toFixed(5));
  };

  // Conversion oz -> kg and lb
  const updateFromOz = (ozVal: number) => {
    const kgValue = ozVal / 35.274;
    const lbValue = ozVal / 16;
    setKg(kgValue.toFixed(5));
    setLb(lbValue.toFixed(5));
  };

  const handleKgChange = (value: string) => {
    setKg(value);
    const kgNum = parseFloat(value) || 0;
    updateFromKg(kgNum);
  };

  const handleLbChange = (value: string) => {
    setLb(value);
    const lbNum = parseFloat(value) || 0;
    updateFromLb(lbNum);
  };

  const handleOzChange = (value: string) => {
    setOz(value);
    const ozNum = parseFloat(value) || 0;
    updateFromOz(ozNum);
  };

  return (
    <Card className="w-full max-w-md p-4 space-y-2 shadow-lg">
      <div className="space-y-2">
        {/* Kilogrammes Section */}
        <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
          <Label htmlFor="kg" className="text-base font-semibold text-secondary-foreground">
            Kilogrammes (kg)
          </Label>
          <Input
            id="kg"
            type="number"
            value={kg}
            onChange={(e) => handleKgChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            min="0"
            step="any"
            autoFocus
            inputMode="numeric"
          />
        </div>

        {/* Livres Section */}
        <div className="space-y-2 p-3 bg-accent/20 rounded-xl">
          <Label htmlFor="lb" className="text-base font-semibold text-secondary-foreground">
            Livres (lb)
          </Label>
          <Input
            id="lb"
            type="number"
            value={lb}
            onChange={(e) => handleLbChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-accent transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        {/* Onces Section */}
        <div className="space-y-2 p-3 bg-primary/10 rounded-xl">
          <Label htmlFor="oz" className="text-base font-semibold text-secondary-foreground">
            Onces (oz)
          </Label>
          <Input
            id="oz"
            type="number"
            value={oz}
            onChange={(e) => handleOzChange(e.target.value)}
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
          <p>1 kg = 2.20 lb • 1 lb = 16 oz</p>
        </div>
        
        <Button 
          onClick={() => {
            setKg("");
            setLb("");
            setOz("");
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

export default WeightCard;
