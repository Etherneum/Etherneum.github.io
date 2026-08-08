import type { Rarity } from "./rarity";

export type UnitStats = {
  damage?: number;
  defense?: number;
  health?: number;
  speed?: number;
};

export type UnitAbility = {
  title: string;
  description: string;
};

export type UnitForm = {
  name: string;
  stats: UnitStats;
  ability?: UnitAbility;
};

export type UnitDetails = {
  id: string;
  name: string;
  rarity: Rarity;
  value?: number;
  tag?: string;
  image?: string;
  stats?: UnitStats;
  ability?: UnitAbility;
  forms?: UnitForm[];
};

export function normalizeId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function u(name: string, rarity: Rarity, value?: number, tag?: string): UnitDetails {
  return {
    id: normalizeId(name),
    name,
    rarity,
    value,
    tag,
    stats: {},
    ability: { title: "", description: "" },
  };
}

const LIMITED_UNITS: UnitDetails[] = [
  u("Aldedo", "Limited", 298000),
  u("Saitomo Serious", "Limited", 274000),
  u("Bloodtear", "Limited", 261000),
  u("Takamoso", "Limited", 179000),
  u("Entomancer", "Limited", 165000),
  u("Genes", "Limited", 162000),
  u("Galactic Garow", "Limited", 139000),
  u("Katakoru", "Limited"),
  u("Tazumaki", "Limited"),
  u("Golden Frozer", "Limited", 137000),
  u("Muscle", "Limited", 130000),
  u("July", "Limited", 250000),
  u("Joozou", "Limited", 260000),
  u("Lilim", "Limited", 270000),
  u("Yuwi", "Limited"),
  u("Tanjuro", "Epic", 117000),
];

const GOD_UNITS: UnitDetails[] = [
  u("Sakuna (Heian)", "God",500000),
  u("Goji Shinjuku", "God", 190000),
  u("Ais", "God", 225000),
  u("Wise", "God", 130000),
  u("Yoichi", "God", 110000),
  u("Aisen Divine", "God", 150000),
  u("Shancks", "God", 120000),
  u("Isogo True Form", "God", 69000),
  u("Yamumoto", "God", 16000),
  u("Bills", "God", 138000),
  u("Michael", "God", 172000),
  u("Yujo Timeskip", "God"),
  u("Remura", "God", 70000),
  u("Daburo", "God", 120000),
];

const SECRET_UNITS: UnitDetails[] = [
  u("Kenie", "Secret", 55000),
  u("Ulquiopta", "Secret", 30000),
  u("Yutta", "Secret", 37000),
  u("Brakura", "Secret", 31000),
  u("Yuwah", "Secret", 30000),
  u("Duma", "Secret", 29000),
  u("Deyo", "Secret", 18000),
  u("Fryren", "Secret", 14000),
  u("Megumo", "Secret", 8000),
  u("Gyomain", "Secret", 1000),
  u("Jerin", "Secret", 3000),
  u("Hakuro", "Secret", 25000),
  u("Moru", "Secret"),
];

const MYTHIC_UNITS: UnitDetails[] = [
  u("Kiwusuke", "Mythic", 22000),
  u("Shimo Haya", "Mythic", 18000),
  u("Joti", "Mythic", 6000),
  u("Brocolli", "Mythic", 5000),
  u("Rengundam", "Mythic", 4000),
  u("Akazo", "Mythic", 3600),
  u("Orihemi", "Mythic", 3400),
  u("Kokushiro", "Mythic", 2800),
  u("Hoshira", "Mythic", 2700),
  u("Yoriki", "Mythic", 2600),
  u("Acer", "Mythic", 2500),
  u("Coyote", "Mythic", 2400),
  u("Kashimi", "Mythic", 8000),
];

const LEGENDARY_UNITS: UnitDetails[] = [
  u("Goji", "Legendary", 3500),
  u("Sakuna", "Legendary", 3400),
  u("Erwon", "Legendary", 1000),
  u("Zinichou", "Legendary", 900),
  u("Noruto", "Legendary", 700),
  u("Nonomi", "Legendary", 650),
  u("Grimmick", "Legendary", 400),
  u("Saitomo", "Legendary", 5000),
  u("Truck", "Legendary", 3000),
];

const RARE_UNITS: UnitDetails[] = [
  u("Sukora", "Rare", 10),
  u("Mobi", "Rare", 10),
  u("Goke", "Rare", 10),
  u("Janwoo", "Rare", 10),
  u("Mika", "Rare", 10),
];

