export type Gamepass = {
  name: string;
  description: string;
  price: string;
};

export const GAMEPASSES: Gamepass[] = [
  {
    name: "2x Drop",
    description: "Get 2x more chance of dropping items from enemies!",
    price: "499 Robux",
  },
  {
    name: "2x Gold",
    description: "Get 2x cash from killing enemies!",
    price: "99 Robux",
  },
  {
    name: "2x Mutation",
    description: "Get 2x mutation chance when summoning!",
    price: "149 Robux",
  },
  {
    name: "2x Luck",
    description: "Get 2x more luck to get rarer animes when summoning!",
    price: "149 Robux",
  },
  {
    name: "Super Luck",
    description: "Get 4x more luck to get rarer animes when summoning!",
    price: "249 Robux",
  },
  {
    name: "Ultra Luck",
    description: "Get 8x more luck to get rarer animes when summoning!",
    price: "499 Robux",
  },
  {
    name: "3x Speed",
    description: "Play the game at 3x speed!",
    price: "199 Robux",
  },
  {
    name: "Fast Summon",
    description: "Summon units faster!",
    price: "549 Robux",
  },
  {
    name: "VIP",
    description: "25% More Gold, 25% More Luck, VIP Title, VIP Tag, Daily Rewards.",
    price: "399 Robux",
  },
  {
    name: "2x Display",
    description: "Display 2 more units!",
    price: "29 Robux",
  },
  {
    name: "3x Display",
    description: "Display 3 more units!",
    price: "99 Robux",
  },
];

export const GAMEPASS_PRIORITY: string[] = [
  "3x Speed",
  "Fast Summon",
  "2x Mutation",
  "Ultra Luck",
  "Super Luck",
  "2x Luck",
  "2x Drop",
  "2x Gold",
  "VIP",
];

export const GAMEPASS_SOURCE_URL =
  "https://trello.com/c/kxMBTud3/13-gamepass-prioritization";
