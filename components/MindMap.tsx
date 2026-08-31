"use client";

import { useEffect, useRef } from "react";
import { flowSvg } from "@/content/flowSvg";
import { SectionKey } from "@/content/sections";

interface Props {
  onNodeClick: (target: SectionKey) => void;
}

export default function MindMap({ onNodeClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const nodes = container.querySelectorAll<SVGGElement>(".mm-node[data-target]");
    const handlers: { el: Element; fn: () => void }[] = [];

    nodes.forEach((node) => {
      const target = node.getAttribute("data-target") as SectionKey | null;
      if (!target) return;
      const fn = () => onNodeClick(target);
      node.addEventListener("click", fn);
      handlers.push({ el: node, fn });
    });

    return () => {
      handlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
    };
  }, [onNodeClick]);

  return (
    <div className="max-w-[620px] mx-auto">
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: flowSvg }}
      />
    </div>
  );
}
