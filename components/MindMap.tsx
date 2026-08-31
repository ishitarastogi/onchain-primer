"use client";

import { useEffect, useRef } from "react";
import { flowSvg } from "@/content/flowSvg";
import { SectionKey } from "@/content/sections";

interface Props {
  onNodeClick: (target: SectionKey) => void;
}

const SVG_NS = "http://www.w3.org/2000/svg";

// The rendered SVG styles itself via class rules in globals.css (.node-*, .flow-*,
// .mm-node). Those don't travel when the SVG is rasterised in isolation, so we
// copy the matching rules into the exported markup and pin concrete font stacks
// in place of the app's CSS variables.
function inlineDiagramStyles(): string {
  let css = "";
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin sheet (e.g. Google Fonts) — skip
    }
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule && /^\.(node-|flow-|mm-node)/.test(rule.selectorText)) {
        css += rule.cssText + "\n";
      }
    }
  }
  css +=
    ".node-label,.node-sub,.flow-label{font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,monospace}\n" +
    ".flow-title,.flow-sub,.flow-note{font-family:'IBM Plex Sans',system-ui,sans-serif}\n";
  return css;
}

// Clone the live <svg>, give it explicit pixel dimensions from its viewBox, and
// prepend the inlined <style>. Returns the serialized markup plus the intrinsic
// size so callers can build a crisp canvas.
function serializeMindMap(svg: SVGSVGElement) {
  const vb = (svg.getAttribute("viewBox") ?? "0 0 700 1080").split(/[\s,]+/).map(Number);
  const width = vb[2] || svg.clientWidth || 700;
  const height = vb[3] || svg.clientHeight || 1080;

  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", SVG_NS);
  clone.setAttribute("width", String(width));
  clone.setAttribute("height", String(height));

  const style = document.createElementNS(SVG_NS, "style");
  style.textContent = inlineDiagramStyles();
  clone.insertBefore(style, clone.firstChild);

  return { markup: new XMLSerializer().serializeToString(clone), width, height };
}

function triggerDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
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

  const downloadPng = () => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) return;

    const { markup, width, height } = serializeMindMap(svg);
    const src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(markup);

    const img = new Image();
    img.onload = () => {
      const scale = 2; // render at 2x so the PNG stays sharp
      const canvas = document.createElement("canvas");
      canvas.width = width * scale;
      canvas.height = height * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(scale, scale);
      ctx.fillStyle = "#EDE7DA"; // paper — keep the export opaque, not transparent
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      triggerDownload(canvas.toDataURL("image/png"), "private-credit-flow.png");
    };
    img.src = src;
  };

  const downloadSvg = () => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) return;

    const { markup } = serializeMindMap(svg);
    const blob = new Blob([markup], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "private-credit-flow.svg");
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[620px] mx-auto">
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: flowSvg }} />

      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={downloadPng}
          className="font-mono text-[11px] uppercase tracking-wide border border-ink px-3 py-1.5 rounded-sm hover:bg-ink hover:text-paper-text transition-colors"
        >
          Download
        </button>
        <button
          onClick={downloadSvg}
          className="font-mono text-[11px] text-ink-text/55 hover:text-ink-text underline underline-offset-2"
        >
          Download as SVG
        </button>
      </div>
    </div>
  );
}
