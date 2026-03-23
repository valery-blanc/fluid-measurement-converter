# Spécifications Techniques — Convertisseur d'Unités (Unit Converter)

**Version :** 1.0  
**Date :** 2026-03-23  
**URL publiée :** https://fluid-measurement-converter.lovable.app

---

## 1. Vue d'ensemble

Application web monopage (SPA) de conversion d'unités, conçue pour un usage mobile-first. L'application présente 6 écrans de conversion accessibles via un carousel horizontal et une barre de navigation par icônes.

**Cible :** Application mobile via Capacitor (Android) et navigateur web.

---

## 2. Stack Technique

| Élément | Technologie |
|---------|-------------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Carousel | embla-carousel-react |
| Icônes | lucide-react |
| Mobile natif | Capacitor 7 (Android) |
| Routing | react-router-dom v6 |

---

## 3. Architecture des fichiers

```
src/
├── pages/
│   └── Index.tsx              # Page principale avec carousel + navigation
├── components/
│   ├── AreaCard.tsx            # Conversion de surfaces
│   ├── SpeedCard.tsx           # Conversion de vitesses
│   ├── TemperatureCard.tsx     # Conversion de températures
│   ├── WeightCard.tsx          # Conversion de poids
│   ├── VolumeCard.tsx          # Conversion de volumes
│   ├── ConversionCard.tsx      # Conversion de longueurs
│   ├── UnitSelector.tsx        # Composant dropdown de sélection d'unité
│   └── ui/                    # Composants shadcn/ui
├── lib/
│   ├── unitConversions.ts     # Fonctions de conversion mathématiques
│   └── unitDefinitions.ts     # Définitions des unités (labels, valeurs)
```

---

## 4. Page principale (Index.tsx)

### 4.1 Navigation
- **6 boutons icônes** en haut de l'écran, disposés horizontalement dans un `flex gap-2`
- Chaque bouton est de taille `h-12 w-12` (48×48px), avec `size="icon"`
- Le bouton actif utilise `variant="default"`, les autres `variant="outline"`
- Cliquer sur un bouton scrolle le carousel vers l'écran correspondant

**Ordre des boutons et écrans (de gauche à droite) :**

| Index | Icône | Composant | Catégorie |
|-------|-------|-----------|-----------|
| 0 | `Square` | AreaCard | Surfaces |
| 1 | `Gauge` | SpeedCard | Vitesses |
| 2 | `Thermometer` | TemperatureCard | Températures |
| 3 | `Weight` | WeightCard | Poids |
| 4 | `Droplet` | VolumeCard | Volumes |
| 5 | `Ruler` | ConversionCard | Longueurs |

### 4.2 Carousel
- Composant `Carousel` de shadcn/ui (basé sur embla-carousel)
- `max-w-md` (max 448px de large), centré
- Options : `startIndex: 5`, `loop: false`, `align: "start"`
- **Au lancement, l'écran de Longueurs (index 5) est affiché par défaut**
- Un `setTimeout(..., 0)` force le scroll initial vers l'index 5

### 4.3 Layout
- `min-h-screen`, centré verticalement et horizontalement
- `bg-background` (couleur du design system)
- Padding `p-4`

---

## 5. Composants de conversion

### 5.1 Pattern commun (SpeedCard, VolumeCard, AreaCard)

Ces 3 composants suivent exactement le même pattern :

- **4 champs de saisie** empilés verticalement dans une `Card`
- Chaque champ est dans un bloc arrondi (`rounded-xl`) avec un fond coloré :
  - Champ 1 : `bg-secondary/30`
  - Champ 2 : `bg-accent/20`
  - Champ 3 : `bg-primary/10`
  - Champ 4 : `bg-muted/50` (ou `bg-muted/20`)
