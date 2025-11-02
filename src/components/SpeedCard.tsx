import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import UnitSelector from "./UnitSelector";
import { speedUnits } from "@/lib/unitDefinitions";
import { convertSpeed } from "@/lib/unitConversions";

const SpeedCard = () => {
  const [unit1, setUnit1] = useState<string>(() => localStorage.getItem("speedUnit1") || "km/h");
  const [value1, setValue1] = useState<string>("");
  const [unit2, setUnit2] = useState<string>(() => localStorage.getItem("speedUnit2") || "mi/h");
  const [value2, setValue2] = useState<string>("");
  const [unit3, setUnit3] = useState<string>(() => localStorage.getItem("speedUnit3") || "km/s");
  const [value3, setValue3] = useState<string>("");
  const [unit4, setUnit4] = useState<string>(() => localStorage.getItem("speedUnit4") || "kts");
  const [value4, setValue4] = useState<string>("");

  useEffect(() => localStorage.setItem("speedUnit1", unit1), [unit1]);
  useEffect(() => localStorage.setItem("speedUnit2", unit2), [unit2]);
  useEffect(() => localStorage.setItem("speedUnit3", unit3), [unit3]);
  useEffect(() => localStorage.setItem("speedUnit4", unit4), [unit4]);

  const updateAll = (val: number, fromUnit: string) => {
    if (fromUnit !== unit1) setValue1(convertSpeed(val, fromUnit, unit1).toFixed(5));
    if (fromUnit !== unit2) setValue2(convertSpeed(val, fromUnit, unit2).toFixed(5));
    if (fromUnit !== unit3) setValue3(convertSpeed(val, fromUnit, unit3).toFixed(5));
    if (fromUnit !== unit4) setValue4(convertSpeed(val, fromUnit, unit4).toFixed(5));
  };

  const handleValue1Change = (value: string) => {
    setValue1(value);
    updateAll(parseFloat(value) || 0, unit1);
  };

  const handleValue2Change = (value: string) => {
    setValue2(value);
    updateAll(parseFloat(value) || 0, unit2);
  };

  const handleValue3Change = (value: string) => {
    setValue3(value);
    updateAll(parseFloat(value) || 0, unit3);
  };

  const handleValue4Change = (value: string) => {
    setValue4(value);
    updateAll(parseFloat(value) || 0, unit4);
  };

  const handleUnit1Change = (newUnit: string) => {
    const currentValue = parseFloat(value1) || 0;
    setUnit1(newUnit);
    setValue1(convertSpeed(currentValue, unit1, newUnit).toFixed(5));
  };

  const handleUnit2Change = (newUnit: string) => {
    const currentValue = parseFloat(value2) || 0;
    setUnit2(newUnit);
    setValue2(convertSpeed(currentValue, unit2, newUnit).toFixed(5));
  };

  const handleUnit3Change = (newUnit: string) => {
    const currentValue = parseFloat(value3) || 0;
    setUnit3(newUnit);
    setValue3(convertSpeed(currentValue, unit3, newUnit).toFixed(5));
  };

  const handleUnit4Change = (newUnit: string) => {
    const currentValue = parseFloat(value4) || 0;
    setUnit4(newUnit);
    setValue4(convertSpeed(currentValue, unit4, newUnit).toFixed(5));
  };

  const getUnitLabel = (unit: string) => speedUnits.find(u => u.value === unit)?.label.split("(")[1].replace(")", "") || unit;

  return (
    <Card className="w-full max-w-md p-4 space-y-2 shadow-lg">
      <div className="space-y-2">
        <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
          <UnitSelector
            label="Speed"
            currentUnit={getUnitLabel(unit1)}
            units={speedUnits}
            onUnitChange={handleUnit1Change}
          />
          <Input
            type="number"
            value={value1}
            onChange={(e) => handleValue1Change(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            min="0"
            step="any"
            autoFocus
            inputMode="numeric"
          />
        </div>

        <div className="space-y-2 p-3 bg-accent/20 rounded-xl">
          <UnitSelector
            label="Speed"
            currentUnit={getUnitLabel(unit2)}
            units={speedUnits}
            onUnitChange={handleUnit2Change}
          />
          <Input
            type="number"
            value={value2}
            onChange={(e) => handleValue2Change(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-accent transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        <div className="space-y-2 p-3 bg-primary/10 rounded-xl">
          <UnitSelector
            label="Speed"
            currentUnit={getUnitLabel(unit3)}
            units={speedUnits}
            onUnitChange={handleUnit3Change}
          />
          <Input
            type="number"
            value={value3}
            onChange={(e) => handleValue3Change(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        <div className="space-y-2 p-3 bg-muted/50 rounded-xl">
          <UnitSelector
            label="Speed"
            currentUnit={getUnitLabel(unit4)}
            units={speedUnits}
            onUnitChange={handleUnit4Change}
          />
          <Input
            type="number"
            value={value4}
            onChange={(e) => handleValue4Change(e.target.value)}
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
          <p>1 km/h = 0.28 m/s • 1 mph = 1.61 km/h</p>
        </div>
        
        <Button 
          onClick={() => {
            setValue1("");
            setValue2("");
            setValue3("");
            setValue4("");
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

export default SpeedCard;
