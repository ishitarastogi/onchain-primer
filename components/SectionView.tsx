"use client";

import { sections, SectionKey } from "@/content/sections";
import { diagrams } from "@/content/diagrams";

interface Props {
  sectionKey: SectionKey;
  onBack: () => void;
  onOpenDiagram: (key: string) => void;
}

export default function SectionView({ sectionKey, onBack, onOpenDiagram }: Props) {
  const s = sections[sectionKey];

  return (
    <div className="px-12 py-9 pb-16">
      <button onClick={onBack} className="font-mono text-xs text-ink-text/55 hover:text-ink-text mb-5 block">
        ← Private credit
      </button>
      <div className="font-mono text-[11px] uppercase tracking-wide text-brass-dim">{s.eyebrow}</div>
      <h2 className="font-display text-3xl font-semibold mt-2 mb-2.5">{s.title}</h2>
      <p className="text-[14.5px] text-ink-text/60 max-w-xl mb-7 leading-relaxed">{s.blurb}</p>

      <div className="grid gap-px bg-line border border-line" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {s.diagrams.map((dKey) => {
          const d = diagrams[dKey];
          if (!d) return null; // not yet ported — see TODO in diagrams.ts
          return (
            <button
              key={dKey}
              onClick={() => onOpenDiagram(dKey)}
              className="bg-paper hover:bg-paper-3 text-left p-5 flex flex-col gap-2.5"
            >
              <div
                className="h-[110px] flex items-center border-b border-black/10 pb-3"
                dangerouslySetInnerHTML={{ __html: d.svg }}
              />
              <h4 className="font-display text-[16.5px]">{d.title}</h4>
              <p
                className="text-xs text-ink-text/60"
                dangerouslySetInnerHTML={{ __html: d.caption.replace(/<\/?strong>/g, "") }}
              />
              <span className="font-mono text-[10px] uppercase text-brass-dim">Full view →</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