- Chaque champ a un **UnitSelector** au-dessus (dropdown pour changer l'unité)
- Les inputs sont `type="number"`, `text-2xl h-14 text-center font-semibold`, avec `inputMode="numeric"`
- Le placeholder est `"0"` (grisé), la valeur initiale est `""` (chaîne vide)
- Le premier champ a `autoFocus`
- **Conversion temps réel** : modifier un champ met à jour tous les autres instantanément
- **Persistance des unités** : les unités sélectionnées sont stockées dans `localStorage`
- Bouton **"Clear"** en bas : `variant="outline"`, `w-full`, remet toutes les valeurs à `""`
- Précision : `.toFixed(5)` pour Speed/Volume, `.toFixed(6)` pour Area

#### Unités par défaut

| Composant | Champ 1 | Champ 2 | Champ 3 | Champ 4 |
|-----------|---------|---------|---------|---------|
| AreaCard | m² | ha | ft² | ac |
| SpeedCard | km/h | mi/h | km/s | kts |
| VolumeCard | L | dL | gal-us | cup-us |

#### Clés localStorage

| Composant | Clés |
|-----------|------|
| AreaCard | `areaUnit1`, `areaUnit2`, `areaUnit3`, `areaUnit4` |
| SpeedCard | `speedUnit1`, `speedUnit2`, `speedUnit3`, `speedUnit4` |
| VolumeCard | `volumeUnit1`, `volumeUnit2`, `volumeUnit3`, `volumeUnit4` |

### 5.2 WeightCard (Poids)

Layout hybride avec **3 sections** :

1. **Section Pounds + Ounces** (`bg-secondary/30`) :
   - 2 champs côte à côte (`flex gap-2`) : Pounds (lb) et Ounces (oz)
   - Labels individuels : "Pounds (lb)" et "Ounces (oz)"
   - Inputs `text-xl h-12`, `min="0"`
   - Pounds : `step="1"` | Ounces : `step="any"`
   - Label de section : "Pounds + Ounces"
   - Conversion : `totalOz = lb * 16 + oz`
   - `autoFocus` sur le champ Pounds

2. **Section Unité 1** (`bg-accent/20`) :
   - UnitSelector + Input `text-2xl h-14`, `min="0"`, défaut : `lb`

3. **Section Unité 2** (`bg-primary/10`) :
   - UnitSelector + Input `text-2xl h-14`, `min="0"`, défaut : `kg`

- Persistance : `weightUnit1`, `weightUnit2`
- Précision : `.toFixed(5)` pour toutes les valeurs
- L'intermédiaire de calcul entre la section lb+oz et les champs unitaires est **ounces** (oz). La fonction `convertWeight` utilise kg comme pivot interne, mais le composant passe toujours par oz comme valeur intermédiaire.

### 5.3 ConversionCard (Longueurs)

Layout hybride avec **3 sections** :

1. **Section Feet + Inches** (`bg-secondary/30`) :
   - 2 champs côte à côte : Feet (ft) et Inches (in)
   - Labels individuels : "Feet (ft)" et "Inches (in)"
   - Label de section : "Feet + Inches"
   - Feet : `step="1"`, `min="0"` | Inches : `step="any"`, `min="0"`
   - Inputs `text-xl h-12`
   - Conversion : `totalInches = feet * 12 + inches`
   - `autoFocus` sur le champ Feet

2. **Section Unité 1** (`bg-accent/20`) :
   - UnitSelector + Input `text-2xl h-14`, `min="0"`, défaut : `cm`

3. **Section Unité 2** (`bg-primary/10`) :
   - UnitSelector + Input `text-2xl h-14`, `min="0"`, défaut : `yd`

- Persistance : `lengthUnit1`, `lengthUnit2`
- Précision : `.toFixed(5)` pour toutes les valeurs
- L'intermédiaire de calcul entre la section ft+in et les champs unitaires est **inches** (in). La fonction `convertLength` utilise mètres comme pivot interne, mais le composant passe toujours par inches comme valeur intermédiaire.

### 5.4 TemperatureCard (Températures)

Layout fixe avec **3 champs** (pas de UnitSelector) :

1. **Celsius (°C)** — `bg-secondary/30`, `autoFocus`
2. **Fahrenheit (°F)** — `bg-accent/20`
3. **Kelvin (K)** — `bg-primary/10`, `min="0"`

- Labels fixes (pas de dropdown, les unités ne sont pas modifiables)
- Inputs : `text-2xl h-14`, `step="any"`
- Formules :
  - `°F = °C × 9/5 + 32`
  - `K = °C + 273.15`
- Précision : `.toFixed(5)`
- Pas de persistance localStorage (pas de sélection d'unité)
- Bouton **"Clear"** en bas (`variant="outline"`, `w-full`) : remet les 3 champs à `""`
- **Comportement champ vide** : si la valeur saisie est `NaN` (champ effacé), les autres champs **ne sont pas mis à jour** (contrairement aux autres composants qui traitent le vide comme `0`)

---

## 6. UnitSelector (Composant dropdown)

- Affiche le **nom complet de l'unité** à gauche et l'**abréviation** à droite dans un bouton dropdown
- Utilise `DropdownMenu` de shadcn/ui
- Le bouton trigger est `variant="ghost"`, `size="sm"`, `h-6 px-2`
- Icône `ChevronDown` (3×3)
- Le menu affiche toutes les unités disponibles pour la catégorie
- L'unité actuellement sélectionnée est mise en surbrillance avec `bg-accent`
- Le fond du menu est `bg-card`

---

## 7. Définitions des unités

### 7.1 Longueurs (`lengthUnits`)

| Valeur | Label |
|--------|-------|
| mm | Millimeters (mm) |
| cm | Centimeters (cm) |
| m | Meters (m) |
| km | Kilometers (km) |
| ft | Feet (ft) |
| in | Inches (in) |
| yd | Yards (yd) |
| mi | Miles (mi) |
| nmi | Nautical Miles (nmi) |
| ly | Light Years (ly) |

### 7.2 Poids (`weightUnits`)

| Valeur | Label |
|--------|-------|
| g | Grams (g) |
| kg | Kilograms (kg) |
| t | Tonnes (t) |
| c | Carats (c) |
| lb | Pounds (lb) |
| oz | Ounces (oz) |
| N | Newtons (N) |

### 7.3 Vitesses (`speedUnits`)

| Valeur | Label |
|--------|-------|
| km/s | Kilometers/second (km/s) |
| km/h | Kilometers/hour (km/h) |
| mi/s | Miles/second (mi/s) |
| mi/h | Miles/hour (mi/h) |
| kts | Knots (kts) |
| Ma | Mach (Ma) |

### 7.4 Volumes (`volumeUnits`)

| Valeur | Label |
|--------|-------|
| mL | Milliliters (mL) |
| cL | Centiliters (cL) |
| dL | Deciliters (dL) |
| L | Liters (L) |
| cm3 | Cubic cm (cm³) |
| m3 | Cubic m (m³) |
| gal-us | US Gallon (gal) |
| gal-uk | UK Gallon (gal) |
| bbl-us | US Barrel (bbl) |
| cup-us | US Cup (cup) |
| tbsp-us | US Tablespoon (tbsp) |
| tsp-us | US Teaspoon (tsp) |
| cup-uk | UK Cup (cup) |
| tbsp-uk | UK Tablespoon (tbsp) |
| tsp-uk | UK Teaspoon (tsp) |

### 7.5 Surfaces (`areaUnits`)

| Valeur | Label |
|--------|-------|
| mm2 | Square Millimeters (mm²) |
| cm2 | Square Centimeters (cm²) |
| m2 | Square Meters (m²) |
| km2 | Square Kilometers (km²) |
| are | Are (a) |
| ha | Hectare (ha) |
| arpent | Arpent |
| ac | Acre (ac) |
| in2 | Square Inches (in²) |
| ft2 | Square Feet (ft²) |
| yd2 | Square Yards (yd²) |
| mi2 | Square Miles (mi²) |

---

## 8. Facteurs de conversion

Toutes les conversions passent par une **unité pivot** :

| Catégorie | Unité pivot | Fonction |
|-----------|------------|----------|
| Longueur | mètre (m) | `convertLength(value, from, to)` |
| Poids | kilogramme (kg) | `convertWeight(value, from, to)` |
| Vitesse | mètre/seconde (m/s) | `convertSpeed(value, from, to)` |
| Volume | litre (L) | `convertVolume(value, from, to)` |
| Surface | mètre carré (m²) | `convertArea(value, from, to)` |
| Température | — (formules directes) | Fonctions dédiées |

### Facteurs détaillés

#### Longueur → mètres
```
mm: 0.001, cm: 0.01, m: 1, km: 1000, ft: 0.3048, in: 0.0254,
yd: 0.9144, mi: 1609.344, nmi: 1852, ly: 9.461e15
```

#### Poids → kilogrammes
```
g: 0.001, kg: 1, t: 1000, c: 0.0002, lb: 0.45359237,
oz: 0.028349523125, N: 0.10197162129779
```

#### Vitesse → m/s
```
km/s: 1000, km/h: 0.277778, mi/s: 1609.344, mi/h: 0.44704,
kts: 0.514444, Ma: 343
```

#### Volume → litres
```
mL: 0.001, cL: 0.01, dL: 0.1, L: 1, cm3: 0.001, m3: 1000,
gal-us: 3.785411784, gal-uk: 4.54609, bbl-us: 158.987294928,
cup-us: 0.2365882365, tbsp-us: 0.01478676478125, tsp-us: 0.00492892159375,
cup-uk: 0.284130625, tbsp-uk: 0.01775816, tsp-uk: 0.00591939
```

#### Surface → m²
```
mm2: 0.000001, cm2: 0.0001, m2: 1, km2: 1000000, are: 100,
ha: 10000, arpent: 3418.89, ac: 4046.8564224, in2: 0.00064516,
ft2: 0.09290304, yd2: 0.83612736, mi2: 2589988.110336
```

---

## 9. Design System

### 9.1 Palette de couleurs (HSL)

#### Mode clair (`:root`)
| Token | Valeur HSL |
|-------|-----------|
| `--background` | 210 20% 98% |
| `--foreground` | 215 25% 15% |
| `--card` | 0 0% 100% |
| `--primary` | 195 85% 50% |
| `--secondary` | 195 70% 95% |
| `--secondary-foreground` | 195 85% 30% |
| `--muted` | 210 20% 94% |
| `--accent` | 185 75% 55% |
| `--border` | 210 20% 88% |
| `--ring` | 195 85% 50% |
| `--radius` | 1rem |

#### Mode sombre (`.dark`)
| Token | Valeur HSL |
|-------|-----------|
| `--background` | 215 30% 12% |
| `--foreground` | 210 20% 95% |
| `--card` | 215 28% 15% |
| `--primary` | 195 85% 55% |
| `--secondary` | 215 25% 20% |
| `--accent` | 185 75% 60% |

### 9.2 Styles des champs

- Inputs principaux : `text-2xl h-14 text-center font-semibold bg-card border-2`
- Inputs Feet/Inches et Lb/Oz : `text-xl h-12 text-center font-semibold bg-card border-2`
- Focus : `focus:ring-2 focus:ring-primary` ou `focus:ring-accent` selon la section
- Transition : `transition-all`
- Tous les inputs : `inputMode="numeric"`, `type="number"`, `step="any"`, `placeholder="0"`

### 9.3 Sections colorées (blocs arrondis)
- Section 1 : `bg-secondary/30 rounded-xl p-3`
- Section 2 : `bg-accent/20 rounded-xl p-3`
- Section 3 : `bg-primary/10 rounded-xl p-3`
- Section 4 : `bg-muted/50 rounded-xl p-3` (ou `bg-muted/20`)

### 9.4 Card
- `w-full max-w-md p-4 space-y-2 shadow-lg`

---

## 10. Comportements clés

### 10.1 Conversion temps réel
- Chaque modification d'un champ déclenche immédiatement la conversion de tous les autres champs
- La conversion est bidirectionnelle (n'importe quel champ peut être la source)

### 10.2 Changement d'unité
- Quand l'utilisateur change l'unité d'un champ, la **valeur affichée est recalculée** pour refléter la nouvelle unité (la quantité physique reste la même)
- Les autres champs ne sont pas modifiés

### 10.3 Placeholder vs valeur
- Au lancement, tous les champs sont vides (`""`) avec un placeholder `"0"` grisé
- Le curseur est positionné au centre du premier champ (`autoFocus`)
- Taper un chiffre remplace directement le placeholder (pas de "02" ou "20")

### 10.4 Bouton Clear
- Remet toutes les valeurs à `""` (chaîne vide)
- Les unités sélectionnées sont conservées

### 10.5 Persistance
- Les unités sélectionnées par l'utilisateur sont sauvegardées dans `localStorage`
- Au rechargement, les unités sont restaurées depuis `localStorage`
- Les valeurs ne sont PAS persistées

---

## 11. Capacitor (Mobile)

- Configuré pour Android (`@capacitor/android`)
- `appId: "app.lovable.e835bfd78466470db4df68c15a66d4a1"`
- `appName: "convert unit"`
- `webDir: "dist"`

---

## 12. Routing

| Route | Composant |
|-------|-----------|
| `/` | `Index` (page principale) |
| `*` | `NotFound` (page 404) |

---

## 13. Notes d'implémentation

1. **Pas de backend** : application 100% client-side
2. **Pas d'authentification** : accès libre
3. **Les exposants (²)** dans les labels de surface utilisent le caractère Unicode `²` directement dans les strings
4. **La température** est le seul écran sans UnitSelector (unités fixes)
5. **Le poids et la longueur** ont un layout hybride avec section combinée (lb+oz / ft+in) + champs unitaires
6. **Newtons (N)** dans les poids : le facteur de conversion `0.10197162129779` convertit des Newtons en kg via `F = mg` (g ≈ 9.80665 m/s²)
