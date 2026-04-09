"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Car,
  Flower2,
  Layers,
  Mountain,
  TreePine,
  HelpCircle,
  Phone,
  Info,
} from "lucide-react";
import {
  calculate,
  calculateSod,
  MATERIAL_GROUPS,
  MATERIAL_LABELS,
  PROJECT_DEPTHS,
} from "@/lib/calculator";
import { BUSINESS } from "@/lib/constants";

type ProjectType = "driveway" | "patio" | "garden" | "fill" | "walkway" | "other";
type TabType = "material" | "sod";

const PROJECT_TYPES: { key: ProjectType; label: string; icon: React.ReactNode }[] = [
  { key: "driveway", label: "Driveway", icon: <Car size={20} /> },
  { key: "patio", label: "Patio", icon: <Layers size={20} /> },
  { key: "garden", label: "Garden Bed", icon: <Flower2 size={20} /> },
  { key: "fill", label: "Fill Area", icon: <Mountain size={20} /> },
  { key: "walkway", label: "Walkway", icon: <TreePine size={20} /> },
  { key: "other", label: "Other", icon: <HelpCircle size={20} /> },
];

interface MaterialCalculatorProps {
  compact?: boolean;
  defaultMaterial?: string;
}

export default function MaterialCalculator({
  compact = false,
  defaultMaterial,
}: MaterialCalculatorProps) {
  const [activeTab, setActiveTab] = useState<TabType>("material");
  const [projectType, setProjectType] = useState<ProjectType>("driveway");
  const [material, setMaterial] = useState(defaultMaterial ?? "mason_sand");
  const [lengthFt, setLengthFt] = useState("");
  const [widthFt, setWidthFt] = useState("");
  const [depthIn, setDepthIn] = useState(String(PROJECT_DEPTHS["driveway"]));
  const [bufferOn, setBufferOn] = useState(true);

  // Sod state
  const [sodLength, setSodLength] = useState("");
  const [sodWidth, setSodWidth] = useState("");

  function handleProjectTypeChange(type: ProjectType) {
    setProjectType(type);
    setDepthIn(String(PROJECT_DEPTHS[type]));
  }

  const result = useMemo(() => {
    const l = parseFloat(lengthFt);
    const w = parseFloat(widthFt);
    const d = parseFloat(depthIn);
    if (!l || !w || !d || l <= 0 || w <= 0 || d <= 0) return null;
    return calculate({ lengthFt: l, widthFt: w, depthIn: d, materialKey: material, bufferOn });
  }, [lengthFt, widthFt, depthIn, material, bufferOn]);

  const sodResult = useMemo(() => {
    const l = parseFloat(sodLength);
    const w = parseFloat(sodWidth);
    if (!l || !w || l <= 0 || w <= 0) return null;
    return calculateSod(l, w);
  }, [sodLength, sodWidth]);

  const hasInputs =
    activeTab === "material"
      ? parseFloat(lengthFt) > 0 && parseFloat(widthFt) > 0 && parseFloat(depthIn) > 0
      : parseFloat(sodLength) > 0 && parseFloat(sodWidth) > 0;

  const orderParams =
    result
      ? `?material=${material}&tons=${result.recommended}&yards=${result.cubicYards}`
      : "";

  return (
    <div
      className="rounded-sm overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid var(--color-gray-light)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Tabs */}
      <div
        className="flex border-b"
        style={{ borderColor: "var(--color-gray-light)" }}
      >
        {(["material", "sod"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "0.08em",
              background: activeTab === tab ? "var(--color-blue)" : "#fff",
              color:
                activeTab === tab ? "#fff" : "var(--color-gray-mid)",
              borderBottom:
                activeTab === tab
                  ? "3px solid var(--color-red)"
                  : "3px solid transparent",
            }}
          >
            {tab === "material" ? "Materials" : "Sod"}
          </button>
        ))}
      </div>

      <div className={`${compact ? "p-4" : "p-6"}`}>
        {activeTab === "material" ? (
          <div className="flex flex-col gap-5">
            {/* Project type selector — hide in compact */}
            {!compact && (
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                >
                  Project Type
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {PROJECT_TYPES.map(({ key, label, icon }) => (
                    <button
                      key={key}
                      onClick={() => handleProjectTypeChange(key)}
                      className="flex flex-col items-center gap-1 p-2 rounded-sm text-xs font-semibold uppercase transition-all"
                      style={{
                        fontFamily: "var(--font-accent)",
                        letterSpacing: "0.04em",
                        background:
                          projectType === key ? "var(--color-blue)" : "var(--color-off-white)",
                        color: projectType === key ? "#fff" : "var(--color-gray-dark)",
                        border:
                          projectType === key
                            ? "2px solid var(--color-blue)"
                            : "2px solid transparent",
                      }}
                    >
                      <span>{icon}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Material dropdown */}
            <div>
              <label
                htmlFor="calc-material"
                className="block text-xs font-bold uppercase tracking-widest mb-1"
                style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
              >
                Material
              </label>
              <select
                id="calc-material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full border rounded-sm px-3 py-2.5 text-sm"
                style={{
                  borderColor: "var(--color-gray-light)",
                  fontFamily: "var(--font-body)",
                  color: "var(--color-gray-dark)",
                  background: "#fff",
                }}
              >
                {MATERIAL_GROUPS.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.keys.map((key) => (
                      <option key={key} value={key}>
                        {MATERIAL_LABELS[key]}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Dimension inputs */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="calc-length"
                  className="block text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                >
                  Length (ft)
                </label>
                <input
                  id="calc-length"
                  type="number"
                  min="0"
                  step="1"
                  value={lengthFt}
                  onChange={(e) => setLengthFt(e.target.value)}
                  placeholder="0"
                  className="w-full border rounded-sm px-3 py-3 text-lg font-bold text-center"
                  style={{
                    borderColor: "var(--color-gray-light)",
                    fontFamily: "var(--font-display)",
                    color: "var(--color-blue)",
                    minHeight: "48px",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="calc-width"
                  className="block text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                >
                  Width (ft)
                </label>
                <input
                  id="calc-width"
                  type="number"
                  min="0"
                  step="1"
                  value={widthFt}
                  onChange={(e) => setWidthFt(e.target.value)}
                  placeholder="0"
                  className="w-full border rounded-sm px-3 py-3 text-lg font-bold text-center"
                  style={{
                    borderColor: "var(--color-gray-light)",
                    fontFamily: "var(--font-display)",
                    color: "var(--color-blue)",
                    minHeight: "48px",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="calc-depth"
                  className="block text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                >
                  Depth (in)
                </label>
                <input
                  id="calc-depth"
                  type="number"
                  min="0"
                  step="0.5"
                  value={depthIn}
                  onChange={(e) => setDepthIn(e.target.value)}
                  placeholder="4"
                  className="w-full border rounded-sm px-3 py-3 text-lg font-bold text-center"
                  style={{
                    borderColor: "var(--color-gray-light)",
                    fontFamily: "var(--font-display)",
                    color: "var(--color-blue)",
                    minHeight: "48px",
                  }}
                />
              </div>
            </div>

            {/* Buffer toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={bufferOn}
                onChange={(e) => setBufferOn(e.target.checked)}
                className="w-4 h-4 rounded"
                style={{ accentColor: "var(--color-red)" }}
              />
              <span className="flex items-center gap-1.5 text-sm" style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-dark)" }}>
                Add 10% waste buffer
                <span
                  title="We recommend 10% extra for waste and settling"
                  className="cursor-help"
                  style={{ color: "var(--color-gray-mid)" }}
                >
                  <Info size={14} />
                </span>
                <span style={{ color: "var(--color-gray-mid)", fontSize: "0.75rem" }}>
                  (recommended)
                </span>
              </span>
            </label>

            {/* Results */}
            <AnimatePresence mode="wait">
              {hasInputs ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <MaterialResultPanel result={result} orderParams={orderParams} />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-sm px-5 py-8 text-center"
                  style={{ background: "var(--color-off-white)" }}
                >
                  <p
                    className="text-sm"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
                  >
                    Enter your dimensions above to get an instant estimate.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Sod tab */
          <div className="flex flex-col gap-5">
            <p
              className="text-sm"
              style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
            >
              Calculate how many sod pallets you need. Includes 5% waste.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="sod-length"
                  className="block text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                >
                  Length (ft)
                </label>
                <input
                  id="sod-length"
                  type="number"
                  min="0"
                  value={sodLength}
                  onChange={(e) => setSodLength(e.target.value)}
                  placeholder="0"
                  className="w-full border rounded-sm px-3 py-3 text-lg font-bold text-center"
                  style={{
                    borderColor: "var(--color-gray-light)",
                    fontFamily: "var(--font-display)",
                    color: "var(--color-blue)",
                    minHeight: "48px",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="sod-width"
                  className="block text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                >
                  Width (ft)
                </label>
                <input
                  id="sod-width"
                  type="number"
                  min="0"
                  value={sodWidth}
                  onChange={(e) => setSodWidth(e.target.value)}
                  placeholder="0"
                  className="w-full border rounded-sm px-3 py-3 text-lg font-bold text-center"
                  style={{
                    borderColor: "var(--color-gray-light)",
                    fontFamily: "var(--font-display)",
                    color: "var(--color-blue)",
                    minHeight: "48px",
                  }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {sodResult ? (
                <motion.div
                  key="sod-result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-sm p-5"
                  style={{ background: "var(--color-off-white)", border: "1px solid var(--color-gray-light)" }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ fontFamily: "var(--font-accent)", color: "var(--color-gray-mid)" }}
                  >
                    Your Estimate
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span
                        className="text-3xl font-bold"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-blue)" }}
                      >
                        {sodResult.sqFt.toLocaleString()}
                      </span>
                      <p className="text-sm" style={{ color: "var(--color-gray-mid)", fontFamily: "var(--font-body)" }}>
                        sq ft
                      </p>
                    </div>
                    <div>
                      <span
                        className="text-3xl font-bold"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-red)" }}
                      >
                        {sodResult.pallets}
                      </span>
                      <p className="text-sm" style={{ color: "var(--color-gray-mid)", fontFamily: "var(--font-body)" }}>
                        pallets (incl. 5% waste)
                      </p>
                    </div>
                  </div>
                  <a
                    href={BUSINESS.phoneHref}
                    className="btn btn-primary text-sm w-full justify-center"
                  >
                    <Phone size={14} className="mr-1.5" />
                    Call for Sod Pricing: {BUSINESS.phone}
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="sod-placeholder"
                  className="rounded-sm px-5 py-8 text-center"
                  style={{ background: "var(--color-off-white)" }}
                >
                  <p
                    className="text-sm"
                    style={{ fontFamily: "var(--font-body)", color: "var(--color-gray-mid)" }}
                  >
                    Enter your dimensions above.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function MaterialResultPanel({
  result,
  orderParams,
}: {
  result: ReturnType<typeof calculate> | null;
  orderParams: string;
}) {
  if (!result) return null;

  return (
    <div
      className="rounded-sm p-5"
      style={{
        background: "var(--color-blue)",
        color: "#fff",
      }}
    >
      <p
        className="text-xs font-bold uppercase tracking-widest mb-4"
        style={{ fontFamily: "var(--font-accent)", color: "var(--color-red)" }}
      >
        Your Estimate
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <ResultStat value={result.cubicYards.toString()} label="cubic yards" />
        <ResultStat value={result.recommended.toString()} label="tons" />
        <ResultStat
          value={result.truckLoads.toString()}
          label={result.truckLoads === 1 ? "truck load" : "truck loads"}
        />
      </div>

      <div
        className="border-t pt-4 mb-4"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      >
        {result.hasPrice ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 rounded px-3 py-2" style={{ background: "rgba(255,255,255,0.1)" }}>
              <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-accent)" }}>
                💵 Cash Total
              </p>
              <p
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "#fff" }}
              >
                ~${result.cashTotal?.toFixed(2)}
              </p>
            </div>
            <div className="flex-1 rounded px-3 py-2" style={{ background: "rgba(255,255,255,0.1)" }}>
              <p className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-accent)" }}>
                💳 Card Total (incl. 3.5%)
              </p>
              <p
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "#fff" }}
              >
                ~${result.cardTotal?.toFixed(2)}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>
              Pricing by quote for this material.
            </p>
            <a
              href={BUSINESS.phoneHref}
              className="font-bold text-lg hover:underline"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-red)", letterSpacing: "0.04em" }}
            >
              Call: {BUSINESS.phone}
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/contractors${orderParams}`}
          className="btn btn-primary flex-1 justify-center text-sm"
        >
          Order This Amount
        </Link>
        <a
          href={BUSINESS.phoneHref}
          className="btn btn-secondary flex-1 justify-center text-sm"
          style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
        >
          <Phone size={14} className="mr-1.5" />
          {BUSINESS.phone}
        </a>
      </div>
    </div>
  );
}

function ResultStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <span
        className="text-2xl font-bold block leading-none mb-0.5"
        style={{ fontFamily: "var(--font-display)", color: "#fff" }}
      >
        {value}
      </span>
      <span
        className="text-xs"
        style={{ fontFamily: "var(--font-accent)", color: "rgba(255,255,255,0.65)" }}
      >
        {label}
      </span>
    </div>
  );
}
