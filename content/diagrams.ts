import { SectionKey } from "./sections";

export interface Diagram {
  section: SectionKey;
  title: string;
  caption: string; // can include <strong> tags
  examples: string[];
  svg: string; // raw SVG markup, rendered via dangerouslySetInnerHTML
}

// Same generic horizontal flow-box generator used in the HTML prototype.
export function flowSVG(
  items: { label: string; sub?: string; hi?: boolean; risk?: boolean }[],
  w = 640,
  h = 140
): string {
  const n = items.length;
  const boxW = Math.floor((w - 40 - (n - 1) * 30) / n);
  const y = (h - 56) / 2;
  let x = 20;
  let boxes = "";
  let arrows = "";
  items.forEach((it, i) => {
    const cls = "node-box" + (it.hi ? " hi" : "") + (it.risk ? " risk" : "");
    boxes += `<rect x="${x}" y="${y}" width="${boxW}" height="56" rx="2" class="${cls}"/>`;
    boxes += `<text x="${x + boxW / 2}" y="${y + 25}" text-anchor="middle" class="node-label">${it.label}</text>`;
    if (it.sub) boxes += `<text x="${x + boxW / 2}" y="${y + 40}" text-anchor="middle" class="node-sub">${it.sub}</text>`;
    if (i < n - 1) {
      arrows += `<path d="M${x + boxW},${y + 28} L${x + boxW + 30},${y + 28}" class="flow-line" marker-end="url(#arrowSm)"/>`;
    }
    x += boxW + 30;
  });
  return `<svg viewBox="0 0 ${w} ${h}"><defs><marker id="arrowSm" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="rgba(27,34,51,0.45)"/></marker></defs><g>${boxes}${arrows}</g></svg>`;
}

export const diagrams: Record<string, Diagram> = {
  // ---- fully ported: Lending Strategies ----
  "direct-lending": {
    section: "strategy",
    title: "Direct Lending",
    caption:
      "The lender underwrites the borrower directly — their cash flow, their balance sheet. <strong>No specific asset stands behind the loan; the company's ability to pay is the collateral.</strong>",
    examples: [],
    svg: flowSVG([{ label: "LENDER" }, { label: "BORROWER", sub: "underwritten on cash flow", hi: true }]),
  },
  "asset-based": {
    section: "strategy",
    title: "Asset-Based Lending",
    caption:
      "The loan is underwritten against a specific asset — a home, an invoice, a piece of equipment. <strong>If the borrower can't pay, the lender's claim is on that asset, not just a promise.</strong>",
    examples: [],
    svg: flowSVG([{ label: "LENDER" }, { label: "ASSET", sub: "HELOC, invoice, equipment", hi: true }, { label: "BORROWER" }]),
  },

  // ---- fully ported: Funding ----
  fund: {
    section: "funding",
    title: "Fund",
    caption:
      "Investors commit cash — or a promise of cash — to a fund, which makes or buys the loans. <strong>Closed-end locks capital for years; evergreen allows ongoing subscriptions and redemptions.</strong>",
    examples: ["Apollo ACRED (feeder fund)", "Hamilton Lane HLSCOPE (evergreen feeder)"],
    svg: flowSVG([{ label: "INVESTORS" }, { label: "FUND", hi: true }, { label: "LOANS" }]),
  },
  warehouse: {
    section: "funding",
    title: "Warehouse",
    caption: "A short-term line that holds loans temporarily, until they're sold off or packaged into something more permanent.",
    examples: ["Figure PRIME"],
    svg: flowSVG([{ label: "WAREHOUSE LINE", hi: true }, { label: "LOANS", sub: "held short-term" }, { label: "SALE / PACKAGING" }]),
  },
  "usdc-pool": {
    section: "funding",
    title: "Your USDC",
    caption:
      "You deposit stablecoins into an onchain lending pool, which lends that capital to borrowers directly. <strong>No fund, no warehouse — the pool itself is the funding mechanism.</strong>",
    examples: ["Maple"],
    svg: flowSVG([{ label: "YOU" }, { label: "ONCHAIN POOL", sub: "USDC deposit", hi: true }, { label: "BORROWERS" }]),
  },
  subline: {
    section: "funding",
    title: "Subscription Line",
    caption:
      "The fund borrows against LPs' unfunded commitments — <strong>a bridge loan against money that's promised but hasn't arrived yet.</strong>",
    examples: [],
    svg: flowSVG([{ label: "LENDER" }, { label: "FUND", sub: "against LP commitments", hi: true }, { label: "LOANS" }]),
  },
  navfin: {
    section: "funding",
    title: "NAV Financing",
    caption: "The lender lends against the value of the entire fund or portfolio — <strong>not against any single loan inside it.</strong>",
    examples: [],
    svg: flowSVG([{ label: "LENDER" }, { label: "WHOLE FUND / PORTFOLIO", sub: "not one loan", hi: true }]),
  },

  // ---- TODO: port the remaining 4 sections here ----
  // Copy each entry directly out of the `diagrams` object in your HTML
  // prototype (private-credit-prototype.html) — the caption, examples, and
  // svg strings can be pasted in almost verbatim. You need:
  //
  //   wrapper:    spv, fundwrap, note, vault
  //   structure:  direct-loan, pool, tranching, waterfall, clo
  //   onchain:    tokenize-fund, build-pool, tokenize-slice, use-ticket
  //   valuation:  nav, gate, queue
  //
  // The hand-drawn ones (pool, tranching, waterfall, spv, etc.) use raw
  // <svg>...</svg> strings instead of flowSVG() — copy those exactly as-is,
  // they don't need the generator.
};
