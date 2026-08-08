export type Trait = {
  name: string;
  dropChance: string;
  buffs: string;
};

export type TraitTier = {
  tier: string;
  color: string;
  traits: Trait[];
};

export const TRAIT_TIERS: TraitTier[] = [
  {
    tier: "Rare",
    color: "#38bdf8",
    traits: [
      { name: "Sharp", dropChance: "12%", buffs: "+10% Crit Chance | +25% Crit Damage" },
      { name: "Swift", dropChance: "10%", buffs: "10% Faster Attacks" },
      { name: "Strong", dropChance: "10%", buffs: "+10% Damage" },
    ],
  },
  {
    tier: "Epic",
    color: "#a78bfa",
    traits: [
      { name: "Deadly", dropChance: "8%", buffs: "+15% Crit Chance | +30% Crit Damage" },
      { name: "Rush", dropChance: "7%", buffs: "15% Faster Attacks" },
      { name: "Powerful", dropChance: "7%", buffs: "+20% Damage | +10% Health" },
    ],
  },
  {
    tier: "Legendary",
    color: "#fbbf24",
    traits: [
      { name: "Deadeye", dropChance: "4%", buffs: "+35% Crit Chance | +45% Crit Damage" },
      { name: "Juggernaut", dropChance: "2.7%", buffs: "+50% Damage | +35% Health | 10% Slower Attacks" },
      { name: "Lethal", dropChance: "1.8%", buffs: "+35% Damage | +30% Crit Chance | +40% Crit Damage" },
      { name: "Royal", dropChance: "1.5%", buffs: "+25% Damage | +15% Health | +25% Cash" },
    ],
  },
  {
    tier: "Mythic",
    color: "#fb7185",
    traits: [
      { name: "Entrepreneur", dropChance: "0.5%", buffs: "+45% Damage | +25% Health | 10% Faster Attacks | +65% Money" },
      { name: "Reaper", dropChance: "0.35%", buffs: "+90% Damage | +35% Health | 16% Faster Attacks | +35% Crit Chance | +45% Crit Damage" },
      { name: "Cloner", dropChance: "0.25%", buffs: "+40% Damage | +60% Health | Summons 2 units instead of 1" },
      { name: "Superior", dropChance: "0.15%", buffs: "+200% Damage | +100% Health | 20% Faster Attacks | +40% Crit Chance | +65% Crit Damage" },
    ],
  },
  {
    tier: "God",
    color: "#ef4444",
    traits: [
      { name: "Cursed", dropChance: "0.02%", buffs: "+400% Damage | +200% Health | 25% Faster Attacks | +65% Cash | +50% Crit Chance | +100% Crit Damage" },
      { name: "Viking", dropChance: "0.02%", buffs: "+200% Damage | +750% Health | 25% Faster Attacks | +50% Crit Chance | +150% Crit Damage" },
    ],
  },
];
