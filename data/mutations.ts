export type Mutation = {
  name: string;
  damage: string;
  health: string;
  defense?: string;
  speed?: string;
  color: string;
};

export const MUTATIONS: Mutation[] = [
  { name: "Gold", damage: "+50%", health: "+25%", color: "#facc15" },
  { name: "Diamond", damage: "+125%", health: "+50%", color: "#7dd3fc" },
  { name: "Demon", damage: "+200%", health: "+75%", color: "#f87171" },
  { name: "Destroyer", damage: "+275%", health: "+100%", color: "#fb923c" },
  { name: "Hollow", damage: "+350%", health: "+125%", color: "#c4b5fd" },
  { name: "Slayer", damage: "+550%", health: "+250%", color: "#f59e0b" },
  { name: "Cursed", damage: "x6.5", health: "x2.75", defense: "x1.075", speed: "x1", color: "#a855f7" },
  { name: "Astronaut", damage: "+650%", health: "+250%", color: "#a5f3fc" },
];

export const MUTATION_EVENT_INTERVAL_MINUTES = 15;
