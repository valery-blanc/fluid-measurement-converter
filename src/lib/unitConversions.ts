// Length conversions to meters
export const lengthToMeters: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  ft: 0.3048,
  in: 0.0254,
  yd: 0.9144,
  mi: 1609.344,
  nmi: 1852,
  ly: 9.461e15,
};

// Weight conversions to kilograms
export const weightToKg: Record<string, number> = {
  g: 0.001,
  kg: 1,
  t: 1000,
  c: 0.0002,
  lb: 0.45359237,
  oz: 0.028349523125,
  N: 0.10197162129779,
};

// Speed conversions to m/s
export const speedToMs: Record<string, number> = {
  "km/s": 1000,
  "km/h": 0.277778,
  "mi/s": 1609.344,
  "mi/h": 0.44704,
  kts: 0.514444,
  Ma: 343,
};

// Volume conversions to liters
export const volumeToLiters: Record<string, number> = {
  mL: 0.001,
  cL: 0.01,
  dL: 0.1,
  L: 1,
  cm3: 0.001,
  m3: 1000,
  "gal-us": 3.785411784,
  "gal-uk": 4.54609,
  "bbl-us": 158.987294928,
  "cup-us": 0.2365882365,
  "tbsp-us": 0.01478676478125,
  "tsp-us": 0.00492892159375,
  "cup-uk": 0.284130625,
  "tbsp-uk": 0.01775816,
  "tsp-uk": 0.00591939,
};

export const convertLength = (value: number, fromUnit: string, toUnit: string): number => {
  const meters = value * lengthToMeters[fromUnit];
  return meters / lengthToMeters[toUnit];
};

export const convertWeight = (value: number, fromUnit: string, toUnit: string): number => {
  const kg = value * weightToKg[fromUnit];
  return kg / weightToKg[toUnit];
};

export const convertSpeed = (value: number, fromUnit: string, toUnit: string): number => {
  const ms = value * speedToMs[fromUnit];
  return ms / speedToMs[toUnit];
};

export const convertVolume = (value: number, fromUnit: string, toUnit: string): number => {
  const liters = value * volumeToLiters[fromUnit];
  return liters / volumeToLiters[toUnit];
};
