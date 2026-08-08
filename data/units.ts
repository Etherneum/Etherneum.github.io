import { UNIT_DETAILS, type UnitDetails } from "./unitDetails";

export type Unit = UnitDetails;

export const UNITS: Unit[] = UNIT_DETAILS.map((detail) => ({ ...detail }));

export function getUnitByName(name: string): Unit | undefined {
  return UNITS.find((unit) => unit.name.toLowerCase() === name.toLowerCase());
}
