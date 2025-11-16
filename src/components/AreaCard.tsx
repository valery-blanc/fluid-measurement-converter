import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UnitSelector from "./UnitSelector";
import { areaUnits } from "@/lib/unitDefinitions";
import { convertArea } from "@/lib/unitConversions";
import { Button } from "@/components/ui/button";

const AreaCard = () => {
  const [unit1, setUnit1] = useState(() => localStorage.getItem("areaUnit1") || "m2");
  const [unit2, setUnit2] = useState(() => localStorage.getItem("areaUnit2") || "ha");
  const [unit3, setUnit3] = useState(() => localStorage.getItem("areaUnit3") || "ft2");
  const [unit4, setUnit4] = useState(() => localStorage.getItem("areaUnit4") || "ac");
  
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");

  useEffect(() => {
    localStorage.setItem("areaUnit1", unit1);
  }, [unit1]);

  useEffect(() => {
    localStorage.setItem("areaUnit2", unit2);
  }, [unit2]);

  useEffect(() => {
    localStorage.setItem("areaUnit3", unit3);
  }, [unit3]);

  useEffect(() => {
    localStorage.setItem("areaUnit4", unit4);
  }, [unit4]);

  const updateFromValue1 = (val: string) => {
    setValue1(val);
    if (val === "") {
      setValue2("");
      setValue3("");
      setValue4("");
      return;
    }
    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      setValue2(convertArea(numVal, unit1, unit2).toFixed(6));
      setValue3(convertArea(numVal, unit1, unit3).toFixed(6));
      setValue4(convertArea(numVal, unit1, unit4).toFixed(6));
    }
  };

  const updateFromValue2 = (val: string) => {
    setValue2(val);
    if (val === "") {
      setValue1("");
      setValue3("");
      setValue4("");
      return;
    }
    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      setValue1(convertArea(numVal, unit2, unit1).toFixed(6));
      setValue3(convertArea(numVal, unit2, unit3).toFixed(6));
      setValue4(convertArea(numVal, unit2, unit4).toFixed(6));
    }
  };

  const updateFromValue3 = (val: string) => {
    setValue3(val);
    if (val === "") {
      setValue1("");
      setValue2("");
      setValue4("");
      return;
    }
    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      setValue1(convertArea(numVal, unit3, unit1).toFixed(6));
      setValue2(convertArea(numVal, unit3, unit2).toFixed(6));
      setValue4(convertArea(numVal, unit3, unit4).toFixed(6));
    }
  };

  const updateFromValue4 = (val: string) => {
    setValue4(val);
    if (val === "") {
      setValue1("");
      setValue2("");
      setValue3("");
      return;
    }
    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      setValue1(convertArea(numVal, unit4, unit1).toFixed(6));
      setValue2(convertArea(numVal, unit4, unit2).toFixed(6));
      setValue3(convertArea(numVal, unit4, unit3).toFixed(6));
    }
  };

  const handleValue1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFromValue1(e.target.value);
  };

  const handleValue2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFromValue2(e.target.value);
  };

  const handleValue3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFromValue3(e.target.value);
  };

  const handleValue4Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFromValue4(e.target.value);
  };

  const handleUnit1Change = (newUnit: string) => {
    const oldValue = value1;
    setUnit1(newUnit);
    if (oldValue) {
      const numVal = parseFloat(oldValue);
      if (!isNaN(numVal)) {
        setValue2(convertArea(numVal, newUnit, unit2).toFixed(6));
        setValue3(convertArea(numVal, newUnit, unit3).toFixed(6));
        setValue4(convertArea(numVal, newUnit, unit4).toFixed(6));
      }
    }
  };

  const handleUnit2Change = (newUnit: string) => {
    const oldValue = value2;
    setUnit2(newUnit);
    if (oldValue) {
      const numVal = parseFloat(oldValue);
      if (!isNaN(numVal)) {
        setValue1(convertArea(numVal, newUnit, unit1).toFixed(6));
        setValue3(convertArea(numVal, newUnit, unit3).toFixed(6));
        setValue4(convertArea(numVal, newUnit, unit4).toFixed(6));
      }
    }
  };

  const handleUnit3Change = (newUnit: string) => {
    const oldValue = value3;
    setUnit3(newUnit);
    if (oldValue) {
      const numVal = parseFloat(oldValue);
      if (!isNaN(numVal)) {
        setValue1(convertArea(numVal, newUnit, unit1).toFixed(6));
        setValue2(convertArea(numVal, newUnit, unit2).toFixed(6));
        setValue4(convertArea(numVal, newUnit, unit4).toFixed(6));
      }
    }
  };

  const handleUnit4Change = (newUnit: string) => {
    const oldValue = value4;
    setUnit4(newUnit);
    if (oldValue) {
      const numVal = parseFloat(oldValue);
      if (!isNaN(numVal)) {
        setValue1(convertArea(numVal, newUnit, unit1).toFixed(6));
        setValue2(convertArea(numVal, newUnit, unit2).toFixed(6));
        setValue3(convertArea(numVal, newUnit, unit3).toFixed(6));
      }
    }
  };

  const handleClear = () => {
    setValue1("");
    setValue2("");
    setValue3("");
    setValue4("");
  };

  const getUnitLabel = (unitValue: string) => {
    const unit = areaUnits.find(u => u.value === unitValue);
    return unit ? unit.label : unitValue;
  };

  return (
    <Card className="w-full max-w-md p-4 space-y-2 shadow-lg">
      <div className="space-y-2">
        <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
          <UnitSelector
            label={getUnitLabel(unit1)}
            currentUnit={unit1}
            units={areaUnits}
            onUnitChange={handleUnit1Change}
          />
          <Input
            type="number"
            value={value1}
            onChange={handleValue1Change}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            step="any"
            autoFocus
            inputMode="numeric"
          />
        </div>

        <div className="space-y-2 p-3 bg-accent/20 rounded-xl">
          <UnitSelector
            label={getUnitLabel(unit2)}
            currentUnit={unit2}
            units={areaUnits}
            onUnitChange={handleUnit2Change}
          />
          <Input
            type="number"
            value={value2}
            onChange={handleValue2Change}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-accent transition-all"
            step="any"
            inputMode="numeric"
          />
        </div>

        <div className="space-y-2 p-3 bg-primary/10 rounded-xl">
          <UnitSelector
            label={getUnitLabel(unit3)}
            currentUnit={unit3}
            units={areaUnits}
            onUnitChange={handleUnit3Change}
          />
          <Input
            type="number"
            value={value3}
            onChange={handleValue3Change}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            step="any"
            inputMode="numeric"
          />
        </div>

        <div className="space-y-2 p-3 bg-muted/20 rounded-xl">
          <UnitSelector
            label={getUnitLabel(unit4)}
            currentUnit={unit4}
            units={areaUnits}
            onUnitChange={handleUnit4Change}
          />
          <Input
            type="number"
            value={value4}
            onChange={handleValue4Change}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            step="any"
            inputMode="numeric"
          />
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleClear}>
        Clear
      </Button>
    </Card>
  );
};

export default AreaCard;
