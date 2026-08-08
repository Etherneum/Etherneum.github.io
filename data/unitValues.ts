import type { Unit } from "./units";

export type ModifierBonuses = {
  traitMultipliers: Record<string, number>;
  levelMultipliers: Record<number, number>;
};

export type ModifierSettings = {
  mutation: string | null;
  trait: string | null;
  level: number;
};

export const DEFAULT_MODIFIER_BONUSES: ModifierBonuses = {
  traitMultipliers: {
    Sharp: 1.02,
    Swift: 1.02,
    Strong: 1.04,
    Deadly: 1.04,
    Rush: 1.1,
    Powerful: 1.1,
    Deadeye: 1.2,
    Juggernaut: 1.2,
    Lethal: 1.2,
    Royal: 1.2,
    Entrepreneur: 1.45,
    Reaper: 1.5,
    Cloner: 1.25,
    Ghost: 1.4,
    Superior: 1.65,
    Cursed: 1.85,
    Viking: 1.95,
  },
  levelMultipliers: {
    1: 1,
    2: 1.05,
    3: 1.1,
    4: 1.15,
    5: 1.2,
    6: 1.3,
    7: 1.45
  },
};

export const MUTATION_VALUE_MULTIPLIERS: Record<string, number> = {
  Gold: 1.1,
  Diamond: 1.2,
  Demon: 1.4,
  Destroyer: 1.5,
  Hollow: 1.6,
  Slayer: 2.0,
  Cursed: 1.9,
  Astronaut: 2.2,
};

export function getMutationValueMultiplier(mutation?: string | null) {
  if (!mutation) return 1;
  return MUTATION_VALUE_MULTIPLIERS[mutation] ?? 1;
}

function getTraitMultiplier(traitName?: string | null, bonuses: ModifierBonuses = DEFAULT_MODIFIER_BONUSES) {
  if (!traitName) return 1;
  return bonuses.traitMultipliers[traitName] ?? 1;
}

function getLevelMultiplier(level: number, bonuses: ModifierBonuses = DEFAULT_MODIFIER_BONUSES) {
  return bonuses.levelMultipliers[level] ?? 1;
}

export function getUnitDisplayValue(
  unit: Unit | null,
  _units: Unit[],
  modifierSettings?: ModifierSettings,
  bonuses: ModifierBonuses = DEFAULT_MODIFIER_BONUSES,
) {
  if (!unit) return 0;

  const level = Math.max(1, Math.min(7, modifierSettings?.level ?? 1));
  let value = (unit.value ?? 0) * getMutationValueMultiplier(modifierSettings?.mutation);

  value *= getTraitMultiplier(modifierSettings?.trait, bonuses);
  value *= getLevelMultiplier(level, bonuses);

  return value;
}

export function getModifierBreakdown(
  unit: Unit | null,
  modifierSettings?: ModifierSettings,
  bonuses: ModifierBonuses = DEFAULT_MODIFIER_BONUSES,
) {
  if (!unit) return null;

  const level = Math.max(1, Math.min(7, modifierSettings?.level ?? 1));
  const baseValue = unit.value ?? 0;
  const mutationMultiplier = getMutationValueMultiplier(modifierSettings?.mutation);
  const traitMultiplier = getTraitMultiplier(modifierSettings?.trait, bonuses);
  const levelMultiplier = getLevelMultiplier(level, bonuses);
  const total = baseValue * mutationMultiplier * traitMultiplier * levelMultiplier;

  return {
    baseValue,
    mutationMultiplier,
    traitMultiplier,
    levelMultiplier,
    total,
    level,
  };
}
