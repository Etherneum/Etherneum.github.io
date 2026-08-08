'use client';

import { useState } from 'react';
import { TutorialSectionShell } from '@/components/TutorialSectionShell';

interface RewardTier {
  name: string;
  waves: string;
  rewards: {
    name: string;
    chance: string;
    type: 'item' | 'unit';
  }[];
  difficulty: string;
}

const rewardTiers: RewardTier[] = [
  {
    name: "Tier 1",
    waves: "Waves 1-24",
    difficulty: "Easy",
    rewards: [
      { name: "Gold Potion", chance: "0.25%", type: "item" },
      { name: "Big Gold Pot", chance: "0.25%", type: "item" },
      { name: "Luck Pot", chance: "0.25%", type: "item" },
      { name: "Big Luck Pot", chance: "0.25%", type: "item" },
    ]
  },
  {
    name: "Boss Wave",
    waves: "Wave 25",
    difficulty: "Boss",
    rewards: [
      { name: "Gold Potion", chance: "0.25%", type: "item" },
      { name: "Big Gold Pot", chance: "0.25%", type: "item" },
      { name: "Luck Pot", chance: "0.25%", type: "item" },
      { name: "Big Luck Pot", chance: "0.25%", type: "item" },
      { name: "Yoichi", chance: "1%", type: "unit" },
    ]
  },
  {
    name: "Tier 2",
    waves: "Waves 26-49",
    difficulty: "Medium",
    rewards: [
      { name: "Gold Potion", chance: "0.25%", type: "item" },
      { name: "Big Gold Pot", chance: "0.25%", type: "item" },
      { name: "Luck Pot", chance: "0.25%", type: "item" },
      { name: "Big Luck Pot", chance: "0.25%", type: "item" },
      { name: "Time Potion", chance: "0.25%", type: "item" },
    ]
  },
  {
    name: "Boss Wave",
    waves: "Wave 50",
    difficulty: "Boss",
    rewards: [
      { name: "Gold Potion", chance: "0.25%", type: "item" },
      { name: "Big Gold Pot", chance: "0.25%", type: "item" },
      { name: "Luck Pot", chance: "0.25%", type: "item" },
      { name: "Big Luck Pot", chance: "0.25%", type: "item" },
      { name: "Time Potion", chance: "0.25%", type: "item" },
      { name: "Shancks", chance: "1%", type: "unit" },
    ]
  },
  {
    name: "Tier 3",
    waves: "Waves 51-74",
    difficulty: "Hard",
    rewards: [
      { name: "Gold Potion", chance: "0.25%", type: "item" },
      { name: "Big Gold Pot", chance: "0.25%", type: "item" },
      { name: "Luck Pot", chance: "0.25%", type: "item" },
      { name: "Big Luck Pot", chance: "0.25%", type: "item" },
      { name: "Time Potion", chance: "0.25%", type: "item" },
    ]
  },
  {
    name: "Boss Wave",
    waves: "Wave 75",
    difficulty: "Boss",
    rewards: [
      { name: "Gold Potion", chance: "0.25%", type: "item" },
      { name: "Big Gold Pot", chance: "0.25%", type: "item" },
      { name: "Luck Pot", chance: "0.25%", type: "item" },
      { name: "Big Luck Pot", chance: "0.25%", type: "item" },
      { name: "Time Potion", chance: "0.25%", type: "item" },
      { name: "Ains", chance: "1%", type: "unit" },
    ]
  },
  {
    name: "Tier 4",
    waves: "Waves 76-99",
    difficulty: "Very Hard",
    rewards: [
      { name: "Gold Potion", chance: "0.25%", type: "item" },
      { name: "Big Gold Pot", chance: "0.25%", type: "item" },
      { name: "Luck Pot", chance: "0.25%", type: "item" },
      { name: "Big Luck Pot", chance: "0.25%", type: "item" },
      { name: "Time Potion", chance: "0.25%", type: "item" },
      { name: "Super Big Time Potion", chance: "0.02%", type: "item" },
      { name: "Cursed Fragment", chance: "0.02%", type: "item" },
      { name: "Cursed Finger", chance: "0.02%", type: "item" },
    ]
  },
  {
    name: "Boss Wave",
    waves: "Wave 100",
    difficulty: "Boss",
    rewards: [
      { name: "Gold Potion", chance: "0.25%", type: "item" },
      { name: "Big Gold Pot", chance: "0.25%", type: "item" },
      { name: "Luck Pot", chance: "0.25%", type: "item" },
      { name: "Big Luck Pot", chance: "0.25%", type: "item" },
      { name: "Time Potion", chance: "0.25%", type: "item" },
      { name: "Super Big Time Potion", chance: "0.02%", type: "item" },
      { name: "Cursed Fragment", chance: "0.02%", type: "item" },
      { name: "Cursed Finger", chance: "0.02%", type: "item" },
      { name: "Sakuna Heian", chance: "1%", type: "unit" },
    ]
  },
  {
    name: "Tier 5",
    waves: "Waves 101-124",
    difficulty: "Extreme",
    rewards: [
      { name: "Gold Potion", chance: "0.25%", type: "item" },
      { name: "Big Gold Pot", chance: "0.25%", type: "item" },
      { name: "Luck Pot", chance: "0.25%", type: "item" },
      { name: "Big Luck Pot", chance: "0.25%", type: "item" },
      { name: "Time Potion", chance: "0.25%", type: "item" },
      { name: "Super Big Time Potion", chance: "0.02%", type: "item" },
      { name: "Cursed Fragment", chance: "0.02%", type: "item" },
      { name: "Cursed Finger", chance: "0.02%", type: "item" },
      { name: "Cursed Womb", chance: "0.02%", type: "item" },
    ]
  },
];

