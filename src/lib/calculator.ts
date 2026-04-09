export const DENSITY: Record<string, number> = {
  mason_sand:         1.35,
  topsoil:            1.00,
  decomposed_granite: 1.45,
  crushed_limestone:  1.50,
  fill_dirt:          1.10,
  gravel:             1.40,
  screenings:         1.50,
};

export const PRICES: Record<string, number> = {
  mason_sand:         15.00,
  topsoil:            23.50,
  decomposed_granite: 40.00,
};

export const PROJECT_DEPTHS: Record<string, number> = {
  driveway: 4,
  patio:    3,
  garden:   6,
  fill:     6,
  walkway:  2,
  other:    3,
};

export const MATERIAL_LABELS: Record<string, string> = {
  mason_sand:         "Mason Sand",
  topsoil:            "Topsoil",
  decomposed_granite: "Decomposed Granite",
  crushed_limestone:  "Crushed Limestone",
  fill_dirt:          "Fill Dirt",
  gravel:             "Gravel",
  screenings:         "Screenings",
};

export const MATERIAL_GROUPS: { label: string; keys: string[] }[] = [
  {
    label: "Aggregates & Sand",
    keys: ["mason_sand", "crushed_limestone", "screenings", "fill_dirt", "gravel"],
  },
  {
    label: "Specialty Materials",
    keys: ["decomposed_granite", "topsoil"],
  },
];

export type CalcInput = {
  lengthFt:    number;
  widthFt:     number;
  depthIn:     number;
  materialKey: string;
  bufferOn:    boolean;
};

export type CalcResult = {
  cubicYards:  number;
  tons:        number;
  recommended: number;
  truckLoads:  number;
  cashTotal:   number | null;
  cardTotal:   number | null;
  hasPrice:    boolean;
};

function round(n: number, decimals: number): number {
  return Math.round(n * 10 ** decimals) / 10 ** decimals;
}

export function calculate(input: CalcInput): CalcResult {
  const { lengthFt, widthFt, depthIn, materialKey, bufferOn } = input;

  const cubicYards  = (lengthFt * widthFt * depthIn) / 324;
  const density     = DENSITY[materialKey] ?? 1.25;
  const tons        = cubicYards * density;
  const recommended = bufferOn ? tons * 1.10 : tons;
  const truckLoads  = Math.max(1, Math.ceil(recommended / 13));

  const unitPrice = PRICES[materialKey] ?? null;
  const cashTotal = unitPrice !== null ? recommended * unitPrice : null;
  const cardTotal = cashTotal !== null ? cashTotal * 1.035 : null;

  return {
    cubicYards:  round(cubicYards, 2),
    tons:        round(tons, 2),
    recommended: round(recommended, 2),
    truckLoads,
    cashTotal:   cashTotal !== null ? round(cashTotal, 2) : null,
    cardTotal:   cardTotal !== null ? round(cardTotal, 2) : null,
    hasPrice:    unitPrice !== null,
  };
}

export type SodResult = {
  sqFt:    number;
  pallets: number;
};

export function calculateSod(lengthFt: number, widthFt: number): SodResult {
  const sqFt    = lengthFt * widthFt;
  const withWaste = sqFt * 1.05;
  const pallets = Math.ceil(withWaste / 450);
  return { sqFt: round(sqFt, 0), pallets };
}
