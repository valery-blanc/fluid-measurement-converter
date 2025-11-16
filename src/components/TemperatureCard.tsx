import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const TemperatureCard = () => {
  const [celsius, setCelsius] = useState<string>("");
  const [fahrenheit, setFahrenheit] = useState<string>("");
  const [kelvin, setKelvin] = useState<string>("");

  // Conversion Celsius -> others
  const updateFromCelsius = (celsiusVal: number) => {
    const fahrenheitValue = (celsiusVal * 9/5) + 32;
    const kelvinValue = celsiusVal + 273.15;
    setFahrenheit(fahrenheitValue.toFixed(5));
    setKelvin(kelvinValue.toFixed(5));
  };

  // Conversion Fahrenheit -> others
  const updateFromFahrenheit = (fahrenheitVal: number) => {
    const celsiusValue = (fahrenheitVal - 32) * 5/9;
    const kelvinValue = celsiusValue + 273.15;
    setCelsius(celsiusValue.toFixed(5));
    setKelvin(kelvinValue.toFixed(5));
  };

  // Conversion Kelvin -> others
  const updateFromKelvin = (kelvinVal: number) => {
    const celsiusValue = kelvinVal - 273.15;
    const fahrenheitValue = (celsiusValue * 9/5) + 32;
    setCelsius(celsiusValue.toFixed(5));
    setFahrenheit(fahrenheitValue.toFixed(5));
  };

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    const celsiusNum = parseFloat(value);
    if (!isNaN(celsiusNum)) {
      updateFromCelsius(celsiusNum);
    }
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    const fahrenheitNum = parseFloat(value);
    if (!isNaN(fahrenheitNum)) {
      updateFromFahrenheit(fahrenheitNum);
    }
  };

  const handleKelvinChange = (value: string) => {
    setKelvin(value);
    const kelvinNum = parseFloat(value);
    if (!isNaN(kelvinNum)) {
      updateFromKelvin(kelvinNum);
    }
  };

  return (
    <Card className="w-full max-w-md p-4 space-y-2 shadow-lg">
      <div className="space-y-2">
        {/* Celsius Section */}
        <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
          <Label htmlFor="celsius" className="text-base font-semibold text-secondary-foreground">
            Celsius (°C)
          </Label>
          <Input
            id="celsius"
            type="number"
            value={celsius}
            onChange={(e) => handleCelsiusChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            step="any"
            autoFocus
            inputMode="numeric"
          />
        </div>

        {/* Fahrenheit Section */}
        <div className="space-y-2 p-3 bg-accent/20 rounded-xl">
          <Label htmlFor="fahrenheit" className="text-base font-semibold text-secondary-foreground">
            Fahrenheit (°F)
          </Label>
          <Input
            id="fahrenheit"
            type="number"
            value={fahrenheit}
            onChange={(e) => handleFahrenheitChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-accent transition-all"
            step="any"
            inputMode="numeric"
          />
        </div>

        {/* Kelvin Section */}
        <div className="space-y-2 p-3 bg-primary/10 rounded-xl">
          <Label htmlFor="kelvin" className="text-base font-semibold text-secondary-foreground">
            Kelvin (K)
          </Label>
          <Input
            id="kelvin"
            type="number"
            value={kelvin}
            onChange={(e) => handleKelvinChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>
      </div>

      <Button 
        onClick={() => {
          setCelsius("");
          setFahrenheit("");
          setKelvin("");
        }}
        variant="outline"
        className="w-full"
      >
        Clear
      </Button>
    </Card>
  );
};

export default TemperatureCard;
