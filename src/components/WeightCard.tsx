import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const WeightCard = () => {
  const [lbWhole, setLbWhole] = useState<string>("");
  const [oz, setOz] = useState<string>("");
  const [lbDecimal, setLbDecimal] = useState<string>("");
  const [kg, setKg] = useState<string>("");

  // Conversion lb (whole) + oz -> lb (decimal) and kg
  const updateFromLbOz = (lbWholeVal: number, ozVal: number) => {
    const lbDecimalValue = lbWholeVal + (ozVal / 16);
    const kgValue = lbDecimalValue / 2.20462;
    setLbDecimal(lbDecimalValue.toFixed(5));
    setKg(kgValue.toFixed(5));
  };

  // Conversion lb (decimal) -> lb (whole) + oz and kg
  const updateFromLbDecimal = (lbDecimalVal: number) => {
    const lbWholeValue = Math.floor(lbDecimalVal);
    const ozValue = (lbDecimalVal - lbWholeValue) * 16;
    const kgValue = lbDecimalVal / 2.20462;
    setLbWhole(lbWholeValue.toString());
    setOz(ozValue.toFixed(5));
    setKg(kgValue.toFixed(5));
  };

  // Conversion kg -> lb (whole), oz, lb (decimal)
  const updateFromKg = (kgVal: number) => {
    const lbDecimalValue = kgVal * 2.20462;
    const lbWholeValue = Math.floor(lbDecimalValue);
    const ozValue = (lbDecimalValue - lbWholeValue) * 16;
    setLbWhole(lbWholeValue.toString());
    setOz(ozValue.toFixed(5));
    setLbDecimal(lbDecimalValue.toFixed(5));
  };

  const handleLbWholeChange = (value: string) => {
    setLbWhole(value);
    const lbWholeNum = parseFloat(value) || 0;
    const ozNum = parseFloat(oz) || 0;
    updateFromLbOz(lbWholeNum, ozNum);
  };

  const handleOzChange = (value: string) => {
    setOz(value);
    const lbWholeNum = parseFloat(lbWhole) || 0;
    const ozNum = parseFloat(value) || 0;
    updateFromLbOz(lbWholeNum, ozNum);
  };

  const handleLbDecimalChange = (value: string) => {
    setLbDecimal(value);
    const lbDecimalNum = parseFloat(value) || 0;
    updateFromLbDecimal(lbDecimalNum);
  };

  const handleKgChange = (value: string) => {
    setKg(value);
    const kgNum = parseFloat(value) || 0;
    updateFromKg(kgNum);
  };

  return (
    <Card className="w-full max-w-md p-4 space-y-2 shadow-lg">
      <div className="space-y-2">
        {/* Pounds + Ounces Section - Same Line */}
        <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
          <Label className="text-base font-semibold text-secondary-foreground">
            Pounds + Ounces
          </Label>
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <Label htmlFor="lbWhole" className="text-xs text-muted-foreground">
                Pounds
              </Label>
              <Input
                id="lbWhole"
                type="number"
                value={lbWhole}
                onChange={(e) => handleLbWholeChange(e.target.value)}
                placeholder="0"
                className="text-xl h-12 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
                min="0"
                step="any"
                autoFocus
                inputMode="numeric"
              />
            </div>
            <div className="flex items-end justify-center pb-2">
              <span className="text-xl font-bold text-muted-foreground">+</span>
            </div>
            <div className="flex-1 space-y-1">
              <Label htmlFor="oz" className="text-xs text-muted-foreground">
                Ounces
              </Label>
              <Input
                id="oz"
                type="number"
                value={oz}
                onChange={(e) => handleOzChange(e.target.value)}
                placeholder="0"
                className="text-xl h-12 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
                min="0"
                step="any"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>

        {/* Pounds Decimal Section */}
        <div className="space-y-2 p-3 bg-accent/20 rounded-xl">
          <Label htmlFor="lbDecimal" className="text-base font-semibold text-secondary-foreground">
            Pounds (decimal)
          </Label>
          <Input
            id="lbDecimal"
            type="number"
            value={lbDecimal}
            onChange={(e) => handleLbDecimalChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-accent transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        {/* Kilogrammes Section */}
        <div className="space-y-2 p-3 bg-primary/10 rounded-xl">
          <Label htmlFor="kg" className="text-base font-semibold text-secondary-foreground">
            Kilograms (kg)
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
            setLbWhole("");
            setOz("");
            setLbDecimal("");
            setKg("");
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
