"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { MUTATIONS } from "@/data/mutations";
import { TRAIT_TIERS } from "@/data/traits";
import { UNITS, type Unit } from "@/data/units";
import {
  DEFAULT_MODIFIER_BONUSES,
  getUnitDisplayValue,
  type ModifierBonuses,
  type ModifierSettings,
} from "@/data/unitValues";

type TradeMode = "value" | "calculator";
type Slot = {
  unitId: string | null;
  mutation: string | null;
  trait: string | null;
  level: number;
};

type ModalType = "unit" | "modifier" | null;

const SLOT_COUNT = 6;
const MAX_LEVEL = 7;
const UNDER_CONSTRUCTION = true;

function getAdjustedValue(slot: Slot, units: Unit[], bonuses: ModifierBonuses = DEFAULT_MODIFIER_BONUSES) {
  const unit = slot.unitId ? units.find((entry) => entry.id === slot.unitId) ?? null : null;
  const base = unit ? getUnitDisplayValue(unit, units, { mutation: slot.mutation, trait: slot.trait, level: slot.level }, bonuses) : 0;
  return base;
}

const TRADE_COPY = {
  en: {
    title: "Trades",
    intro: "Track values, compare offers, and build trade setups with mutation, trait, and level modifiers.",
    underConstructionTitle: "🚧 Under construction 🚧",
    underConstructionBody: "Trade values are temporarily hidden while this feature is being updated.",
    tradeValue: "Trade Value",
    tradeValueBody: "Browse units with their current value and keep a simple tracker ready for trade talks.",
    unavailable: "Unavailable for now",
    tradeCalculator: "Trade Calculator",
    tradeCalculatorBody: "Build a full package of units for each side and calculate whether the trade is fair.",
    valueTracker: "Value tracker",
    valueTrackerBody: "Each unit card shows its image, name, and value estimate so you can compare quickly.",
    valuesHidden: "Values hidden",
    selectUnits: "Select units and calculate",
    balancedTrade: "Balanced trade",
    iGive: "I Give",
    iGet: "I Get",
    upToSix: "Up to 6 units",
    noImage: "No image",
    noMutation: "No mutation",
    result: "Result",
    valuesHiddenWhileConstructing: "Values are hidden while this page is under construction.",
    editModifiers: "Edit modifier value",
    editSelectedSlot: "Edit selected slot",
    modifierValues: "Modifier values",
    none: "None",
    calculate: "Calculate",
    calculateAgain: "Calculate again",
    apply: "Apply",
    save: "Save",
    clear: "Clear",
    chooseUnit: "Choose unit",
    adjustModifiers: "Adjust modifiers",
    youGive: "You give",
    youGet: "You get",
    difference: "Difference",
    type: "Type",
    mutation: "Mutation",
    value: "Value",
    trait: "Trait",
    level: "Level",
    buildBothSides: "Build both sides, then calculate to see whether the deal leans toward a loss or gain.",
  },
  es: {
    title: "Intercambios",
    intro: "Controla valores, compara ofertas y arma montajes de intercambio con modificadores de mutación, trait y nivel.",
    underConstructionTitle: "🚧 En construcción 🚧",
    underConstructionBody: "Los valores de intercambio están ocultos temporalmente mientras se actualiza esta función.",
    tradeValue: "Valor de intercambio",
    tradeValueBody: "Navega por las unidades con su valor actual y mantén un rastreador simple listo para hablar de intercambios.",
    unavailable: "No disponible por ahora",
    tradeCalculator: "Calculadora de intercambios",
    tradeCalculatorBody: "Construye un paquete completo de unidades para cada lado y calcula si el intercambio es justo.",
    valueTracker: "Rastreador de valores",
    valueTrackerBody: "Cada tarjeta de unidad muestra su imagen, nombre y estimación de valor para compararlas rápido.",
    valuesHidden: "Valores ocultos",
    selectUnits: "Selecciona unidades y calcula",
    balancedTrade: "Intercambio equilibrado",
    iGive: "Yo doy",
    iGet: "Yo recibo",
    upToSix: "Hasta 6 unidades",
    noImage: "Sin imagen",
    noMutation: "Sin mutación",
    result: "Resultado",
    valuesHiddenWhileConstructing: "Los valores están ocultos mientras esta página está en construcción.",
    editModifiers: "Editar valor del modificador",
    editSelectedSlot: "Editar espacio seleccionado",
    modifierValues: "Valores de modificadores",
    none: "Ninguno",
    calculate: "Calcular",
    calculateAgain: "Calcular de nuevo",
    apply: "Aplicar",
    save: "Guardar",
    clear: "Borrar",
    chooseUnit: "Elegir unidad",
    adjustModifiers: "Ajustar modificadores",
    youGive: "Tú das",
    youGet: "Tú recibes",
    difference: "Diferencia",
    type: "Tipo",
    mutation: "Mutación",
    value: "Valor",
    trait: "Trait",
    level: "Nivel",
    buildBothSides: "Construye ambos lados y luego calcula para ver si el trato se inclina hacia una pérdida o una ganancia.",
  },
};

