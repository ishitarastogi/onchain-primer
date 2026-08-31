"use client";

import { useState } from "react";
import MindMap from "@/components/MindMap";
import ConceptGrid from "@/components/ConceptGrid";
import SectionView from "@/components/SectionView";
import DiagramView from "@/components/DiagramView";
import { SectionKey } from "@/content/sections";
import { diagrams } from "@/content/diagrams";

type ViewState =
  | { view: "mindmap" }
  | { view: "section"; key: SectionKey }
  | { view: "diagram"; key: string };

export default function Home() {
  const [state, setState] = useState<ViewState>({ view: "mindmap" });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-screen">
      {/* sidebar */}
      <aside className="hidden md:flex flex-col bg-ink text-paper-text p-7">
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-[26px] h-[26px] border border-paper-text/50 flex items-center justify-center font-mono text-[9px]">
            OP
          </div>
          <div className="font-mono text-xs uppercase tracking-wide opacity-75">Onchain Primer</div>
        </div>
        <nav className="flex flex-col gap-0.5">
          <button
            onClick={() => setState({ view: "mindmap" })}
            className="font-display text-base py-2.5 text-left text-paper-text font-semibold flex items-center"
          >
            <span className="text-[8px] text-brass mr-2">●</span>Private credit
          </button>
          <button disabled className="font-mono text-sm py-2.5 text-left text-paper-text/30 flex items-center justify-between">
            <span className="flex items-center"><span className="text-[8px] mr-2">○</span>Lending / Vaults</span>
            <span className="text-[9px] border border-paper-text/20 rounded-full px-1.5 py-0.5">soon</span>
          </button>
          <button disabled className="font-mono text-sm py-2.5 text-left text-paper-text/30 flex items-center justify-between">
            <span className="flex items-center"><span className="text-[8px] mr-2">○</span>Curator</span>
            <span className="text-[9px] border border-paper-text/20 rounded-full px-1.5 py-0.5">soon</span>
          </button>
        </nav>
        <div className="mt-auto font-mono text-[10.5px] text-paper-text/40 leading-relaxed">
          Module 01 of 1.<br />Created by Ishita Rastogi.
        </div>
      </aside>

      {/* main */}
      <main>
        {state.view === "mindmap" && (
          <>
            <div className="px-12 pt-10 pb-1.5">
              <h1 className="font-display text-3xl font-semibold">Private credit</h1>
            </div>
            <div className="my-5 mx-12 border border-line bg-paper-2 rounded-xl p-10">
              <p className="font-display text-2xl font-semibold mb-6">How onchain private credit actually works</p>
              <MindMap onNodeClick={(key) => setState({ view: "section", key })} />
            </div>
            <div className="px-12 pb-4 font-mono text-[10.5px] uppercase tracking-wide text-ink-text/40">
              Six concepts, in the order they actually happen
            </div>
            <ConceptGrid onSelect={(key) => setState({ view: "section", key })} />
          </>
        )}

        {state.view === "section" && (
          <SectionView
            sectionKey={state.key}
            onBack={() => setState({ view: "mindmap" })}
            onOpenDiagram={(key) => setState({ view: "diagram", key })}
          />
        )}

        {state.view === "diagram" && (
          <DiagramView
            diagramKey={state.key}
            onBackToSection={() => setState({ view: "section", key: diagrams[state.key].section })}
            onOpenDiagram={(key) => setState({ view: "diagram", key })}
          />
        )}
      </main>
    </div>
  );
}
