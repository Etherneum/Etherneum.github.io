"use client";

import { useState } from "react";
import { TutorialSectionShell } from "@/components/TutorialSectionShell";

type TabKey = "shop" | "quests" | "how-to-succeed";

const SHOP_ITEMS = [
  { item: "God Capsule", price: "40 Gems", stock: "15" },
  { item: "Mythic Capsule", price: "20 Gems", stock: "15" },
  { item: "Secret Capsule", price: "28 Gems", stock: "15" },
  { item: "Trait Shard", price: "1 Gem", stock: "1,000" },
  { item: "God Essence", price: "7 Gems", stock: "100" },
  { item: "Secret Essence", price: "6 Gems", stock: "100" },
  { item: "Mythic Essence", price: "4 Gems", stock: "100" },
  { item: "Legendary Essence", price: "3 Gems", stock: "100" },
  { item: "Time Potion", price: "2 Gems", stock: "100" },
  { item: "Super Time Potion", price: "4 Gems", stock: "100" },
  { item: "Luck Potion", price: "2 Gems", stock: "100" },
  { item: "Super Luck Potion", price: "4 Gems", stock: "100" },
  { item: "Gold Potion", price: "2 Gems", stock: "100" },
  { item: "Super Gold Potion", price: "4 Gems", stock: "100" },
];

const QUESTS = [
  { task: "Play for 90 minutes", reward: "100 Gems" },
  { task: "Kill 50,000 enemies", reward: "100 Gems" },
  { task: "Deal 100,000,000 damage", reward: "100 Gems" },
  { task: "Roll 350 anime units", reward: "100 Gems" },
];

const SUCCESS_TIPS = [
  "Do your daily quests every day to keep progress steady and avoid missing easy rewards.",
  "Optimize your route to earn points faster by focusing on the highest-value actions that fit your current build.",
  "The team that wins receives a special limited-time name that remains visible for a much longer period than the event itself, so every match matters.",
];

const tabs: { key: TabKey; label: string }[] = [
  { key: "shop", label: "SHOP" },
  { key: "quests", label: "QUESTS" },
  { key: "how-to-succeed", label: "HOW TO SUCCEED" },
];

export default function OrderVsChaosPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("shop");

  return (
    <TutorialSectionShell
      title="Order vs Chaos"
      description="A limited-time event built around a dedicated shop, daily progression quests, and a competitive team reward."
    >
      <section className="rounded-3xl border border-ink-line/70 bg-ink-surface p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Limited time event</p>
            <h2 className="mt-3 font-display text-2xl font-black">Compete, farm, and unlock the event shop</h2>
            <p className="mt-4 text-sm leading-7 text-text-dim">
              Order vs Chaos gives players a focused event loop with a premium shop, clear quests, and a long-lasting team reward for the winning side.
            </p>
          </div>
          <div className="rounded-2xl border border-ink-line/70 bg-ink p-4 text-sm text-text-dim">
            <p className="font-semibold text-text">Event goal</p>
            <p className="mt-2">Push your team to the top by completing quests and maximizing your point gain.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "border border-ink-line/70 bg-ink text-text hover:border-red-400/30 hover:text-red-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "shop" ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-ink-line/70 bg-ink">
            <div className="grid grid-cols-[minmax(200px,1.8fr)_120px_100px] border-b border-ink-line/70 bg-ink-surface/80 text-sm font-semibold uppercase tracking-[0.24em] text-text-faint">
              <div className="px-4 py-3">Item</div>
              <div className="border-l border-ink-line/70 px-4 py-3">Price</div>
              <div className="border-l border-ink-line/70 px-4 py-3">Stock</div>
            </div>
            <div className="divide-y divide-ink-line/70">
              {SHOP_ITEMS.map((item) => (
                <div key={item.item} className="grid grid-cols-[minmax(200px,1.8fr)_120px_100px] text-sm">
                  <div className="px-4 py-3 text-text">{item.item}</div>
                  <div className="border-l border-ink-line/70 px-4 py-3 text-text-dim">{item.price}</div>
                  <div className="border-l border-ink-line/70 px-4 py-3 text-text-dim">{item.stock}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "quests" ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {QUESTS.map((quest) => (
              <div key={quest.task} className="rounded-2xl border border-ink-line/70 bg-ink p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-text-faint">Quest</p>
                <h3 className="mt-3 font-display text-xl font-black text-text">{quest.task}</h3>
                <p className="mt-3 text-sm text-text-dim">Reward: {quest.reward}</p>
              </div>
            ))}
          </div>
        ) : null}

        {activeTab === "how-to-succeed" ? (
          <div className="mt-8 rounded-2xl border border-ink-line/70 bg-ink p-6">
            <h3 className="font-display text-xl font-black text-text">How to succeed</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-text-dim">
              {SUCCESS_TIPS.map((tip) => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </TutorialSectionShell>
  );
}
