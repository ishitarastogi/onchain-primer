"use client";

import { sections } from "@/content/sections";
import { diagrams } from "@/content/diagrams";

interface Props {
  diagramKey: string;
  onBackToSection: () => void;
  onOpenDiagram: (key: string) => void;
}

export default function DiagramView({ diagramKey, onBackToSection, onOpenDiagram }: Props) {
  const d = diagrams[diagramKey];
  if (!d) return null;
  const section = sections[d.section];
  const list = section.diagrams;
  const i = list.indexOf(diagramKey);

  return (
    <div className="px-12 py-9 pb-16 max-w-[880px]">
      <button onClick={onBackToSection} className="font-mono text-xs text-ink-text/55 hover:text-ink-text mb-5 block">
        ← {section.title}
      </button>
      <div className="font-mono text-[11px] uppercase tracking-wide text-brass-dim">{section.title}</div>
      <h2 className="font-display text-[28px] font-semibold mt-2 mb-5">{d.title}</h2>

      <div className="border border-line bg-paper-2 p-5" dangerouslySetInnerHTML={{ __html: d.svg }} />

      <p className="mt-5 text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: d.caption }} />

      {d.examples.length > 0 && (
        <div className="mt-5 flex items-center gap-2.5 flex-wrap">
          <span className="font-mono text-[10.5px] uppercase text-ink-text/40">Seen in the wild</span>
          {d.examples.map((ex) => (
            <span key={ex} className="font-mono text-[11.5px] text-slate border border-slate/35 px-2.5 py-1 rounded-full bg-paper">
              {ex}
            </span>
          ))}
        </div>
      )}

      <div className="mt-8 pt-5 border-t border-line flex justify-end gap-2.5">
        <button
          disabled={i === 0}
          onClick={() => onOpenDiagram(list[i - 1])}
          className="font-mono text-xs uppercase border border-ink px-3.5 py-2 rounded-sm disabled:opacity-30 hover:bg-ink hover:text-paper-text disabled:hover:bg-transparent disabled:hover:text-ink-text"
        >
          ← Prev
        </button>
        <button
          disabled={i === list.length - 1}
          onClick={() => onOpenDiagram(list[i + 1])}
          className="font-mono text-xs uppercase border border-ink px-3.5 py-2 rounded-sm disabled:opacity-30 hover:bg-ink hover:text-paper-text disabled:hover:bg-transparent disabled:hover:text-ink-text"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