export default function InfiniteTowerPage() {
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set([0]));
  const [selectedTierFilter, setSelectedTierFilter] = useState<string | null>(null);

  const toggleExpanded = (index: number) => {
    const newSet = new Set(expandedIndices);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedIndices(newSet);
  };

  const filteredTiers = selectedTierFilter 
    ? rewardTiers.filter(tier => tier.name === selectedTierFilter || tier.name === "Boss Wave")
    : rewardTiers;

  return (
    <TutorialSectionShell
      title="Infinite Tower"
      description="Progress through endless waves and defeat boss units to earn powerful rewards. This mode is super hard without META tier units!"
    >
      <div className="flex flex-col gap-8">
        {/* Warning Section */}
        <div className="rounded-2xl border border-rarity-god/30 bg-rarity-god/5 p-6">
          <p className="text-sm font-semibold text-rarity-god flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <span>This mode is extremely challenging without META tier units. Strong units like Sakuna (Heian), Ais, Wise, Aisen Divine, and others are essential for progressing beyond wave 50.</span>
          </p>
        </div>

        {/* Difficulty Filter */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-text-faint font-semibold mb-3">Filter by tier</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTierFilter(null)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                selectedTierFilter === null
                  ? 'bg-rarity-legendary text-text'
                  : 'bg-ink border border-ink-line text-text hover:bg-ink-surface'
              }`}
            >
              All Tiers
            </button>
            {[1, 2, 3, 4, 5].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTierFilter(`Tier ${tier}`)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  selectedTierFilter === `Tier ${tier}`
                    ? 'bg-rarity-legendary text-text'
                    : 'bg-ink border border-ink-line text-text hover:bg-ink-surface'
                }`}
              >
                Tier {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="space-y-3">
          {filteredTiers.map((tier, index) => {
            const originalIndex = rewardTiers.indexOf(tier);
            const isExpanded = expandedIndices.has(originalIndex);

            return (
              <div
                key={originalIndex}
                className="rounded-2xl border border-ink-line bg-ink-surface overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleExpanded(originalIndex)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-ink-surface2 transition-colors text-left group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-display text-lg font-black">{tier.name}</p>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        tier.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-200' :
                        tier.difficulty === 'Medium' ? 'bg-cyan-500/20 text-cyan-200' :
                        tier.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-200' :
                        tier.difficulty === 'Very Hard' ? 'bg-red-500/20 text-red-200' :
                        tier.difficulty === 'Extreme' ? 'bg-fuchsia-500/20 text-fuchsia-200' :
                        'bg-amber-500/20 text-amber-200'
                      }`}>
                        {tier.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-text-faint mt-2">{tier.waves}</p>
                  </div>
                  <div className="text-3xl text-text-faint group-hover:text-text transition-colors">
                    {isExpanded ? '−' : '+'}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-ink-line px-6 py-5 bg-ink">
                    <div className="space-y-4">
                      {tier.rewards.map((reward, rewardIndex) => (
                        <div key={rewardIndex} className="flex items-center justify-between group hover:bg-ink-surface/50 px-3 py-2 rounded-lg transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{reward.type === 'unit' ? '⭐' : '💎'}</span>
                            <p className="text-text font-semibold">{reward.name}</p>
                          </div>
                          <p className="font-mono text-sm font-bold px-3 py-1 rounded-full bg-ink-surface/70 text-rarity-limited">
                            {reward.chance}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tips Section */}
        <div className="rounded-2xl border border-ink-line bg-ink-surface p-6">
          <h2 className="font-display text-xl font-black mb-4">Strategy Tips</h2>
          <ul className="space-y-3 text-sm text-text">
            <li className="flex gap-3">
              <span>🎯</span>
              <span><strong>Use META units:</strong> Strong god tier units are essential. Prioritize units like Sakuna (Heian), Ais, Wise, and Aisen Divine.</span>
            </li>
            <li className="flex gap-3">
              <span>📊</span>
              <span><strong>Boss waves at 25, 50, 75, 100:</strong> These offer rare unit drops (1% chance). Build your team to handle these battles.</span>
            </li>
            <li className="flex gap-3">
              <span>💰</span>
              <span><strong>Loot management:</strong> Early tiers provide basic potions. Later tiers introduce cursed items and time potions.</span>
            </li>
            <li className="flex gap-3">
              <span>⏰</span>
              <span><strong>Time potion value:</strong> Time potions appear from wave 26+ and become crucial for progression.</span>
            </li>
            <li className="flex gap-3">
              <span>🪦</span>
              <span><strong>Cursed items:</strong> Available from wave 76+. These rare items are valuable but challenging to obtain.</span>
            </li>
          </ul>
        </div>
      </div>
    </TutorialSectionShell>
  );
}
