import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SpeedCard = () => {
  const [kmh, setKmh] = useState<string>("");
  const [ms, setMs] = useState<string>("");
  const [mph, setMph] = useState<string>("");
  const [knots, setKnots] = useState<string>("");

  // Conversion km/h -> others
  const updateFromKmh = (kmhVal: number) => {
    const msValue = kmhVal / 3.6;
    const mphValue = kmhVal / 1.60934;
    const knotsValue = kmhVal / 1.852;
    setMs(msValue.toFixed(5));
    setMph(mphValue.toFixed(5));
    setKnots(knotsValue.toFixed(5));
  };

  // Conversion m/s -> others
  const updateFromMs = (msVal: number) => {
    const kmhValue = msVal * 3.6;
    const mphValue = msVal * 2.23694;
    const knotsValue = msVal * 1.94384;
    setKmh(kmhValue.toFixed(5));
    setMph(mphValue.toFixed(5));
    setKnots(knotsValue.toFixed(5));
  };

  // Conversion mph -> others
  const updateFromMph = (mphVal: number) => {
    const kmhValue = mphVal * 1.60934;
    const msValue = mphVal / 2.23694;
    const knotsValue = mphVal / 1.15078;
    setKmh(kmhValue.toFixed(5));
    setMs(msValue.toFixed(5));
    setKnots(knotsValue.toFixed(5));
  };

  // Conversion knots -> others
  const updateFromKnots = (knotsVal: number) => {
    const kmhValue = knotsVal * 1.852;
    const msValue = knotsVal / 1.94384;
    const mphValue = knotsVal * 1.15078;
    setKmh(kmhValue.toFixed(5));
    setMs(msValue.toFixed(5));
    setMph(mphValue.toFixed(5));
  };

  const handleKmhChange = (value: string) => {
    setKmh(value);
    const kmhNum = parseFloat(value) || 0;
    updateFromKmh(kmhNum);
  };

  const handleMsChange = (value: string) => {
    setMs(value);
    const msNum = parseFloat(value) || 0;
    updateFromMs(msNum);
  };

  const handleMphChange = (value: string) => {
    setMph(value);
    const mphNum = parseFloat(value) || 0;
    updateFromMph(mphNum);
  };

  const handleKnotsChange = (value: string) => {
    setKnots(value);
    const knotsNum = parseFloat(value) || 0;
    updateFromKnots(knotsNum);
  };

  return (
    <Card className="w-full max-w-md p-4 space-y-2 shadow-lg">
      <div className="space-y-2">
        {/* Km/h Section */}
        <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
          <Label htmlFor="kmh" className="text-base font-semibold text-secondary-foreground">
            Kilomètres/heure (km/h)
          </Label>
          <Input
            id="kmh"
            type="number"
            value={kmh}
            onChange={(e) => handleKmhChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            min="0"
            step="any"
            autoFocus
            inputMode="numeric"
          />
        </div>

        {/* M/s Section */}
        <div className="space-y-2 p-3 bg-accent/20 rounded-xl">
          <Label htmlFor="ms" className="text-base font-semibold text-secondary-foreground">
            Mètres/seconde (m/s)
          </Label>
          <Input
            id="ms"
            type="number"
            value={ms}
            onChange={(e) => handleMsChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-accent transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        {/* MPH Section */}
        <div className="space-y-2 p-3 bg-primary/10 rounded-xl">
          <Label htmlFor="mph" className="text-base font-semibold text-secondary-foreground">
            Miles/heure (mph)
          </Label>
          <Input
            id="mph"
            type="number"
            value={mph}
            onChange={(e) => handleMphChange(e.target.value)}
            placeholder="0"
            className="text-2xl h-14 text-center font-semibold bg-card border-2 focus:ring-2 focus:ring-primary transition-all"
            min="0"
            step="any"
            inputMode="numeric"
          />
        </div>

        {/* Knots Section */}
        <div className="space-y-2 p-3 bg-muted/50 rounded-xl">
          <Label htmlFor="knots" className="text-base font-semibold text-secondary-foreground">
            Nœuds marins (kn)
          </Label>
          <Input
            id="knots"
            type="number"
            value={knots}
            onChange={(e) => handleKnotsChange(e.target.value)}
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
            setKmh("");
            setMs("");
            setMph("");
            setKnots("");
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
