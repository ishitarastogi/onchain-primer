"use client";

import { SectionKey } from "@/content/sections";

interface Card {
  key: SectionKey;
  num: number;
  title: string;
  chips: string[];
  desc: string;
  rust?: boolean;
}

const cards: Card[] = [
  { key: "strategy", num: 1, title: "Lending strategies", chips: ["Direct", "Asset-based"], desc: "Who made the loan." },
  { key: "funding", num: 2, title: "Funding", chips: ["Fund", "Warehouse", "NAV line"], desc: "Who puts the cash in." },
  { key: "wrapper", num: 3, title: "Legal wrapper", chips: ["SPV", "Fund", "Note"], desc: "Where the loan lives." },
  { key: "structure", num: 4, title: "Structure", chips: ["Pool", "Tranche", "Waterfall"], desc: "How the claim is packaged." },
  { key: "onchain", num: 5, title: "Going onchain", chips: ["Token", "Oracle", "Collateral"], desc: "What the token adds.", rust: true },
  { key: "valuation", num: 6, title: "Valuation and exit", chips: ["NAV", "Gate", "Queue"], desc: "How you get money back.", rust: true },
];

export default function ConceptGrid({ onSelect }: { onSelect: (key: SectionKey) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line mx-12 mb-16">
      {cards.map((c) => (
        <button
          key={c.key}
          onClick={() => onSelect(c.key)}
          className="bg-paper hover:bg-paper-3 text-left p-6 flex flex-col gap-3 min-h-[170px]"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-display text-lg">{c.title}</h4>
            <span
              className={`font-mono text-[11px] w-[22px] h-[22px] rounded-full border flex items-center justify-center ${
                c.rust ? "text-rust border-rust/35" : "text-ink-text/40 border-line"
              }`}
            >
              {c.num}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {c.chips.map((chip) => (
              <span
                key={chip}
                className={`font-mono text-[10.5px] px-2.5 py-1 rounded-full border bg-paper ${
                  c.rust ? "text-rust border-rust/35" : "text-slate border-slate/35"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
          <p className="text-[12.5px] text-ink-text/60 flex-1">{c.desc}</p>
          <span className="font-mono text-[10px] uppercase tracking-wide text-brass-dim">Open →</span>
        </button>
      ))}
    </div>
  );
}
