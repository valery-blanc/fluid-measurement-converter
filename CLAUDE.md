# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## fluid-measurement-converter

Application web/mobile de conversion d'unités, mobile-first.

**Repo :** https://github.com/valery-blanc/fluid-measurement-converter
**URL publiée :** https://fluid-measurement-converter.lovable.app
**Spec technique :** `docs/specs/convertunit-spec.md`

## Commandes

```bash
npm run dev      # Serveur de développement (port 5173)
npm run build    # Build production → dist/
npm run lint     # ESLint
npm run preview  # Aperçu du build prod
```

Il n'y a pas de tests automatisés dans ce projet.

## Architecture

### Flux de données

Toutes les conversions passent par `src/lib/unitConversions.ts` qui expose une fonction par catégorie (`convertLength`, `convertWeight`, `convertSpeed`, `convertVolume`, `convertArea`). Chaque fonction convertit via une **unité pivot** (m, kg, m/s, L, m²) : `valeur → pivot → cible`. La température utilise des formules directes dans `TemperatureCard`.

Les définitions des unités (libellés + valeurs) sont dans `src/lib/unitDefinitions.ts`. Pour ajouter une unité, il faut modifier les deux fichiers.

### Deux patterns de composants

**Standard** (AreaCard, SpeedCard, VolumeCard) : 4 champs empilés, chacun avec un `UnitSelector` dropdown. La modification de n'importe quel champ recalcule les 3 autres en temps réel.

**Hybride** (ConversionCard = longueurs, WeightCard = poids) : une section combinée en haut (ft+in ou lb+oz) plus 2 champs unitaires avec dropdown. L'intermédiaire de calcul interne au composant est inches (pour les longueurs) ou ounces (pour les poids), indépendamment du pivot interne de `convertLength`/`convertWeight`.

**TemperatureCard** : 3 champs fixes sans dropdown. Comportement distinct : si un champ est vidé (valeur = NaN), les autres ne sont pas recalculés (contrairement aux autres composants qui traitent le vide comme `0`).

### Navigation / Carousel

`src/pages/Index.tsx` orchestre le carousel embla (6 slides) et la barre de 6 boutons icônes. L'écran actif est tracké par `current` (useState). Au montage, un `setTimeout(..., 0)` force le scroll vers l'index 5 (Longueurs). Ordre : 0=Surfaces, 1=Vitesses, 2=Températures, 3=Poids, 4=Volumes, 5=Longueurs.

### Persistance

Les unités sélectionnées sont sauvegardées dans `localStorage` (clés : `{category}Unit{1..4}`, ex. `lengthUnit1`). Les valeurs saisies ne sont jamais persistées.

### Mobile

Capacitor 7 (Android). `appId: app.lovable.e835bfd78466470db4df68c15a66d4a1`, `appName: "convert unit"`, `webDir: "dist"`. Build Android : `npm run build` puis commandes Capacitor.

---

## Overrides pour le skill /release

Ce projet est **web + Capacitor**, pas un projet Android natif. Les valeurs par défaut du skill /release ne s'appliquent pas directement :

| Ce que le skill fait par défaut | Ce qu'il faut faire ici |
|---|---|
| Lire `app/build.gradle.kts` | Lire `android/app/build.gradle` (Groovy, pas KTS) |
| `./gradlew clean bundleRelease` (racine) | `cd android && JAVA_HOME="C:/Program Files/Android/Android Studio/jbr" ./gradlew clean bundleRelease` |
| AAB : `app/build/outputs/bundle/release/app-release.aab` | AAB : `android/app/build/outputs/bundle/release/app-release.aab` |

**Étape supplémentaire obligatoire AVANT Gradle (entre Step 2 et Step 3 du skill) :**
```bash
npm run build && npx cap sync android
```
Sans cette étape, le bundle release ne contient pas les assets web à jour.

**JAVA_HOME** : toujours utiliser `C:/Program Files/Android/Android Studio/jbr` (Java 21).
Le JDK système (Java 25) est incompatible avec cette version de Gradle.

---

## Règles ADB (OBLIGATOIRE)