const EPIC_UNITS: UnitDetails[] = [
  u("Got", "Epic", 16000),
  u("Picurro", "Epic", 15000),
  u("Bon", "Epic", 14000),
  u("Manji", "Epic", 13000),
  u("Shinrat", "Epic", 12000),
  u("Rinnju", "Epic", 8000),
];

const COMMON_UNITS: UnitDetails[] = [
  u("Itadoro", "Common", 9000),
  u("Usoff", "Common", 5000),
  u("Zero", "Common", 4000),
  u("Keririn", "Common", 3000),
  u("Luppi", "Common", 2000),
];

const KNOWN_DETAIL_OVERRIDES: Record<string, Partial<UnitDetails>> = {
  deyo: {
  stats: {
    damage: 420,
    defense: 1.28,
    health: 14000,
    speed: 3
  },
  ability: {
    title: "Time Stop",
    description: "Freeze all enemy in place for 20s"
  }
},

aldedo: {
  stats: {
    damage: 30000,
    defense: 1.25,
    health: 250000,
    speed: 1.0
  },
  ability: {
    title: "Loyalty",
    description: "Albedo gains double stats when fighting with Ainz"
  }
},

tazumaki: {
  stats: {
    damage: 35000,
    defense: 1.25,
    health: 17500,
    speed: 2.0
  },
  ability: {
    title: "Meteor Drop",
    description: "Calls down a meteor that smashes enemies in a wide area."
  }
},

bloodtear: {
  stats: {
    damage: 10000,
    defense: 1.32,
    health: 35000,
    speed: 1.3
  },
  ability: {
    title: "Vampire Mode",
    description: "Bloodtear triggers a life steal effect every attack!"
  }
},

entomancer: {
  stats: {
    damage: 6300,
    defense: 1.25,
    health: 16000,
    speed: 1.15
  },
  ability: {
    title: "Entomancy Arachnid",
    description: "Summons a large spider that defeats enemies with its powerful fangs!"
  }
},

"saitomo-serious": {
  stats: {
    damage: 5000,
    defense: 1.25,
    health: 11500,
    speed: 1.4
  },
  ability: {
    title: "Inferno Blade",
    description: "Causes burns to enemies that are hit by the Heavenly Sword!"
  }
},

bills: {
  stats: {
    damage: 1400,
    defense: 1.3,
    health: 17500,
    speed: 1.4
  },
  ability: {
    title: "Sphere of Destruction",
    description: "Throws a destruction ball that explodes with splash damage"
  }
},

"goji-shinjuku": {
  stats: {
    damage: 50000,
    defense: 1.95,
    health: 35000,
    speed: 7.25,
  },
  ability: {
    title: "Hollow Purple",
    description: "Pulls Blue and Red together, then unleashes Hollow Purple across the map.",
  },
},

yutta: {
  stats: {
    damage: 24500,
    defense: 1.31,
    health: 20000,
    speed: 2.0,
  },
  ability: {
    title: "Rikka",
    description: "Gains LifeSteal, summons Rikka and unleashes powerful blasts to enemies in the back!",
  },
},

"sakuna-heian": {
  stats: {
    damage: 240000,
    defense: 1.35,
    health: 11666.67,
    speed: 0.93
  },
  ability: {
    title: "Malevolent Shrine",
    description: "Malevolent Shrine unleashes a continuous barrage of slashes to all enemies in range, boosting attack and speed by a greater amount!"
  }
},

yuwi: {
  stats: {
    damage: 14700,
    defense: 1.5,
    health: 20000,
    speed: 0.8
  },
  ability: {
    title: "Mystic Draw",
    description: "Randomly summons Dark Magician or Dark Magician Girl."
  },
  forms: [
    {
      name: "Purple Magician",
      stats: {
        damage: 225000,
        defense: 1.5,
        health: 12500,
        speed: 1.5,
      },
      ability: {
        title: "Dark Magic",
        description: "His hits weaken enemies, making them take 50% more damage.",
      },
    },
    {
      name: "Purple Magician Girl",
      stats: {
        damage: 52500,
        defense: 1.5,
        health: 12500,
        speed: 3.0,
      },
      ability: {
        title: "Magician's Blessing",
        description: "Heals all allies for 10% of their maximum health.",
      },
    },
  ],
},

"isogo-true-form": {
  stats: {
    damage: 12075,
    defense: 1.33,
    health: 11550,
    speed: 1.0,
  },
  ability: {
    title: "Final Dark Slash",
    description: "Fires a massive Dark Slash that explodes into a nuke on impact.",
  },
},

shancks: {
  stats: {
    damage: 97500,
    defense: 1.3,
    health: 19600,
    speed: 1.3,
  },
  ability: {
    title: "Conqueror's Haki",
    description: "Overwhelms every enemy in range, stunning them and boosting all stats.",
  },
},

ais: {
  stats: {
    damage: 105000,
    defense: 1.25,
    health: 12500,
    speed: 1.25
  },
  ability: {
    title: "The Undeads",
    description: "Summons 2 Death Knight to help you in battle!"
  }
},

genes: {
  stats: {
    damage: 7500,
    defense: 1.28,
    health: 12000,
    speed: 0.9
  },
  ability: {
    title: "Core Overload",
    description: "Self-destructs at critical health, instantly destroying enemies caught in the blast."
  }
},
"galactic-garow": {
  stats: {
    damage: 265,
    defense: 1.28,
    health: 2909.09,
    speed: 1.0,
  },
  ability: {
    title: "Galactic Adaptation",
    description: "Infinitely scales stats and recovers health each wave defeated.",
  },
},
"yoichi": {
  stats: {
    damage: 3500,
    defense: 1.28,
    health: 21450,
    speed: 1.0,
  },
  ability: {
    title: "",
    description: "",
  },
},
"aisen-divine": {
  stats: {
    damage: 64057.5,
    defense: 1.35,
    health: 14025,
    speed: 3.506,
  },
  ability: {
    title: "Reality Shatter",
    description: "Aisen's attack reduces enemy defense and make them take 50% more damage.",
  },
},

takamoso: {
  stats: {
    damage: 4875,
    defense: 1.2,
    health: 6825,
    speed: 0.55,
  },
  ability: {
    title: "Slim down",
    description: "After fighting for 10 waves, Takamoso slims down and gains stronger stats!",
  },
},
  usoff: { stats: { damage: 16, defense: 1.1, health: 160, speed: 1 } },
  kiwusuke: {
    stats: { damage: 1500, defense: 1.25, health: 5000, speed: 2 },
    ability: {
      title: "Benihime Recovery",
      description: "Heals allies for 5% of max HP and boosts their attack for 12 seconds."
    }
  },
  akazo: {
    stats: { damage: 169, defense: 1.34, health: 5821, speed: 0.5 },
    ability: {
      title: "Compass",
      description: "25% Chance to dodge enemy attacks"
    }
  },
  acer: {
    stats: { damage: 360, defense: 1.2, health: 3500, speed: 0.6 },
    ability: {
      title: "Ultimate Entei",
      description: "Hurls a massive Entei fireball at the target, exploding on impact."
    }
  },
  hoshira: { stats: { damage: 430, defense: 1.2, health: 4165, speed: 0.6 } },
  "shimo-haya": { stats: { damage: 7000, defense: 1.2, health: 3145, speed: 3 } },
  yoriki: {
    stats: { damage: 1250, defense: 1.15, health: 5780, speed: 1 },
    ability: {
      title: "Flash Step",
      description: "Teleports to a far enemy and attacks."
    }
  },
  coyote: { stats: { damage: 175, defense: 1.25, health: 3570, speed: 3 } },
  megumo: {
    stats: { damage: 5000, defense: 1.25, health: 10000, speed: 1 },
    ability: {
      title: "Divine General",
      description: "Summons Mahorogo when Megumo's health is below 10%"
    }
  },
  july: {
    stats: {
      damage: 8500,
      defense: 1.5,
      health: 15000,
      speed: 0.8,
    },
    ability: {
      title: "Chrono Stasis",
      description: "Traps every enemy in frozen time before erasing them with overwhelming damage.",
    },
  },
  katakoru: {
    stats: {
      damage: 40000,
      defense: 1.35,
      health: 50000,
      speed: 2.4,
    },
    ability: {
      title: "Dough Body",
      description: "Katakoru turns his body into dough to dodge enemy attacks."
    }
  },
  joozou: {
    stats: {
      damage: 17500,
      defense: 1.41,
      health: 15000,
      speed: 0.7,
    },
    ability: {
      title: "Bleed",
      description: "Basic attacks apply stacking bleed damage over time.",
    },
  },
  lilim: {
    stats: {
      damage: 40000,
      defense: 1.33,
      health: 16500,
      speed: 0.75,
    },
    ability: {
      title: "Combat Switching",
      description: "Switches to stronger melee attacks when enemies get close, gaining 35% Attack, 15% Attack Speed, and 5% Lifesteal while in melee mode.",
    },
  },
  brocolli: {
    stats: {
      damage: 600,
      defense: 1.22,
      health: 6400,
      speed: 3,
    },
    ability: {
      title: "Legendary Rage",
      description: "When health drops 40%, increase attack by 65%, defense by 15% and speed by 50%.",
    },
  },
  "golden-frozer": {
    stats: {
      damage: 1250,
      defense: 1.28,
      health: 10000,
      speed: 0.5,
    },
    ability: {
      title: "",
      description: "",
    },
  },
  kashimi: {
    stats: {
      damage: 3500,
      defense: 1.33,
      health: 12500,
      speed: 0.8,
    },
    ability: {
      title: "",
      description: "",
    },
  },
  hakuro: {
    stats: {
      damage: 25000,
      defense: 1.35,
      health: 16000,
      speed: 2.0,
    },
    ability: {
      title: "Idle Death Gamble",
      description: "5% Jackpot chance every wave. Failed rolls add 5% chance.",
    },
  },
  daburo: {
    stats: {
      damage: 10000,
      defense: 1.35,
      health: 25000,
      speed: 1.0,
    },
    ability: {
      title: "Light & Dark",
      description: "Above 50% HP: +50% damage. Below 30%: 10% lifesteal per enemy hit until 80% HP.",
    },
  },
  hakaru: {
    stats: {
      damage: 65000,
      defense: 1.5,
      health: 3888888.5,
      speed: 2.0,
    },
    ability: {
      title: "Idle Death Gamble",
      description: "Jackpot grants 50% more attack and rapid healing for 20 seconds.",
    },
    forms: [
      {
        name: "Hakaru Jackpot",
        stats: {
          damage: 126923.08,
          defense: 1.5,
          health: 11111111,
          speed: 2.0,
        },
      },
    ],
  },
  remura: {
    stats: {
      damage: 3000,
      defense: 1.2,
      health: 9000,
      speed: 3.0,
    },
    ability: {
      title: "None",
      description: "No active or passive ability.",
    },
  },
  "yujo-timeskip": {
    stats: {
      damage: 1500000,
      defense: 1.44,
      health: 30000,
      speed: 1.6,
    },
    ability: {
      title: "Technique Swap",
      description: "Changes Yujo's attack style to Black Flash, Piercing Blood, and World Cutting Slash."
    },
    forms: [
      {
        name: "Black Flash",
        stats: { damage: 600000, defense: 1.44, health: 30000, speed: 1.6 }
      },
      {
        name: "Piercing Blood",
        stats: { damage: 1500000, defense: 1.44, health: 30000, speed: 1.6 }
      },
      {
        name: "World Cutting Slash",
        stats: { damage: 900000, defense: 1.44, health: 30000, speed: 1.6 }
      }
    ]
  },
  gyomain: {
    stats: { damage: 4000, defense: 1.32, health: 25000, speed: 2 },
    ability: {
      title: "Stone Impact",
      description: "Every 3rd attack stuns nearby enemies for 2 seconds."
    }
  },
  ulquiopta: {
    stats: { damage: 7500, defense: 1.25, health: 7500, speed: 2.5 },
    ability: {
      title: "Valiquent Spears",
      description: "Attacks with a swift, series of spear attacks with large splash area."
    }
  },
  kenie: {
    stats: { damage: 2100, defense: 1.32, health: 18000, speed: 1.8 },
    ability: {
      title: "Bloodlust",
      description: "Kenie triggers a life steal effect every 2nd attack!"
    }
  },
  jerin: { stats: { damage: 500, defense: 1.25, health: 16500, speed: 1 } },
  yuwah: {
    stats: { damage: 3000, defense: 1.12, health: 8500, speed: 3 },
    ability: {
      title: "Divine Arrowfall",
      description: "Calls forth a barrage of arrows from the sky, raining destruction upon the enemies."
    }
  },
  moru: {
    stats: {
      damage: 30000,
      defense: 1.24,
      health: 20000,
      speed: 2.0,
    },
    ability: {
      title: "Heavenly Regen",
      description: "Heals the allies with the lowest health.",
    },
  },
  michael: {
    stats: {
      damage: 752.63,
      defense: 1.34,
      health: 3250,
      speed: 0.65,
    },
    ability: {
      title: "Demon King",
      description: "When health drops below 30%, Michael transforms into monster with stronger stats but 65% health.",
    },
  },
  fryren: { stats: { damage: 2000, defense: 1.25, health: 5800, speed: 3.5 } },
  saitomo: { stats: { damage: 120, defense: 1.27, health: 4500, speed: 1 } },
  joti: {
    stats: { damage: 1750, defense: 1.5, health: 10000, speed: 1 },
    ability: {
      title: "Ambush",
      description: "Ambushes the highest-health enemy. Kills restore 5% health."
    }
  },
  kokushiro: { stats: { damage: 700, defense: 1.1, health: 5780, speed: 1 } },
  rengundam: {
    stats: { damage: 900, defense: 1.25, health: 7500, speed: 1.2 },
    ability: {
      title: "Flame Barrage",
      description: "Moves so fast it creates a large, destructive Flame slashes using the friction in the air."
    }
  },
  zinichou: {
    stats: { damage: 850, defense: 1.28, health: 8500, speed: 3 },
    ability: {
      title: "Thunderclap Stun",
      description: "25% chance to stun enemies hit for 2 seconds."
    }
  },
  orihemi: {
    stats: { damage: 350, defense: 1.2, health: 3500, speed: 5 },
    ability: {
      title: "Soten Kisshun",
      description: "Heals the ally with the lowest health"
    }
  },
  truck: { stats: { damage: 385, defense: 1.18, health: 2800, speed: 1.1 } },
  sakuna: { stats: { damage: 250, defense: 1.25, health: 2100, speed: 0.75 } },
  erwon: {
    stats: { damage: 400, defense: 1.25, health: 1000, speed: 2 },
    ability: {
      title: "Advance",
      description: "Raises allies attack for 10 seconds"
    }
  },
  grimmick: {
    stats: { damage: 500, defense: 1.25, health: 7200, speed: 1.3 },
    ability: {
      title: "The Knock of Panama",
      description: "Each attack causes knockback on enemies in range!"
    }
  },
  goji: { stats: { damage: 250, defense: 1.25, health: 2100, speed: 0.8 } },
  brakura: { stats: { damage: 2000, defense: 1.25, health: 5800, speed: 1 } },
  wise: { stats: { damage: 2600, defense: 1.25, health: 14000, speed: 4 } },
  zero: { stats: { damage: 30, defense: 1.15, health: 320, speed: 2 } },
  mika: { stats: { damage: 44, defense: 1.1, health: 620, speed: 1 } },
  itadoro: { stats: { damage: 10, defense: 1.12, health: 620, speed: 1 } },
  nonomi: { stats: { damage: 950, defense: 1.5, health: 10000, speed: 0.7 } },
  noruto: { stats: { damage: 200, defense: 1.25, health: 2500, speed: 1 } },
  bon: { stats: { damage: 55, defense: 1.18, health: 2465, speed: 1 } },
  picurro: { stats: { damage: 200, defense: 1.2, health: 1215, speed: 1 } },
  manji: { stats: { damage: 115, defense: 1.2, health: 1105, speed: 1 } },
  tanjuro: { stats: { damage: 95, defense: 1.1, health: 1063, speed: 1 } },
  got: { stats: { damage: 80, defense: 1.25, health: 2805, speed: 1.25 } },
  rinnju: { stats: { damage: 105, defense: 1.15, health: 1300, speed: 1 } },
  shinrat: { stats: { damage: 65, defense: 1.17, health: 1870, speed: 1 } },
  keririn: { stats: { damage: 15, defense: 1.1, health: 240, speed: 1 } },
  luppi: { stats: { damage: 18, defense: 1.1, health: 250, speed: 1 } },
  janwoo: { stats: { damage: 58, defense: 1.1, health: 750, speed: 1 } },
  mobi: { stats: { damage: 52, defense: 1.1, health: 430, speed: 1.2 } },
  sukora: { stats: { damage: 10, defense: 1.13, health: 900, speed: 1 } },
  goke: { stats: { damage: 42, defense: 1, health: 600, speed: 1.1 } },
};

function applyOverrides(units: UnitDetails[]) {
  return units.map((unit) => {
    const override = KNOWN_DETAIL_OVERRIDES[unit.id];
    return override ? { ...unit, ...override } : unit;
  });
}

export const UNIT_DETAILS: UnitDetails[] = [
  ...applyOverrides(LIMITED_UNITS),
  ...applyOverrides(GOD_UNITS),
  ...applyOverrides(SECRET_UNITS),
  ...applyOverrides(MYTHIC_UNITS),
  ...applyOverrides(LEGENDARY_UNITS),
  ...applyOverrides(RARE_UNITS),
  ...applyOverrides(EPIC_UNITS),
  ...applyOverrides(COMMON_UNITS),
];

export function getDetailsById(id: string): UnitDetails | undefined {
  return UNIT_DETAILS.find((detail) => detail.id === id);
}
