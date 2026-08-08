import Link from "next/link";
import { TutorialSectionShell } from "@/components/TutorialSectionShell";
import { getUnitByName } from "@/data/units";

const EVOLUTION_UNITS = [
  { displayName: "Goji Shinjuku", alias: "Goji" },
  { displayName: "Yujo Timeskip", alias: "Yugi" },
  { displayName: "Sakuna (Heian)", alias: "Sakuna" },
];

const RECIPES = [
  {
    name: "Goji Shinjuku",
    requirements: [
      "10 Legendary Goji",
      "10 Six Eyes (normal sources)",
      "5 God Essence",
    ],
    note: "Evolve the god variant of Goji using Legendary units and common evolution materials.",
  },
  {
    name: "Sakuna (Heian)",
    requirements: [
      "10 Legendary Sakuna",
      "10 Cursed Fingers (Infinite Tower wave 75+)",
      "5 God Essence",
    ],
    note: "Sakuna evolution is tied to late Infinite Tower rewards and God Essence.",
  },
  {
    name: "Yujo Timeskip",
    requirements: [
      "10 Itadoro (Commons)",
      "10 Sakuna Fragments (Infinite Tower wave 75+)",
      "10 Cursed Wombs (Infinite Tower wave 100+)",
    ],
    note: "Yujo uses more basic commons and harder Infinite Tower materials.",
  },
];

const RELEVANT_LINKS = [
  {
    title: "Infinite Tower Guide",
    href: "/tutorial/infinite-tower",
    description: "Find Cursed Finger and Cursed Womb sources at wave 75 and wave 100.",
  },
  {
    title: "Mutation Guide",
    href: "/tutorial/mutations",
    description: "Review mutation options that pair well with evolved god units.",
  },
];

function UnitCard({ name, alias }: { name: string; alias: string }) {
  const unit = getUnitByName(name);
  const stats = unit?.stats;

  return (
    <div className="rounded-3xl border border-ink-line/80 bg-ink-surface p-6 shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-text-faint">{alias}</p>
          <h2 className="mt-2 text-2xl font-black tracking-[0.06em] text-text">{name}</h2>
        </div>
        <Link
          href={unit ? `/cards/${unit.id}` : "/cards"}
          className="rounded-full border border-ink-line bg-white/5 px-4 py-2 text-sm font-semibold text-text transition hover:bg-white/10"
        >
          View card
        </Link>
      </div>

      {stats ? (
        <div className="mt-5 grid gap-2 rounded-3xl border border-ink-line/60 bg-ink p-4">
          <div className="flex items-center justify-between text-sm text-text-faint">
            <span>Damage</span>
            <span>{stats.damage ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-text-faint">
            <span>Health</span>
            <span>{stats.health ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-text-faint">
            <span>Defense</span>
            <span>{stats.defense ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-text-faint">
            <span>Speed</span>
            <span>{stats.speed ?? "—"}</span>
          </div>
        </div>
      ) : (
        <p className="mt-5 text-sm text-text-dim">No stats available for this unit in the current dataset.</p>
      )}

      {unit?.ability ? (
        <div className="mt-5 rounded-3xl border border-ink-line/60 bg-ink p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-text-faint">Ability</p>
          <p className="mt-2 text-sm font-semibold text-text">{unit.ability.title || "No title"}</p>
          <p className="mt-1 text-sm leading-6 text-text-dim">{unit.ability.description || "No description available."}</p>
        </div>
      ) : null}
    </div>
  );
}

export default function EvolutionMachinePage() {
  return (
    <TutorialSectionShell
      title="Evolution Machine"
      description="Learn the available god evolutions, required materials, and where to get Infinite Tower ingredients."
    >
      <div className="flex flex-col gap-10">
        <section className="grid gap-4 lg:grid-cols-3">
          {EVOLUTION_UNITS.map((unit) => (
            <UnitCard key={unit.displayName} name={unit.displayName} alias={unit.alias} />
          ))}
        </section>

        <section className="rounded-3xl border border-ink-line/80 bg-ink-surface p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-text-faint">Evolution requirements</p>
              <h2 className="text-3xl font-black tracking-[0.06em] text-text">Craft god units in the machine</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {RECIPES.map((recipe) => (
              <div key={recipe.name} className="rounded-3xl border border-ink-line/70 bg-ink p-5">
                <h3 className="text-lg font-semibold text-text">{recipe.name}</h3>
                <p className="mt-2 text-sm text-text-dim">{recipe.note}</p>
                <ul className="mt-4 space-y-2 text-sm text-text">
                  {recipe.requirements.map((requirement) => (
                    <li key={requirement} className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-ink-line/80 bg-ink-surface p-6">
          <h2 className="text-3xl font-black tracking-[0.06em] text-text">Where to get the materials</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-text-dim">
            <p>
              The Evolution Machine depends on both legendary units and Infinite Tower materials. Use the <Link href="/tutorial/infinite-tower" className="font-semibold text-red-300 underline decoration-red-500/50">Infinite Tower guide</Link> for wave 75 and wave 100 drop sources.
            </p>
            <p>
              God Essence is a rare crafting resource, while Six Eyes, Sakuna Fragments, Cursed Fingers, and Cursed Wombs all come from late-wave Infinite Tower rewards.
            </p>
            <p>
              If you want to optimize builds around these evolved gods, check the <Link href="/tutorial/mutations" className="font-semibold text-red-300 underline decoration-red-500/50">Mutation guide</Link> for the best mutation combinations.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {RELEVANT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 transition hover:border-red-400/40 hover:bg-ink-surface/95"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-text-faint">Quick link</p>
              <h3 className="mt-3 text-xl font-black text-text">{link.title}</h3>
              <p className="mt-2 text-sm text-text-dim">{link.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </TutorialSectionShell>
  );
}