function getLossLabel(percent: number, language: "en" | "es") {
  if (percent <= 10) return language === "es" ? "Pérdida menor" : "Minor loss";
  if (percent <= 20) return language === "es" ? "Pérdida media" : "Mid loss";
  return language === "es" ? "Pérdida mayor" : "Major loss";
}

function getGainLabel(percent: number, language: "en" | "es") {
  if (percent <= 10) return language === "es" ? "Ganancia menor" : "Minor gain";
  if (percent <= 20) return language === "es" ? "Ganancia media" : "Mid gain";
  return language === "es" ? "Ganancia mayor" : "Major gain";
}

export default function TradesPage() {
  const [mode, setMode] = useState<TradeMode>("calculator");
  const [giveSlots, setGiveSlots] = useState<Slot[]>(() => Array.from({ length: SLOT_COUNT }, () => ({ unitId: null, mutation: null, trait: null, level: 1 })));
  const [getSlots, setGetSlots] = useState<Slot[]>(() => Array.from({ length: SLOT_COUNT }, () => ({ unitId: null, mutation: null, trait: null, level: 1 })));
  const [modalState, setModalState] = useState<{ type: ModalType; side: "give" | "get" | null; slotIndex: number | null }>({ type: null, side: null, slotIndex: null });
  const [selectedSlot, setSelectedSlot] = useState<{ side: "give" | "get"; slotIndex: number } | null>(null);
  const [draft, setDraft] = useState<Slot>({ unitId: null, mutation: null, trait: null, level: 1 });
  const [showResult, setShowResult] = useState(false);
  const [catalogUnits, setCatalogUnits] = useState<Unit[]>([]);
  const [valueListModifier, setValueListModifier] = useState<ModifierSettings>({ mutation: null, trait: null, level: 1 });
  const [modifierBonuses] = useState<ModifierBonuses>(DEFAULT_MODIFIER_BONUSES);
  const [modifierPanelOpen, setModifierPanelOpen] = useState(false);
  const [modifierDraft, setModifierDraft] = useState<ModifierSettings>({ mutation: null, trait: null, level: 1 });
  const { language } = useLanguage();
  const copy = TRADE_COPY[language];

  useEffect(() => {
    let cancelled = false;
    fetch("/cards/list.json")
      .then((response) => response.json())
      .then((data: Unit[]) => {
        if (!cancelled) {
          setCatalogUnits(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCatalogUnits([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const availableUnits = useMemo(() => {
    const lookup = new Map(UNITS.map((unit) => [unit.id, unit]));
    catalogUnits.forEach((unit) => {
      lookup.set(unit.id, { ...(lookup.get(unit.id) ?? {}), ...unit });
    });
    return Array.from(lookup.values()).sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  }, [catalogUnits]);

  const getSlotValue = (slot: Slot) => {
    return getAdjustedValue(slot, availableUnits, modifierBonuses);
  };

  const giveTotal = useMemo(() => giveSlots.reduce((sum, slot) => sum + getSlotValue(slot), 0), [giveSlots, availableUnits, modifierBonuses]);
  const getTotal = useMemo(() => getSlots.reduce((sum, slot) => sum + getSlotValue(slot), 0), [getSlots, availableUnits, modifierBonuses]);
  const difference = useMemo(() => {
    if (!giveTotal || !getTotal) return 0;
    return ((getTotal - giveTotal) / giveTotal) * 100;
  }, [giveTotal, getTotal]);

  const summary = useMemo(() => {
    if (!showResult) return copy.selectUnits;
    if (difference === 0) return copy.balancedTrade;
    if (difference > 0) return `${getGainLabel(Math.abs(difference), language)} (${Math.abs(difference).toFixed(1)}%)`;
    return `${getLossLabel(Math.abs(difference), language)} (${Math.abs(difference).toFixed(1)}%)`;
  }, [difference, showResult, copy, language]);

  const getSlotState = (side: "give" | "get", slotIndex: number) => {
    return side === "give" ? giveSlots[slotIndex] : getSlots[slotIndex];
  };

  const openUnitPicker = (side: "give" | "get", slotIndex: number) => {
    const current = getSlotState(side, slotIndex);
    setSelectedSlot({ side, slotIndex });
    setDraft(current ?? { unitId: null, mutation: null, trait: null, level: 1 });
    setModalState({ type: "unit", side, slotIndex });
  };

  const openModifierEditor = (side: "give" | "get", slotIndex: number) => {
    const current = getSlotState(side, slotIndex);
    setSelectedSlot({ side, slotIndex });
    setDraft(current ?? { unitId: null, mutation: null, trait: null, level: 1 });
    setModalState({ type: "modifier", side, slotIndex });
  };

  const saveSlot = () => {
    if (!selectedSlot) return;
    const next = selectedSlot.side === "give" ? [...giveSlots] : [...getSlots];
    next[selectedSlot.slotIndex] = { ...draft };
    if (selectedSlot.side === "give") setGiveSlots(next);
    else setGetSlots(next);
    setModalState({ type: null, side: null, slotIndex: null });
    setSelectedSlot(null);
    setShowResult(false);
  };

  const clearSlot = () => {
    if (!selectedSlot) return;
    const next = selectedSlot.side === "give" ? [...giveSlots] : [...getSlots];
    next[selectedSlot.slotIndex] = { unitId: null, mutation: null, trait: null, level: 1 };
    if (selectedSlot.side === "give") setGiveSlots(next);
    else setGetSlots(next);
    setModalState({ type: null, side: null, slotIndex: null });
    setSelectedSlot(null);
    setShowResult(false);
  };

  const selectUnit = (unitId: string) => {
    if (!selectedSlot) return;
    setDraft((prev) => ({ ...prev, unitId }));
    setModalState({ type: "modifier", side: selectedSlot.side, slotIndex: selectedSlot.slotIndex });
  };

  const applyModifierPreset = () => {
    setValueListModifier(modifierDraft);
    setModifierPanelOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-4xl font-black tracking-[0.08em] text-text sm:text-5xl">{copy.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-text-faint">{copy.intro}</p>
      </div>

      <div className="rounded-[2rem] border border-amber-400/35 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-rose-500/10 p-6 text-center shadow-[0_24px_70px_-30px_rgba(251,146,60,0.4)]">
        <p className="text-4xl font-black uppercase tracking-[0.35em] text-amber-300 sm:text-5xl">{copy.underConstructionTitle}</p>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-200/90">{copy.underConstructionBody}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <button
          onClick={() => setMode("value")}
          disabled={UNDER_CONSTRUCTION}
          className={`rounded-[1.5rem] border p-6 text-left transition-all duration-300 ${mode === "value" ? "border-amber-400/40 bg-gradient-to-br from-amber-500/12 via-orange-500/8 to-transparent shadow-[0_18px_45px_-24px_rgba(251,146,60,0.35)]" : "border-white/10 bg-white/5 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.45)]"} ${UNDER_CONSTRUCTION ? "cursor-not-allowed opacity-75" : "hover:-translate-y-0.5"}`}
        >
          <h2 className="font-display text-2xl font-black">{copy.tradeValue}</h2>
          <p className="mt-2 text-sm text-text-faint">{copy.tradeValueBody}</p>
          {UNDER_CONSTRUCTION && <p className="mt-3 text-sm font-semibold text-amber-400">{copy.unavailable}</p>}
        </button>
        <button
          onClick={() => setMode("calculator")}
          className={`rounded-[1.5rem] border p-6 text-left transition-all duration-300 ${mode === "calculator" ? "border-amber-300/40 bg-gradient-to-br from-orange-500/12 via-amber-500/8 to-transparent shadow-[0_18px_45px_-24px_rgba(251,146,60,0.35)]" : "border-white/10 bg-white/5 shadow-[0_12px_30px_-24px_rgba(0,0,0,0.45)]"}`}
        >
          <h2 className="font-display text-2xl font-black">{copy.tradeCalculator}</h2>
          <p className="mt-2 text-sm text-text-faint">{copy.tradeCalculatorBody}</p>
        </button>
      </div>

      {mode === "value" ? (
        <div className="relative">
          <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-amber-500/8 p-6 shadow-[0_24px_70px_-36px_rgba(0,0,0,0.5)]">
            <h3 className="font-display text-xl font-black">{copy.valueTracker}</h3>
            <p className="mt-2 text-sm text-text-faint">{copy.valueTrackerBody}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {availableUnits.map((unit) => {
                const value = getUnitDisplayValue(unit, availableUnits, valueListModifier, modifierBonuses);
                return (
                  <div key={unit.id} className="rounded-xl border border-ink-line/70 p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-ink-line/70 bg-ink">
                        {unit.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={unit.image} alt={unit.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-text-faint">{copy.noImage}</div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="truncate font-semibold text-text">{unit.name}</h4>
                        <p className="text-xs uppercase tracking-[0.2em] text-text-faint">{unit.rarity}</p>
                      </div>
                    </div>
                    <div className="mt-3 rounded-lg bg-ink px-3 py-2 text-sm text-text-faint">
                      {UNDER_CONSTRUCTION ? (
                        <span className="font-semibold text-amber-400">{copy.valuesHidden}</span>
                      ) : (
                        <>
                          Value: <span className="font-semibold text-text">{value}</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-orange-500/8 p-6 shadow-[0_24px_70px_-36px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-black">{copy.iGive}</h3>
              <span className="text-sm text-text-faint">{copy.upToSix}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {giveSlots.map((slot, index) => {
                const unit = slot.unitId ? availableUnits.find((entry) => entry.id === slot.unitId) : null;
                const adjusted = getAdjustedValue(slot, availableUnits);
                return (
                  <button
                    key={`give-${index}`}
                    onClick={() => openUnitPicker("give", index)}
                    className="rounded-xl border border-ink-line/70 bg-ink p-3 text-left"
                  >
                    {unit ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-12 w-12 overflow-hidden rounded-lg border border-ink-line/70 bg-ink-surface">
                            {unit.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={unit.image} alt={unit.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] text-text-faint">img</div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-text">{unit.name}</p>
                            <p className="text-xs text-text-faint">{slot.mutation ?? "No mutation"}</p>
                          </div>
                        </div>
                        <div className="text-xs text-text-faint">
                          Trait: {slot.trait ?? "None"} • Level: {slot.level} • {UNDER_CONSTRUCTION ? "Values hidden" : `Value: ${adjusted}`}
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-24 items-center justify-center text-3xl text-text-faint">+</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-orange-500/8 p-6 shadow-[0_24px_70px_-36px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-xl font-black">{copy.iGet}</h3>
              <span className="text-sm text-text-faint">{copy.upToSix}</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {getSlots.map((slot, index) => {
                const unit = slot.unitId ? availableUnits.find((entry) => entry.id === slot.unitId) : null;
                const adjusted = getAdjustedValue(slot, availableUnits);
                return (
                  <button
                    key={`get-${index}`}
                    onClick={() => openUnitPicker("get", index)}
                    className="rounded-xl border border-ink-line/70 bg-ink p-3 text-left"
                  >
                    {unit ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-12 w-12 overflow-hidden rounded-lg border border-ink-line/70 bg-ink-surface">
                            {unit.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={unit.image} alt={unit.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] text-text-faint">img</div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-text">{unit.name}</p>
                            <p className="text-xs text-text-faint">{slot.mutation ?? "No mutation"}</p>
                          </div>
                        </div>
                        <div className="text-xs text-text-faint">
                          Trait: {slot.trait ?? "None"} • Level: {slot.level} • {UNDER_CONSTRUCTION ? "Values hidden" : `Value: ${adjusted}`}
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-24 items-center justify-center text-3xl text-text-faint">+</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="xl:col-span-2 rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-amber-500/10 p-6 shadow-[0_24px_70px_-36px_rgba(0,0,0,0.5)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-black">{copy.result}</h3>
                <p className="mt-2 text-sm text-text-faint">{copy.buildBothSides}</p>
              </div>
              <button
                onClick={() => setShowResult(true)}
                className="rounded-full border border-rarity-legendary px-4 py-2 text-sm font-semibold text-rarity-legendary"
              >
                {copy.calculate}
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-ink-line/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">{copy.youGive}</p>
                <p className="mt-2 text-2xl font-semibold text-text">{UNDER_CONSTRUCTION ? "—" : giveTotal}</p>
              </div>
              <div className="rounded-lg border border-ink-line/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">{copy.youGet}</p>
                <p className="mt-2 text-2xl font-semibold text-text">{UNDER_CONSTRUCTION ? "—" : getTotal}</p>
              </div>
              <div className="rounded-lg border border-ink-line/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-faint">{copy.difference}</p>
                <p className="mt-2 text-2xl font-semibold text-text">{UNDER_CONSTRUCTION ? "—" : showResult ? `${difference.toFixed(1)}%` : "—"}</p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-ink-line/70 bg-ink p-4 text-sm text-text-faint">
              <span className="font-semibold text-text">{copy.result}:</span> {UNDER_CONSTRUCTION ? copy.valuesHiddenWhileConstructing : summary}
            </div>
            {showResult && (
              <button onClick={() => setShowResult(false)} className="mt-4 rounded-full border border-ink-line px-4 py-2 text-sm text-text-faint">
                {copy.calculateAgain}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="sticky bottom-4 z-40 ml-0 mr-4 mt-2 flex w-fit flex-col items-end gap-2 sm:mr-5">
        <div className="relative">
          <div className="flex flex-col gap-2">
            {mode === "value" && (
              <button
                onClick={() => {
                  setModifierDraft(valueListModifier);
                  setModifierPanelOpen(true);
                }}
                className="flex h-12 items-center whitespace-nowrap rounded-full border border-rarity-legendary bg-ink-surface px-4 text-sm font-semibold text-rarity-legendary shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {copy.editModifiers}
              </button>
            )}

            {selectedSlot && (
              <button
                onClick={() => openModifierEditor(selectedSlot.side, selectedSlot.slotIndex)}
                className="flex h-12 items-center whitespace-nowrap rounded-full border border-rarity-legendary bg-ink-surface px-4 text-sm font-semibold text-rarity-legendary shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                {copy.editSelectedSlot}
              </button>
            )}
          </div>

          {modifierPanelOpen && (
            <div className="absolute bottom-full left-0 mb-3 w-[min(84vw,18rem)] max-w-[18rem] overflow-hidden rounded-2xl border border-ink-line bg-ink-surface shadow-2xl">
              <div className="flex items-center justify-between border-b border-ink-line px-4 py-3">
                <h3 className="font-display text-lg font-black">{copy.modifierValues}</h3>
                <button onClick={() => setModifierPanelOpen(false)} className="pr-1 text-2xl text-text-faint">×</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  <label className="block text-sm text-text-faint">
                    {copy.mutation}
                    <select value={modifierDraft.mutation ?? ""} onChange={(e) => setModifierDraft((prev) => ({ ...prev, mutation: e.target.value || null }))} className="mt-1 w-full rounded-lg border border-ink-line bg-ink px-3 py-2 text-sm text-text">
                      <option value="">{copy.none}</option>
                      {MUTATIONS.map((mutation) => (
                        <option key={mutation.name} value={mutation.name}>{mutation.name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm text-text-faint">
                    {copy.trait}
                    <select value={modifierDraft.trait ?? ""} onChange={(e) => setModifierDraft((prev) => ({ ...prev, trait: e.target.value || null }))} className="mt-1 w-full rounded-lg border border-ink-line bg-ink px-3 py-2 text-sm text-text">
                      <option value="">{copy.none}</option>
                      {TRAIT_TIERS.flatMap((tier) => tier.traits).map((trait) => (
                        <option key={trait.name} value={trait.name}>{trait.name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm text-text-faint">
                    {copy.level}
                    <input type="number" min="1" max={MAX_LEVEL} value={modifierDraft.level} onChange={(e) => setModifierDraft((prev) => ({ ...prev, level: Math.min(MAX_LEVEL, Math.max(1, Number(e.target.value) || 1)) }))} className="mt-1 w-full rounded-lg border border-ink-line bg-ink px-3 py-2 text-sm text-text" />
                  </label>
                </div>
              </div>
              <div className="border-t border-ink-line px-4 py-3">
                <button onClick={applyModifierPreset} className="rounded-full border border-rarity-legendary px-3 py-2 text-sm font-semibold text-rarity-legendary">{copy.apply}</button>
              </div>
            </div>
          )}

          {modalState.type && selectedSlot && (
            <div className="absolute bottom-full left-0 mb-3 w-[min(84vw,32rem)] max-w-[32rem] overflow-hidden rounded-2xl border border-ink-line bg-ink-surface shadow-2xl">
              <button onClick={() => setModalState({ type: null, side: null, slotIndex: null })} className="absolute right-3 top-3 z-10 pr-1 text-2xl text-text-faint">×</button>
              <div className="overflow-y-auto px-4 py-5 sm:px-5 sm:py-6">
                {modalState.type === "unit" ? (
                  <div>
                    <h3 className="font-display text-lg font-black">{copy.chooseUnit}</h3>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {availableUnits.map((unit) => {
                        const value = getUnitDisplayValue(unit, availableUnits);
                        return (
                          <button key={unit.id} onClick={() => selectUnit(unit.id)} className="rounded-xl border border-ink-line/70 bg-ink p-2.5 text-left">
                            <div className="flex items-center gap-2">
                              <div className="h-10 w-10 overflow-hidden rounded-lg border border-ink-line/70 bg-ink-surface">
                                {unit.image ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={unit.image} alt={unit.name} className="h-full w-full object-cover" />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-[10px] text-text-faint">img</div>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="truncate font-semibold text-text">{unit.name}</p>
                                <p className="text-xs text-text-faint">{UNDER_CONSTRUCTION ? copy.valuesHidden : `${copy.value}: ${value}`}</p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-display text-lg font-black">{copy.adjustModifiers}</h3>
                    <div className="mt-3 space-y-3">
                      <label className="block text-sm text-text-faint">
                        {copy.mutation}
                        <select value={draft.mutation ?? ""} onChange={(e) => setDraft((prev) => ({ ...prev, mutation: e.target.value || null }))} className="mt-1 w-full rounded-lg border border-ink-line bg-ink px-3 py-2 text-sm text-text">
                          <option value="">{copy.none}</option>
                          {MUTATIONS.map((mutation) => (
                            <option key={mutation.name} value={mutation.name}>{mutation.name}</option>
                          ))}
                        </select>
                      </label>
                      <label className="block text-sm text-text-faint">
                        {copy.trait}
                        <select value={draft.trait ?? ""} onChange={(e) => setDraft((prev) => ({ ...prev, trait: e.target.value || null }))} className="mt-1 w-full rounded-lg border border-ink-line bg-ink px-3 py-2 text-sm text-text">
                          <option value="">{copy.none}</option>
                          {TRAIT_TIERS.flatMap((tier) => tier.traits).map((trait) => (
                            <option key={trait.name} value={trait.name}>{trait.name}</option>
                          ))}
                        </select>
                      </label>
                      <label className="block text-sm text-text-faint">
                        {copy.level}
                        <input type="number" min="1" max={MAX_LEVEL} value={draft.level} onChange={(e) => setDraft((prev) => ({ ...prev, level: Math.min(MAX_LEVEL, Math.max(1, Number(e.target.value) || 1)) }))} className="mt-1 w-full rounded-lg border border-ink-line bg-ink px-3 py-2 text-sm text-text" />
                      </label>
                      <div className="flex flex-wrap gap-3">
                        <button onClick={saveSlot} className="rounded-full border border-rarity-legendary px-4 py-2 text-sm font-semibold text-rarity-legendary">{copy.save}</button>
                        <button onClick={clearSlot} className="rounded-full border border-ink-line px-4 py-2 text-sm text-text-faint">{copy.clear}</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
