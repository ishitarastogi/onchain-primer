export type SectionKey =
  | "strategy"
  | "funding"
  | "wrapper"
  | "structure"
  | "onchain"
  | "valuation";

export interface Section {
  title: string;
  eyebrow: string;
  blurb: string;
  diagrams: string[]; // keys into diagrams.ts
}

export const sections: Record<SectionKey, Section> = {
  strategy: {
    title: "Lending Strategies",
    eyebrow: "Question 1 of 6",
    blurb:
      "Before anything gets funded, wrapped, or structured, the lender picks one of two starting points. This decides who made the loan.",
    diagrams: ["direct-lending", "asset-based"],
  },
  funding: {
    title: "Funding",
    eyebrow: "Question 2 of 6",
    blurb:
      "Who puts the cash in. The originator doesn't always lend its own money — a fund, a warehouse line, or your own USDC can be the source.",
    diagrams: ["fund", "warehouse", "usdc-pool", "subline", "navfin"],
  },
  wrapper: {
    title: "Legal Wrapper",
    eyebrow: "Question 3 of 6",
    blurb:
      "Where the loan lives. Once made, the loan moves into a box — separate from the originator's own balance sheet.",
    diagrams: ["spv", "fundwrap", "note", "vault"],
  },
  structure: {
    title: "Credit Structure",
    eyebrow: "Question 4 of 6",
    blurb:
      "How the claim on that box gets packaged. One pool where everyone shares the same result, or a structured pool sliced into ranked layers.",
    diagrams: ["direct-loan", "pool", "tranching", "waterfall", "clo"],
  },
  onchain: {
    title: "Going Onchain",
    eyebrow: "Question 5 of 6",
    blurb:
      "The loan itself never moves onto a blockchain. What you own can be represented as a token. The loan stays in the box; the token is the claim.",
    diagrams: ["tokenize-fund", "build-pool", "tokenize-slice", "use-ticket"],
  },
  valuation: {
    title: "Valuation and Exit",
    eyebrow: "Question 6 of 6",
    blurb:
      "How you get your money back. Borrowers repay on the loan's schedule; the token can move in a second. That gap is the risk.",
    diagrams: ["nav", "gate", "queue"],
  },
};
