import { useState, useEffect } from "react";
import ConversionCard from "@/components/ConversionCard";
import WeightCard from "@/components/WeightCard";
import SpeedCard from "@/components/SpeedCard";
import TemperatureCard from "@/components/TemperatureCard";
import VolumeCard from "@/components/VolumeCard";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Ruler, Weight, Gauge, Thermometer, Droplet } from "lucide-react";

const Index = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    // Set initial state
    setCurrent(0);
    
    // Force scroll to first position
    const timer = setTimeout(() => {
      api.scrollTo(0, false);
    }, 0);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearTimeout(timer);
  }, [api]);

  const scrollToIndex = (index: number) => {
    setCurrent(index);
    api?.scrollTo(index);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      {/* Navigation Buttons */}
      <div className="mb-4 flex gap-2">
        <Button
          variant={current === 0 ? "default" : "outline"}
          size="icon"
          onClick={() => scrollToIndex(0)}
          className="h-12 w-12"
        >
          <Ruler className="h-5 w-5" />
        </Button>
        <Button
          variant={current === 1 ? "default" : "outline"}
          size="icon"
          onClick={() => scrollToIndex(1)}
          className="h-12 w-12"
        >
          <Weight className="h-5 w-5" />
        </Button>
        <Button
          variant={current === 2 ? "default" : "outline"}
          size="icon"
          onClick={() => scrollToIndex(2)}
          className="h-12 w-12"
        >
          <Gauge className="h-5 w-5" />
        </Button>
        <Button
          variant={current === 3 ? "default" : "outline"}
          size="icon"
          onClick={() => scrollToIndex(3)}
          className="h-12 w-12"
        >
          <Thermometer className="h-5 w-5" />
        </Button>
        <Button
          variant={current === 4 ? "default" : "outline"}
          size="icon"
          onClick={() => scrollToIndex(4)}
          className="h-12 w-12"
        >
          <Droplet className="h-5 w-5" />
        </Button>
      </div>

      {/* Carousel */}
      <Carousel 
        setApi={setApi} 
        className="w-full max-w-md" 
        opts={{ 
          startIndex: 0,
          loop: false,
          align: "start"
        }}
      >
        <CarouselContent>
          <CarouselItem>
            <ConversionCard />
          </CarouselItem>
          <CarouselItem>
            <WeightCard />
          </CarouselItem>
          <CarouselItem>
            <SpeedCard />
          </CarouselItem>
          <CarouselItem>
            <TemperatureCard />
          </CarouselItem>
          <CarouselItem>
            <VolumeCard />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Index;