**Ne JAMAIS utiliser `adb shell pm clear <package>` sur un launcher.**
Cette commande efface toutes les données du launcher (raccourcis, fond d'écran, disposition), pas seulement le cache icônes. C'est irréversible.

Pour vider uniquement le cache icônes du launcher après un changement d'icône :
```bash
adb shell am force-stop <launcher_package>   # tuer le launcher
adb shell am start -n <launcher_package>/.MainActivity  # relancer
# ou simplement laisser l'utilisateur appuyer sur Home
```

---

## Workflow Rules

### Task Tracking
Pour toute tâche impliquant plus de 3 fichiers ou plus de 3 étapes :
1. AVANT de commencer, créer/mettre à jour une checklist dans `docs/tasks/TASKS.md`
2. Marquer chaque sous-étape avec `[ ]` (todo), `[x]` (done), ou `[!]` (bloqué)
3. Mettre à jour la checklist APRÈS chaque sous-étape complétée
4. Si la session est interrompue, la checklist est la source de vérité pour reprendre

### Resuming Work
Au début d'une nouvelle session ou après /clear, TOUJOURS :
1. Lire `docs/tasks/TASKS.md` pour vérifier l'avancement
2. Identifier le premier item non coché
3. Reprendre depuis là — NE PAS recommencer le travail déjà fait

### Documentation Synchronization (OBLIGATOIRE)

**À chaque demande de modification, bug fix ou nouvelle feature — TOUJOURS :**

1. **Créer ou mettre à jour le fichier de bug** (`docs/bugs/BUG-XXX-*.md`)
   ou de feature (`docs/specs/FEAT-XXX-*.md`) correspondant.

2. **Mettre à jour `docs/specs/convertunit-spec.md`** — OBLIGATOIRE, SANS EXCEPTION.
   Ce fichier est la source de vérité de l'application. Il doit refléter à tout moment
   le comportement réel du code. Mettre à jour :
   - La section concernée (UI, navigation, persistance, architecture, etc.)
   - Le numéro de version en en-tête (FEAT-XXX / BUG-XXX)
   - La structure du projet si des fichiers sont ajoutés/supprimés
   - Les cas limites si un nouveau cas est géré
   Ne pas attendre qu'on le demande. Si la feature est trop petite pour un § dédié,
   intégrer l'info dans la section la plus proche.

3. **Mettre à jour `docs/tasks/TASKS.md`** — toujours, sans condition :
   ajouter l'entrée si elle n'existe pas, cocher `[x]` les étapes terminées.

Cette règle s'applique MÊME pour les petites modifications demandées directement dans
le chat. Si c'est trop petit pour un fichier BUG/FEAT dédié, au minimum mettre à jour
`docs/specs/convertunit-spec.md` si le comportement change.

### Règle de déploiement et confirmation (OBLIGATOIRE)

**Aucun commit ne doit être créé avant que l'utilisateur ait testé et confirmé.**

Ordre impératif pour tout bug fix ou feature :

```
[code] → [docs] → [npm run build] → [demander test] → [attendre OK] → [commit]
```

Pour tester sur Android : `npm run build && npx cap sync && npx cap run android`

- Le commit regroupe TOUJOURS : code source + fichiers de doc + TASKS.md
- Si l'utilisateur signale un problème après test → corriger, rebuilder,
  re-demander confirmation AVANT de committer
- **Si un crash est découvert lors du test** → créer `docs/bugs/BUG-XXX-*.md`
  (même si déjà corrigé), mettre à jour `docs/specs/convertunit-spec.md`
  avec la règle à retenir, et référencer dans `docs/tasks/TASKS.md`
- Aucune exception : même pour une modification d'une seule ligne

### Bug Fix Workflow
1. Documenter le bug dans `docs/bugs/BUG-XXX-short-name.md` (symptôme,
   reproduction, section spec impactée)
2. Analyser la cause racine AVANT d'écrire le fix (Plan Mode)
3. Implémenter le fix
4. Mettre à jour la documentation :
   - `docs/bugs/BUG-XXX-*.md` → statut `FIXED`, fix décrit
   - **`docs/specs/convertunit-spec.md` → OBLIGATOIRE**
   - `docs/tasks/TASKS.md` → cocher `[x]` les étapes terminées
5. Lancer `npm run build` et vérifier l'absence d'erreurs
6. **Demander à l'utilisateur de tester et attendre sa confirmation explicite**
7. Une fois confirmé : committer TOUS les fichiers modifiés en un seul commit
   (code + docs + TASKS.md) : `"FIX BUG-XXX: description courte"`

### Feature Evolution Workflow
1. Écrire la spec dans `docs/specs/FEAT-XXX-short-name.md` (contexte,
   comportement, spec technique, impact sur l'existant)
2. Analyser l'impact sur le code existant (Plan Mode)
3. Décomposer en tâches dans `docs/tasks/TASKS.md`
4. Implémenter
5. Mettre à jour la documentation :
   - `docs/specs/FEAT-XXX-*.md` → statut `DONE`, implémentation décrite
   - **`docs/specs/convertunit-spec.md` → OBLIGATOIRE** : intégrer le nouveau
     comportement, incrémenter la version
   - `docs/tasks/TASKS.md` → cocher `[x]` les étapes terminées
6. Lancer `npm run build` et vérifier l'absence d'erreurs
7. **Demander à l'utilisateur de tester et attendre sa confirmation explicite**
8. Une fois confirmé : committer TOUS les fichiers modifiés en un seul commit :
   `"FEAT-XXX: description courte"`
9. Mettre à jour CLAUDE.md si des règles d'architecture ont changé
