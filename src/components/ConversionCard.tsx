import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import UnitSelector from "./UnitSelector";
import { lengthUnits } from "@/lib/unitDefinitions";
import { convertLength } from "@/lib/unitConversions";

const ConversionCard = () => {
  const [feet, setFeet] = useState<string>("");
  const [inches, setInches] = useState<string>("");
  const [unit1, setUnit1] = useState<string>(() => localStorage.getItem("lengthUnit1") || "cm");
  const [value1, setValue1] = useState<string>("");
  const [unit2, setUnit2] = useState<string>(() => localStorage.getItem("lengthUnit2") || "yd");
  const [value2, setValue2] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("lengthUnit1", unit1);
  }, [unit1]);

  useEffect(() => {
    localStorage.setItem("lengthUnit2", unit2);
  }, [unit2]);

  const updateFromFeetInches = (feetVal: number, inchesVal: number) => {
    const totalInches = feetVal * 12 + inchesVal;
    const val1 = convertLength(totalInches, "in", unit1);
    const val2 = convertLength(totalInches, "in", unit2);
    setValue1(val1.toFixed(5));
    setValue2(val2.toFixed(5));
  };

  const updateFromValue1 = (val: number) => {
    const totalInches = convertLength(val, unit1, "in");
    const feetValue = Math.floor(totalInches / 12);
    const inchesValue = totalInches % 12;
    setFeet(feetValue.toString());
    setInches(inchesValue.toFixed(5));
    // Always convert, even if units are the same
    const inInches = convertLength(val, unit1, "in");
    const val2 = convertLength(inInches, "in", unit2);
    setValue2(val2.toFixed(5));
  };

  const updateFromValue2 = (val: number) => {
    const totalInches = convertLength(val, unit2, "in");
    const feetValue = Math.floor(totalInches / 12);
    const inchesValue = totalInches % 12;
    setFeet(feetValue.toString());
    setInches(inchesValue.toFixed(5));
    // Always convert, even if units are the same
    const inInches = convertLength(val, unit2, "in");
    const val1 = convertLength(inInches, "in", unit1);
    setValue1(val1.toFixed(5));
  };

  const handleFeetChange = (value: string) => {
    setFeet(value);
    const feetNum = parseFloat(value) || 0;
    const inchesNum = parseFloat(inches) || 0;
    updateFromFeetInches(feetNum, inchesNum);
  };

  const handleInchesChange = (value: string) => {
    setInches(value);
    const feetNum = parseFloat(feet) || 0;
    const inchesNum = parseFloat(value) || 0;
    updateFromFeetInches(feetNum, inchesNum);
  };

  const handleValue1Change = (value: string) => {
    setValue1(value);
    const val = parseFloat(value) || 0;
    updateFromValue1(val);
  };

  const handleValue2Change = (value: string) => {
    setValue2(value);
    const val = parseFloat(value) || 0;
    updateFromValue2(val);
  };

  const handleUnit1Change = (newUnit: string) => {
    const currentValue = parseFloat(value1) || 0;
    const inInches = convertLength(currentValue, unit1, "in");
    setUnit1(newUnit);
    const newValue = convertLength(inInches, "in", newUnit);
    setValue1(newValue.toFixed(5));
  };

  const handleUnit2Change = (newUnit: string) => {
    const currentValue = parseFloat(value2) || 0;
    const inInches = convertLength(currentValue, unit2, "in");
    setUnit2(newUnit);
    const newValue = convertLength(inInches, "in", newUnit);
    setValue2(newValue.toFixed(5));
  };

  const currentUnit1Label = lengthUnits.find(u => u.value === unit1)?.label.split("(")[1].replace(")", "") || unit1;
  const currentUnit2Label = lengthUnits.find(u => u.value === unit2)?.label.split("(")[1].replace(")", "") || unit2;
  const getFullUnitLabel = (unit: string) => lengthUnits.find(u => u.value === unit)?.label || unit;

  return (
    <Card className="w-full max-w-md p-4 space-y-2 shadow-lg">
      <div className="space-y-2">
        {/* Feet + Inches Section */}
        <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
          <Label className="text-base font-semibold text-secondary-foreground">
            Feet + Inches
          </Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="feet" className="text-sm text-muted-foreground">Feet (ft)</Label>
              <Input
                id="feet"
                type="number"
                value={feet}
                onChange={(e) => handleFeetChange(e.target.value)}
                placeholder="0"
                className="text-xl h-12 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
                min="0"
                step="1"
                autoFocus
                inputMode="numeric"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="inches" className="text-sm text-muted-foreground">Inches (in)</Label>
              <Input
                id="inches"
                type="number"
                value={inches}
                onChange={(e) => handleInchesChange(e.target.value)}
                placeholder="0"
                className="text-xl h-12 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
                min="0"
                step="any"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>

        {/* Unit 1 Section */}
        <div className="space-y-2 p-3 bg-accent/20 rounded-xl">
          <UnitSelector
            label={getFullUnitLabel(unit1)}
            currentUnit={currentUnit1Label}
            units={lengthUnits}
            onUnitChange={handleUnit1Change}
          />
          <Input
            id="value1"
            type="number"
            value={value1}
            onChange={(e) => handleValue1Change(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-accent transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        {/* Unit 2 Section */}
        <div className="space-y-2 p-3 bg-primary/10 rounded-xl">
          <UnitSelector
            label={getFullUnitLabel(unit2)}
            currentUnit={currentUnit2Label}
            units={lengthUnits}
            onUnitChange={handleUnit2Change}
          />
          <Input
            id="value2"
            type="number"
            value={value2}
            onChange={(e) => handleValue2Change(e.target.value)}
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
          <p>1 ft = 12 in = 30.48 cm • 1 yd = 3 ft</p>
        </div>
        
        <Button 
          onClick={() => {
            setFeet("");
            setInches("");
            setValue1("");
            setValue2("");
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

export default ConversionCard;
