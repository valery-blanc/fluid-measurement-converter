import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import UnitSelector from "./UnitSelector";
import { weightUnits } from "@/lib/unitDefinitions";
import { convertWeight } from "@/lib/unitConversions";

const WeightCard = () => {
  const [lbWhole, setLbWhole] = useState<string>("");
  const [oz, setOz] = useState<string>("");
  const [unit1, setUnit1] = useState<string>(() => localStorage.getItem("weightUnit1") || "lb");
  const [value1, setValue1] = useState<string>("");
  const [unit2, setUnit2] = useState<string>(() => localStorage.getItem("weightUnit2") || "kg");
  const [value2, setValue2] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("weightUnit1", unit1);
  }, [unit1]);

  useEffect(() => {
    localStorage.setItem("weightUnit2", unit2);
  }, [unit2]);

  const updateFromLbOz = (lbVal: number, ozVal: number) => {
    const totalOz = lbVal * 16 + ozVal;
    const val1 = convertWeight(totalOz, "oz", unit1);
    const val2 = convertWeight(totalOz, "oz", unit2);
    setValue1(val1.toFixed(5));
    setValue2(val2.toFixed(5));
  };

  const updateFromValue1 = (val: number) => {
    const totalOz = convertWeight(val, unit1, "oz");
    const lbValue = Math.floor(totalOz / 16);
    const ozValue = totalOz % 16;
    setLbWhole(lbValue.toString());
    setOz(ozValue.toFixed(5));
    // Always convert, even if units are the same
    const inOz = convertWeight(val, unit1, "oz");
    const val2 = convertWeight(inOz, "oz", unit2);
    setValue2(val2.toFixed(5));
  };

  const updateFromValue2 = (val: number) => {
    const totalOz = convertWeight(val, unit2, "oz");
    const lbValue = Math.floor(totalOz / 16);
    const ozValue = totalOz % 16;
    setLbWhole(lbValue.toString());
    setOz(ozValue.toFixed(5));
    // Always convert, even if units are the same
    const inOz = convertWeight(val, unit2, "oz");
    const val1 = convertWeight(inOz, "oz", unit1);
    setValue1(val1.toFixed(5));
  };

  const handleLbWholeChange = (value: string) => {
    setLbWhole(value);
    const lbNum = parseFloat(value) || 0;
    const ozNum = parseFloat(oz) || 0;
    updateFromLbOz(lbNum, ozNum);
  };

  const handleOzChange = (value: string) => {
    setOz(value);
    const lbNum = parseFloat(lbWhole) || 0;
    const ozNum = parseFloat(value) || 0;
    updateFromLbOz(lbNum, ozNum);
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
    const inOz = convertWeight(currentValue, unit1, "oz");
    setUnit1(newUnit);
    const newValue = convertWeight(inOz, "oz", newUnit);
    setValue1(newValue.toFixed(5));
  };

  const handleUnit2Change = (newUnit: string) => {
    const currentValue = parseFloat(value2) || 0;
    const inOz = convertWeight(currentValue, unit2, "oz");
    setUnit2(newUnit);
    const newValue = convertWeight(inOz, "oz", newUnit);
    setValue2(newValue.toFixed(5));
  };

  const currentUnit1Label = weightUnits.find(u => u.value === unit1)?.label.split("(")[1].replace(")", "") || unit1;
  const currentUnit2Label = weightUnits.find(u => u.value === unit2)?.label.split("(")[1].replace(")", "") || unit2;
  const getFullUnitLabel = (unit: string) => weightUnits.find(u => u.value === unit)?.label || unit;

  return (
    <Card className="w-full max-w-md p-4 space-y-2 shadow-lg">
      <div className="space-y-2">
        {/* Pounds + Ounces Section */}
        <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
          <div className="text-base font-semibold text-secondary-foreground mb-2">Pounds + Ounces</div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="lbWhole" className="text-sm text-muted-foreground">Pounds (lb)</Label>
              <Input
                id="lbWhole"
                type="number"
                value={lbWhole}
                onChange={(e) => handleLbWholeChange(e.target.value)}
                placeholder="0"
                className="text-xl h-12 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
                min="0"
                step="1"
                autoFocus
                inputMode="numeric"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="oz" className="text-sm text-muted-foreground">Ounces (oz)</Label>
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

        {/* Unit 1 Section */}
        <div className="space-y-2 p-3 bg-accent/20 rounded-xl">
          <UnitSelector
            label={getFullUnitLabel(unit1)}
            currentUnit={currentUnit1Label}
            units={weightUnits}
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
            units={weightUnits}
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
        <Button
          onClick={() => {
            setLbWhole("");
            setOz("");
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

export default WeightCard;
