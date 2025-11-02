import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import UnitSelector from "./UnitSelector";
import { volumeUnits } from "@/lib/unitDefinitions";
import { convertVolume } from "@/lib/unitConversions";

const VolumeCard = () => {
  const [unit1, setUnit1] = useState<string>(() => localStorage.getItem("volumeUnit1") || "L");
  const [value1, setValue1] = useState<string>("");
  const [unit2, setUnit2] = useState<string>(() => localStorage.getItem("volumeUnit2") || "dL");
  const [value2, setValue2] = useState<string>("");
  const [unit3, setUnit3] = useState<string>(() => localStorage.getItem("volumeUnit3") || "gal-us");
  const [value3, setValue3] = useState<string>("");
  const [unit4, setUnit4] = useState<string>(() => localStorage.getItem("volumeUnit4") || "cup-us");
  const [value4, setValue4] = useState<string>("");
  const [unit5, setUnit5] = useState<string>(() => localStorage.getItem("volumeUnit5") || "tbsp-us");
  const [value5, setValue5] = useState<string>("");
  const [unit6, setUnit6] = useState<string>(() => localStorage.getItem("volumeUnit6") || "tsp-us");
  const [value6, setValue6] = useState<string>("");

  useEffect(() => localStorage.setItem("volumeUnit1", unit1), [unit1]);
  useEffect(() => localStorage.setItem("volumeUnit2", unit2), [unit2]);
  useEffect(() => localStorage.setItem("volumeUnit3", unit3), [unit3]);
  useEffect(() => localStorage.setItem("volumeUnit4", unit4), [unit4]);
  useEffect(() => localStorage.setItem("volumeUnit5", unit5), [unit5]);
  useEffect(() => localStorage.setItem("volumeUnit6", unit6), [unit6]);

  const updateAll = (val: number, fromUnit: string) => {
    if (fromUnit !== unit1) setValue1(convertVolume(val, fromUnit, unit1).toFixed(5));
    if (fromUnit !== unit2) setValue2(convertVolume(val, fromUnit, unit2).toFixed(5));
    if (fromUnit !== unit3) setValue3(convertVolume(val, fromUnit, unit3).toFixed(5));
    if (fromUnit !== unit4) setValue4(convertVolume(val, fromUnit, unit4).toFixed(5));
    if (fromUnit !== unit5) setValue5(convertVolume(val, fromUnit, unit5).toFixed(5));
    if (fromUnit !== unit6) setValue6(convertVolume(val, fromUnit, unit6).toFixed(5));
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

  const handleValue5Change = (value: string) => {
    setValue5(value);
    updateAll(parseFloat(value) || 0, unit5);
  };

  const handleValue6Change = (value: string) => {
    setValue6(value);
    updateAll(parseFloat(value) || 0, unit6);
  };

  const handleUnitChange = (setter: (unit: string) => void, currentValue: string, currentUnit: string) => (newUnit: string) => {
    const val = parseFloat(currentValue) || 0;
    setter(newUnit);
    const converted = convertVolume(val, currentUnit, newUnit);
    if (setter === setUnit1) setValue1(converted.toFixed(5));
    else if (setter === setUnit2) setValue2(converted.toFixed(5));
    else if (setter === setUnit3) setValue3(converted.toFixed(5));
    else if (setter === setUnit4) setValue4(converted.toFixed(5));
    else if (setter === setUnit5) setValue5(converted.toFixed(5));
    else if (setter === setUnit6) setValue6(converted.toFixed(5));
  };

  const getUnitLabel = (unit: string) => volumeUnits.find(u => u.value === unit)?.label.split("(")[1].replace(")", "") || unit;

  return (
    <Card className="w-full max-w-md p-4 space-y-2 shadow-lg">
      <div className="space-y-2">
        <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
          <UnitSelector
            label="Volume"
            currentUnit={getUnitLabel(unit1)}
            units={volumeUnits}
            onUnitChange={handleUnitChange(setUnit1, value1, unit1)}
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
            label="Volume"
            currentUnit={getUnitLabel(unit2)}
            units={volumeUnits}
            onUnitChange={handleUnitChange(setUnit2, value2, unit2)}
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
            label="Volume"
            currentUnit={getUnitLabel(unit3)}
            units={volumeUnits}
            onUnitChange={handleUnitChange(setUnit3, value3, unit3)}
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

        <div className="space-y-2 p-3 bg-secondary/20 rounded-xl">
          <UnitSelector
            label="Volume"
            currentUnit={getUnitLabel(unit4)}
            units={volumeUnits}
            onUnitChange={handleUnitChange(setUnit4, value4, unit4)}
          />
          <Input
            type="number"
            value={value4}
            onChange={(e) => handleValue4Change(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-secondary transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        <div className="space-y-2 p-3 bg-accent/30 rounded-xl">
          <UnitSelector
            label="Volume"
            currentUnit={getUnitLabel(unit5)}
            units={volumeUnits}
            onUnitChange={handleUnitChange(setUnit5, value5, unit5)}
          />
          <Input
            type="number"
            value={value5}
            onChange={(e) => handleValue5Change(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-accent transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        <div className="space-y-2 p-3 bg-primary/15 rounded-xl">
          <UnitSelector
            label="Volume"
            currentUnit={getUnitLabel(unit6)}
            units={volumeUnits}
            onUnitChange={handleUnitChange(setUnit6, value6, unit6)}
          />
          <Input
            type="number"
            value={value6}
            onChange={(e) => handleValue6Change(e.target.value)}
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
            setValue1("");
            setValue2("");
            setValue3("");
            setValue4("");
            setValue5("");
            setValue6("");
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
