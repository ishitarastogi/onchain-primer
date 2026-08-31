// The main hero flow chart: borrower -> originator -> loan -> wrapper ->
// funding -> structure -> claim -> token -> exit. Each clickable node carries
// a data-target attribute matching a SectionKey, read by MindMap.tsx.

export const flowSvg = `
<svg viewBox="0 0 700 1080" role="img" aria-label="Full flow from borrower to exit">
  <defs>
    <marker id="mmArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1B2233"/></marker>
    <marker id="mmArrowDash" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#9B87C4"/></marker>
  </defs>

  <g class="mm-node" data-target="strategy">
    <rect x="250" y="16" width="200" height="55" rx="8" class="flow-green"/>
    <text x="350" y="49" text-anchor="middle" class="flow-title green">Borrower</text>
  </g>
  <path d="M320,71 L320,116" class="flow-solid" marker-end="url(#mmArrow)"/>
  <path d="M380,116 L380,71" class="flow-solid" marker-end="url(#mmArrow)"/>
  <text x="260" y="97" class="flow-label">needs financing</text>
  <text x="395" y="97" class="flow-label">sends cash</text>

  <g class="mm-node" data-target="strategy">
    <rect x="230" y="116" width="240" height="62" rx="8" class="flow-amber"/>
    <text x="350" y="145" text-anchor="middle" class="flow-title amber">Originator</text>
    <text x="350" y="162" text-anchor="middle" class="flow-sub">underwrites + creates loan</text>
  </g>
  <path d="M350,178 L350,212" class="flow-solid" marker-end="url(#mmArrow)"/>

  <g class="mm-node" data-target="strategy">
    <rect x="240" y="212" width="220" height="55" rx="8" class="flow-blue"/>
    <text x="350" y="240" text-anchor="middle" class="flow-title blue">Loan / Receivable</text>
    <text x="350" y="257" text-anchor="middle" class="flow-sub">repayment claim</text>
  </g>
  <path d="M350,267 L350,300" class="flow-solid" marker-end="url(#mmArrow)"/>

  <text x="350" y="316" text-anchor="middle" class="flow-label" style="text-transform:uppercase; letter-spacing:0.04em;">Where the loan lives</text>
  <rect x="55" y="326" width="590" height="105" rx="10" fill="none" stroke="#B9AD91" stroke-dasharray="4 3"/>

  <g class="mm-node" data-target="wrapper">
    <rect x="90" y="348" width="220" height="60" rx="8" class="flow-purple"/>
    <text x="200" y="376" text-anchor="middle" class="flow-title purple">Fund</text>
    <text x="200" y="393" text-anchor="middle" class="flow-sub">holds the loan</text>
  </g>
  <text x="350" y="382" text-anchor="middle" class="flow-label">OR</text>
  <g class="mm-node" data-target="wrapper">
    <rect x="390" y="348" width="220" height="60" rx="8" class="flow-purple"/>
    <text x="500" y="376" text-anchor="middle" class="flow-title purple">SPV</text>
    <text x="500" y="393" text-anchor="middle" class="flow-sub">holds the loan</text>
  </g>
  <text x="350" y="452" text-anchor="middle" class="flow-note">Pick one box — sometimes the fund sits on top of an SPV.</text>

  <g class="mm-node" data-target="funding">
    <rect x="30" y="490" width="180" height="55" rx="8" class="flow-pink"/>
    <text x="120" y="514" text-anchor="middle" class="flow-title pink">Fund capital</text>
    <text x="120" y="530" text-anchor="middle" class="flow-sub">investors' money</text>
  </g>
  <g class="mm-node" data-target="funding">
    <rect x="260" y="490" width="180" height="55" rx="8" class="flow-pink"/>
    <text x="350" y="514" text-anchor="middle" class="flow-title pink">Warehouse</text>
    <text x="350" y="530" text-anchor="middle" class="flow-sub">short-term financing</text>
  </g>
  <g class="mm-node" data-target="funding">
    <rect x="490" y="490" width="180" height="55" rx="8" class="flow-pink"/>
    <text x="580" y="514" text-anchor="middle" class="flow-title pink">Your USDC</text>
    <text x="580" y="530" text-anchor="middle" class="flow-sub">onchain capital</text>
  </g>
  <path d="M120,490 C120,460 170,430 195,408" class="flow-dashed" marker-end="url(#mmArrowDash)"/>
  <path d="M580,490 C580,460 530,430 505,408" class="flow-dashed" marker-end="url(#mmArrowDash)"/>
  <path d="M350,490 C350,450 460,320 460,178" class="flow-dashed" marker-end="url(#mmArrowDash)"/>
  <text x="470" y="300" class="flow-note" transform="rotate(6 470 300)">warehouse money usually</text>
  <text x="470" y="313" class="flow-note" transform="rotate(6 470 313)">goes to the originator</text>

  <path d="M350,431 L350,470" class="flow-solid" marker-end="url(#mmArrow)"/>
  <path d="M350,545 L350,585" class="flow-solid" marker-end="url(#mmArrow)"/>

  <rect x="95" y="590" width="510" height="95" rx="10" fill="none" stroke="#B9AD91" stroke-dasharray="4 3"/>
  <g class="mm-node" data-target="structure">
    <rect x="120" y="610" width="200" height="60" rx="8" class="flow-purple"/>
    <text x="220" y="635" text-anchor="middle" class="flow-title purple">One Pool</text>
    <text x="220" y="652" text-anchor="middle" class="flow-sub">everyone shares the result</text>
  </g>
  <text x="350" y="644" text-anchor="middle" class="flow-label">OR</text>
  <g class="mm-node" data-target="structure">
    <rect x="380" y="610" width="200" height="60" rx="8" class="flow-purple"/>
    <text x="480" y="635" text-anchor="middle" class="flow-title purple">Structured</text>
    <text x="480" y="652" text-anchor="middle" class="flow-sub">senior first, junior loses first</text>
  </g>
  <path d="M350,685 L350,718" class="flow-solid" marker-end="url(#mmArrow)"/>

  <g class="mm-node" data-target="onchain">
    <rect x="175" y="718" width="350" height="62" rx="8" class="flow-amber"/>
    <text x="350" y="747" text-anchor="middle" class="flow-title amber">You own a claim</text>
    <text x="350" y="764" text-anchor="middle" class="flow-sub">fund share · note · tranche · vault share</text>
  </g>
  <path d="M350,780 L350,808" class="flow-solid" marker-end="url(#mmArrow)"/>

  <g class="mm-node" data-target="onchain">
    <rect x="150" y="808" width="400" height="62" rx="8" class="flow-blue"/>
    <text x="350" y="835" text-anchor="middle" class="flow-title blue">That claim can be a token</text>
    <text x="350" y="852" text-anchor="middle" class="flow-sub">the loan stays in the box. the token is the claim.</text>
  </g>
  <path d="M350,870 L350,898" class="flow-solid" marker-end="url(#mmArrow)"/>

  <g class="mm-node" data-target="onchain">
    <rect x="230" y="898" width="240" height="55" rx="8" class="flow-green"/>
    <text x="350" y="926" text-anchor="middle" class="flow-title green">Token</text>
    <text x="350" y="943" text-anchor="middle" class="flow-sub">worth more if borrowers pay</text>
  </g>

  <path d="M350,953 L350,972 M130,972 L570,972 M130,972 L130,988 M350,972 L350,988 M570,972 L570,988" class="flow-solid" fill="none"/>
  <g class="mm-node" data-target="valuation">
    <rect x="40" y="988" width="180" height="55" rx="8" class="flow-pink"/>
    <text x="130" y="1012" text-anchor="middle" class="flow-title pink">Hold</text>
    <text x="130" y="1028" text-anchor="middle" class="flow-sub">keep it. earn if it pays.</text>
  </g>
  <g class="mm-node" data-target="valuation">
    <rect x="260" y="988" width="180" height="55" rx="8" class="flow-pink"/>
    <text x="350" y="1012" text-anchor="middle" class="flow-title pink">Use as collateral</text>
    <text x="350" y="1028" text-anchor="middle" class="flow-sub">borrow against it</text>
  </g>
  <g class="mm-node" data-target="valuation">
    <rect x="480" y="988" width="180" height="55" rx="8" class="flow-pink"/>
    <text x="570" y="1012" text-anchor="middle" class="flow-title pink">Get dollars back</text>
    <text x="570" y="1028" text-anchor="middle" class="flow-sub">redeem, gate, sleeve, sell</text>
  </g>

  <line x1="40" y1="1065" x2="80" y2="1065" class="flow-solid" marker-end="url(#mmArrow)"/>
  <text x="88" y="1069" class="flow-label">Credit flow (loan)</text>
  <line x1="280" y1="1065" x2="320" y2="1065" class="flow-dashed" marker-end="url(#mmArrowDash)"/>
  <text x="328" y="1069" class="flow-label">Capital flow (funding)</text>
</svg>
`;
