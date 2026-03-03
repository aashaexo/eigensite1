const { useState, useEffect } = React;
const agents = [
  { id:1, name:"Sovereign Journalist",      desc:"Independent reporting agent that protects sources inside a TEE.", tags:["Privacy","Media"],         author:"Aasha",   link:"https://eigencloud.xyz", x:"https://x.com/eigencloud" },
  { id:2, name:"Verifiable Trading Agent",  desc:"Automated strategies with cryptographically enforced risk limits.", tags:["DeFi","Finance"],        author:"Marcus",  link:"https://eigencloud.xyz", x:"https://x.com/eigencloud" },
  { id:3, name:"Prediction Market Trader",  desc:"Positions placed by frozen mandate. Every step is on-chain provable.", tags:["Markets","AI"],       author:"Priya",   link:"https://eigencloud.xyz", x:"https://x.com/eigencloud" },
  { id:4, name:"AI Governance Proxy",       desc:"Learns your values and votes on governance proposals on your behalf.", tags:["Governance","DAO"],   author:"Chen",    link:"https://eigencloud.xyz", x:"https://x.com/eigencloud" },
  { id:5, name:"Private Code Reviewer",     desc:"Audits your codebase for backdoors without ever seeing the source.", tags:["Security","Dev"],       author:"Fatima",  link:"https://eigencloud.xyz", x:"https://x.com/eigencloud" },
  { id:6, name:"Verifiable Credit Score",   desc:"AI-generated credit score with a signed, auditable methodology.", tags:["Finance","Identity"],      author:"Jorge",   link:"https://eigencloud.xyz", x:"https://x.com/eigencloud" },
  { id:7, name:"Sovereign AI Scientist",    desc:"Runs committed research programs with verifiable, published results.", tags:["Research","Discovery"], author:"Nadia",  link:"https://eigencloud.xyz", x:"https://x.com/eigencloud" },
  { id:8, name:"Agent-to-Agent Negotiator", desc:"Negotiates deals using private user data without ever exposing it.", tags:["Multi-Agent","Privacy"], author:"Ravi",   link:"https://eigencloud.xyz", x:"https://x.com/eigencloud" },
  { id:9, name:"Verifiable Intent Engine",  desc:"Natural language to verified on-chain action with per-step receipts.", tags:["UX","Execution"],     author:"Sione",   link:"https://eigencloud.xyz", x:"https://x.com/eigencloud" },
];

const ideas = [
  { name:"Sovereign Journalist",         cat:"Privacy",    desc:"A completely independent agent running in a TEE that collects data and protects whistleblower identities. No central server can censor or shut it down." },
  { name:"Private Advanced Vaults",      cat:"DeFi",       desc:"DeFi vaults with advanced computation running in trusted, private environments via EigenCompute. Strategy logic stays confidential while execution is verifiable." },
  { name:"Verifiable Debate",            cat:"Governance", desc:"Two or more parties argue while an AI judge scores them against a transparent rubric. The result is cryptographically attested — no human moderator needed." },
  { name:"Multiplayer Games w/ Markets", cat:"Gaming",     desc:"Verifiable game execution with built-in prediction markets and autonomous tournament payouts for any multiplayer game. No referees. No disputes." },
  { name:"Compatibility Match",          cat:"Social",     desc:"Private agent that finds shared interests, icebreakers, and compatibility scores between users — without either party revealing raw personal data." },
  { name:"Private Code Reviewer",        cat:"Security",   desc:"Reviews code for backdoors while keeping the codebase completely confidential. Security audits you can request without handing over your source." },
  { name:"Verifiable Model Evals",       cat:"AI",         desc:"Upload model weights privately and run standardized evals without leaking weights to the evaluator. Benchmark your model without exposing your IP." },
  { name:"Airline Miles Marketplace",    cat:"Finance",    desc:"Secure escrow environment for trading airline miles without counterparty risk. Smart redemption logic runs inside a TEE so neither side can cheat." },
  { name:"Dark Pools",                   cat:"DeFi",       desc:"TEE-powered dark pool for private large-block trading without information leakage. Institutional-grade privacy for on-chain order flow." },
  { name:"Sovereign AI Scientist",       cat:"Research",   desc:"Autonomous discovery agent that executes committed research programs with verifiable compute. Publishes results with cryptographic proof of methodology." },
  { name:"Attribute-Gated Distribution", cat:"Identity",   desc:"Privacy-preserving drops gated on verifiable attributes. Prove you qualify without revealing who you are." },
  { name:"Identity Incumbering",         cat:"Identity",   desc:"Granular, revocable delegation for accounts with per-action caps and audit trails. Fine-grained access control without exposing your master keys." },
  { name:"New Lotto",                    cat:"Gaming",     desc:"A provably fair lottery where a TEE generates a sealed target number. Winners are verified by math, not by a company's word." },
  { name:"Private AI Property Verifier", cat:"AI",         desc:"Adversarial tester probes your model for specific properties and returns a signed pass/fail certificate — without ever seeing the model weights." },
  { name:"Custom AI Judges",             cat:"Governance", desc:"Drop-in judge agents for competitions with transparent, attested rubrics. Replace biased human panels with verifiable AI scoring." },
  { name:"Prediction Market Trader",     cat:"Finance",    desc:"Autonomous agent that places positions on prediction markets using a frozen mandate. The strategy is locked in at deployment — no hidden pivots." },
  { name:"Verifiable Trading Agents",    cat:"DeFi",       desc:"Framework to launch automated trading strategies with enforceable risk limits. Every trade is cryptographically proven — no rug, no lies." },
  { name:"Agent-To-Agent Combat",        cat:"Gaming",     desc:"Hunger Games for agents with shared rules and built-in markets. Agents compete autonomously while humans bet on outcomes through verifiable markets." },
  { name:"Verifiable Intent Engines",    cat:"AI",         desc:"Natural language to verified action with per-step receipts. Every instruction the agent executes is logged, auditable, and cryptographically proven." },
  { name:"Copytrading Agent",            cat:"Finance",    desc:"Mirror other agents' trades with policy controls and revenue sharing. The lead agent's strategy is attested — you know exactly what you're copying." },
  { name:"English Language Contracts",   cat:"Legal",      desc:"Create enforceable conditional payouts from plain English. The TEE interprets your terms and executes escrow logic without a lawyer." },
  { name:"Incentivised Data Sharing",    cat:"Data",       desc:"Let data owners earn per-query revenue while raw data never leaves the TEE. Monetize your data without ever handing it over." },
  { name:"Data Attribution Quests",      cat:"Data",       desc:"Bounty system to improve datasets against a private benchmark. Contributors earn rewards when their data measurably improves a hidden test set." },
  { name:"Information Curator Agent",    cat:"AI",         desc:"Agent that crawls and curates valuable information in private state. Builds a proprietary knowledge base you own and control." },
  { name:"Agent-To-Agent Negotiation",   cat:"Multi-Agent",desc:"Agents negotiate on behalf of users with private data without revealing it to each other. The first fully private multi-agent marketplace protocol." },
  { name:"Insurance Adjudication",       cat:"Finance",    desc:"AI claims judge that evaluates evidence against policy terms and issues a signed verdict. No adjuster discretion, no opaque denials." },
  { name:"Carbon Offset Mapper",         cat:"Climate",    desc:"Satellite imagery analyzed by verifiable AI to certify carbon offset claims. Greenwashing becomes impossible when the proof is cryptographic." },
  { name:"MCP Marketplace",              cat:"Infrastructure", desc:"Open marketplace for API keys seeded in private TEEs. Monetize access to your services without exposing credentials." },
  { name:"Private KYC",                  cat:"Identity",   desc:"KYC verification where personal data never leaves the trusted environment. Prove you passed without handing your documents to every service." },
  { name:"Private Verifiable Surveillance", cat:"Security", desc:"Cameras that only release footage when crime is detected by a TEE. Privacy by default, accountability on demand." },
  { name:"Verifiable Credit Score",      cat:"Finance",    desc:"AI produces a verifiable credit score with transparent, auditable methodology. Know exactly how your score was calculated." },
  { name:"AI Governance Proxies",        cat:"Governance", desc:"AI that learns your values and votes on governance proposals on your behalf. Participate in every vote without reading every proposal." },
  { name:"Private Database",             cat:"Infrastructure", desc:"Database running on EigenCompute with cryptographic access control. Queries are executed and access is logged inside a TEE." },
  { name:"Transaction Pre-Screener",     cat:"Security",   desc:"Transactions routed through EigenCompute for risk analysis before submission. Compliance without exposing your transaction history." },
  { name:"Private Security Agent",       cat:"Security",   desc:"Security agent that audits code without seeing or stealing it. Full vulnerability reports, zero IP exposure." },
  { name:"Governance Rights Agent",      cat:"Governance", desc:"Auction governance and voting rights with verifiable vote execution. Transparent governance markets for any protocol." },
  { name:"Verifiable GoFundMe",          cat:"Social",     desc:"Crowdfunding with verifiable fund usage. Donors can cryptographically confirm their money was spent as promised." },
  { name:"Trading Vaults on HL",         cat:"DeFi",       desc:"Advanced trading vaults on Hyperliquid with verifiable execution. Complex strategies run in TEEs, results posted on-chain." },
  { name:"Minecraft Servers",            cat:"Gaming",     desc:"Verifiable Minecraft server execution with anti-cheat. Game state is proven — no admin abuse, no invisible hacks." },
  { name:"Gift Card Marketplace",        cat:"Finance",    desc:"Trade and redeem gift cards with no counterparty risk. Escrow logic runs in a TEE — the card is only released when payment is confirmed." },
  { name:"Access Control of Data",       cat:"Infrastructure", desc:"Fine-grained, cryptographically enforced access control for any dataset. Grant and revoke permissions with on-chain auditability." },
  { name:"Verifiable Pedia",             cat:"Media",      desc:"Community-funded wikipedia with AI-curated, attested content. Every edit is verified and every source is cited cryptographically." },
  { name:"Verifiable News Synthesizer",  cat:"Media",      desc:"Multi-model verifiable news aggregation without single-source bias. The synthesis methodology is transparent and auditable." },
  { name:"Pay To Get Info From Chat History", cat:"Data",  desc:"Monetize your AI chat history with per-query revenue while keeping raw data private. Your conversations earn for you without ever leaving your control." },
  { name:"Robinhood Pattern Trader",     cat:"Finance",    desc:"Autonomous trading agent replicating retail trading patterns with verifiable execution. Strategy is attested at launch — no hidden changes." },
  { name:"Protocol Copilot",             cat:"DeFi",       desc:"AI assistant for navigating and integrating DeFi protocols with verifiable, unbiased guidance. No affiliate deals, no hidden recommendations." },
];

const catColors = {
  Privacy:"#c084fc", DeFi:"#a78bfa", Governance:"#818cf8", Gaming:"#e879f9",
  Social:"#d8b4fe", Security:"#f0abfc", AI:"#c084fc", Finance:"#a78bfa",
  Research:"#d8b4fe", Identity:"#818cf8", Data:"#e879f9", "Multi-Agent":"#c084fc",
  Legal:"#a78bfa", Climate:"#818cf8", Infrastructure:"#c084fc", Media:"#e879f9",
};

const TABS = ["Agents","Ideas","Docs","Community"];

const docCards = [
  { label:"Quickstart",    sub:"5 min to your first verifiable app",              tag:"START HERE", link:"https://docs.eigencloud.xyz/eigencompute/get-started/quickstart" },
  { label:"EigenCompute",  sub:"Cryptographic trust for any workload",             tag:"COMPUTE",    link:"https://docs.eigencloud.xyz" },
  { label:"EigenAI",       sub:"Deterministic inference. Drop-in OpenAI compat.",  tag:"AI",         link:"https://eigencloud.xyz/ai" },
  { label:"EigenDA",       sub:"Tamper-resistant data availability at scale",      tag:"DATA",       link:"https://eigencloud.xyz/da" },
  { label:"EigenLayer",    sub:"Stake ETH and EIGEN. Secure the cloud.",           tag:"STAKING",    link:"https://eigencloud.xyz/eigenlayer" },
  { label:"Developer Hub", sub:"SDKs, tutorials, and example repos",               tag:"DEV TOOLS",  link:"https://developers.eigencloud.xyz" },
];

const communityLinks = [
  { name:"Discord",  sub:"Where the real conversations happen.",          cta:"Join Discord",  tag:"20K+ MEMBERS", link:"https://discord.gg/eigenlayer" },
  { name:"X",        sub:"Updates, launches, and ecosystem news.",        cta:"Follow",        tag:"REAL-TIME",    link:"https://x.com/eigencloud" },
  { name:"Forum",    sub:"Governance debates and technical proposals.",   cta:"Visit Forum",   tag:"RESEARCH",     link:"https://forum.eigenlayer.xyz" },
  { name:"YouTube",  sub:"Deep dives, tutorials, and event recordings.",  cta:"Watch Now",     tag:"VIDEO",        link:"https://www.youtube.com/@EigenCloud" },
  { name:"GitHub",   sub:"Open source. Fork it, star it, ship it.",       cta:"Explore Repos", tag:"OPEN SOURCE",  link:"https://github.com/Layr-Labs" },
  { name:"Blog",     sub:"Research and the thinking behind EigenCloud.",  cta:"Read Posts",    tag:"WRITING",      link:"https://blog.eigencloud.xyz" },
];

const XIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
    <path d="M9.14 1.5h1.6L7.13 5.33 11.33 10.5H8.04L5.5 7.2 2.6 10.5H1L4.77 6.4 0.77 1.5h3.37l2.3 3.05L9.14 1.5zM8.56 9.6h.88L3.5 2.4H2.56L8.56 9.6z"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
    <circle cx="6" cy="6" r="5"/>
    <path d="M6 1c-1.5 1.5-2.5 3-2.5 5s1 3.5 2.5 5M6 1c1.5 1.5 2.5 3 2.5 5S7.5 9.5 6 11M1 6h10"/>
  </svg>
);
const AgentDot = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <circle cx="9" cy="9" r="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
    <line x1="9" y1="1" x2="9" y2="4" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    <line x1="9" y1="14" x2="9" y2="17" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    <line x1="1" y1="9" x2="4" y2="9" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    <line x1="14" y1="9" x2="17" y2="9" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
  </svg>
);

function EigenEcosystem() {
  const [tab, setTab]     = useState("Agents");
  const [hov, setHov]     = useState(null);
  const [catFilter, setCatFilter] = useState("All");
  const [ready, setReady] = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 60); }, []);

  const allCats = ["All", ...Array.from(new Set(ideas.map(i => i.cat)))];
  const filteredIdeas = catFilter === "All" ? ideas : ideas.filter(i => i.cat === catFilter);

  const css = [
    "@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap');",
    "*{box-sizing:border-box;margin:0;padding:0}",
    "body{background:#0a0a0a;color:#fff}",
    "@keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}",
    "@keyframes blink{0%,100%{opacity:1}50%{opacity:0.1}}",
    ".btn{transition:all .15s;cursor:pointer}.btn:hover{background:#fff!important;color:#0a0a0a!important;border-color:#fff!important}",
    ".btnout{transition:all .15s;cursor:pointer}.btnout:hover{background:#fff!important;color:#0a0a0a!important}",
    ".vtab{cursor:pointer;border:none;transition:all .12s}.vtab:hover{color:#fff!important}",
    ".card{transition:border-color .18s;cursor:default}.card:hover{border-color:rgba(192,132,252,0.4)!important}",
    ".icard{transition:border-color .18s,background .18s}.icard:hover{border-color:rgba(192,132,252,0.35)!important;background:rgba(192,132,252,0.05)!important}",
    ".irow{transition:background .12s}.irow:hover{background:rgba(255,255,255,0.04)!important}",
    ".dtile{transition:all .12s}.dtile:hover{background:rgba(255,255,255,0.05)!important;border-color:rgba(255,255,255,0.2)!important}",
    ".clink{transition:background .12s}.clink:hover{background:rgba(255,255,255,0.04)!important}",
    ".navcta{transition:all .12s;cursor:pointer}.navcta:hover{background:#fff!important;color:#0a0a0a!important}",
    ".iconbtn{transition:all .15s;cursor:pointer}.iconbtn:hover{background:#fff!important;color:#0a0a0a!important;border-color:#fff!important}",
    ".catbtn{transition:all .12s;cursor:pointer}.catbtn:hover{border-color:rgba(192,132,252,0.6)!important;color:#c084fc!important}",
  ].join(" ");

  return (
    <div style={{ minHeight:"100vh", background:"#0a0a0a", color:"#fff", fontFamily:"'IBM Plex Sans', sans-serif", overflowX:"hidden" }}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, height:56, borderBottom:"1px solid rgba(255,255,255,0.1)", background:"rgba(10,10,10,0.92)", backdropFilter:"blur(16px)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 36px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:24, height:24, background:"#fff", borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z" fill="#0a0a0a"/></svg>
          </div>
          <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontWeight:400, fontSize:13, color:"rgba(255,255,255,0.85)", letterSpacing:".02em" }}>eigen / ecosystem</span>
        </div>
        <div style={{ display:"flex" }}>
          {TABS.map((t,i) => (
            <button key={t} className="vtab" onClick={() => setTab(t)}
              style={{ padding:"6px 20px", fontFamily:"'IBM Plex Mono', monospace", fontWeight:400, fontSize:12, letterSpacing:".05em", color:tab===t?"#0a0a0a":"rgba(255,255,255,0.35)", background:tab===t?"#fff":"transparent", borderLeft:i===0?"1px solid rgba(255,255,255,0.15)":"none", borderRight:"1px solid rgba(255,255,255,0.15)", borderTop:"none", borderBottom:"none" }}>
              {t}
            </button>
          ))}
        </div>
        <a href="https://forms.gle/j2muPccmK6PHc1kQA" target="_blank" rel="noopener noreferrer" className="navcta"
          style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 14px", border:"1px solid rgba(255,255,255,0.25)", background:"transparent", color:"#fff", fontFamily:"'IBM Plex Mono', monospace", fontSize:11, letterSpacing:".06em", textDecoration:"none" }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:"#fff", animation:"blink 1.2s infinite" }}/>
          $10K CHALLENGE
        </a>
      </nav>

      {/* ═══════════════ AGENTS PAGE (has hero) ═══════════════ */}
      {tab === "Agents" && (
        <div style={{ opacity:ready?1:0, animation:ready?"up .55s ease forwards":"none" }}>
          {/* HERO */}
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"80px 36px 64px", position:"relative" }}>
            <div style={{ position:"relative", zIndex:1, maxWidth:580 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"3px 10px", border:"1px solid rgba(255,255,255,0.15)", borderRadius:2, marginBottom:24 }}>
                <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.4)", letterSpacing:".14em" }}>VERIFIABLE CLOUD</span>
                <span style={{ width:1, height:8, background:"rgba(255,255,255,0.15)" }}/>
                <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.4)", letterSpacing:".14em" }}>AGENTIC ERA</span>
              </div>
              <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:"clamp(42px,5vw,72px)", lineHeight:1.05, letterSpacing:"-.01em", marginBottom:20, color:"#fff" }}>
                The internet is getting<br/>
                <em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.65)" }}>an agent layer.</em>
              </h1>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.45)", maxWidth:460, lineHeight:1.8, marginBottom:36, fontWeight:300 }}>
                Agents need trust. EigenCloud gives them cryptographic proof. Explore verifiable agents, open ideas, and the builders making it real.
              </p>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={() => setTab("Agents")} className="btn"
                  style={{ padding:"10px 24px", border:"1px solid rgba(255,255,255,0.9)", background:"#fff", color:"#0a0a0a", fontFamily:"'IBM Plex Mono', monospace", fontWeight:400, fontSize:12, letterSpacing:".05em" }}>
                  Explore Agents
                </button>
                <a href="https://forms.gle/j2muPccmK6PHc1kQA" target="_blank" rel="noopener noreferrer" className="btnout"
                  style={{ padding:"10px 24px", border:"1px solid rgba(255,255,255,0.25)", background:"transparent", color:"rgba(255,255,255,0.7)", fontFamily:"'IBM Plex Mono', monospace", fontWeight:400, fontSize:12, letterSpacing:".05em", textDecoration:"none", display:"inline-flex", alignItems:"center" }}>
                  Win $10,000
                </a>
              </div>
            </div>
          </div>

          {/* FEATURED AGENTS */}
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 36px 100px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:28, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
              <div>
                <h2 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:30, letterSpacing:"-.01em", marginBottom:4 }}>Featured Agents</h2>
                <p style={{ color:"rgba(255,255,255,0.35)", fontSize:13, fontWeight:300 }}>Real agents. Real proofs. Zero trust required.</p>
              </div>
              <a href="https://docs.eigencloud.xyz" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:10, color:"rgba(255,255,255,0.2)", letterSpacing:".08em", textDecoration:"none" }}>VIEW DOCS</a>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
              {agents.map((a, i) => (
                <div key={a.id} className="card"
                  onMouseEnter={() => setHov(a.id)} onMouseLeave={() => setHov(null)}
                  style={{ border:"1px solid rgba(255,255,255,0.1)", padding:"22px 20px", background:"rgba(255,255,255,0.03)", display:"flex", flexDirection:"column", animation:"up .4s ease "+(i*.05)+"s both", borderRadius:2 }}>
                  <div style={{ marginBottom:16 }}><AgentDot/></div>
                  <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:17, letterSpacing:"-.01em", marginBottom:6, color:"#fff", lineHeight:1.25 }}>{a.name}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.45)", lineHeight:1.7, fontWeight:300, marginBottom:16, flexGrow:1 }}>{a.desc}</div>
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:16 }}>
                    {a.tags.map(tag => (
                      <span key={tag} style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.4)", border:"1px solid rgba(255,255,255,0.12)", padding:"2px 7px", letterSpacing:".06em", borderRadius:2 }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:12, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
                    <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:".04em" }}>by {a.author}</span>
                    <div style={{ display:"flex", gap:5 }}>
                      <a href={a.x} target="_blank" rel="noopener noreferrer" className="iconbtn"
                        style={{ width:26, height:26, border:"1px solid rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.5)", textDecoration:"none", background:"transparent", borderRadius:2 }}>
                        <XIcon/>
                      </a>
                      <a href={a.link} target="_blank" rel="noopener noreferrer" className="iconbtn"
                        style={{ width:26, height:26, border:"1px solid rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.5)", textDecoration:"none", background:"transparent", borderRadius:2 }}>
                        <GlobeIcon/>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:28, padding:"28px 32px", border:"1px solid rgba(255,255,255,0.12)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20, background:"rgba(255,255,255,0.02)", borderRadius:2 }}>
              <div>
                <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:".14em", marginBottom:8 }}>OPEN INNOVATION CHALLENGE</div>
                <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:22, marginBottom:5 }}>Build a Verifiable Agent. Win $10,000.</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontWeight:300 }}>Best agent takes $10K. Top 5 get EigenCompute credits. Utility only.</div>
              </div>
              <a href="https://forms.gle/j2muPccmK6PHc1kQA" target="_blank" rel="noopener noreferrer" className="btn"
                style={{ padding:"10px 24px", border:"1px solid rgba(255,255,255,0.8)", background:"#fff", color:"#0a0a0a", fontFamily:"'IBM Plex Mono', monospace", fontSize:11, letterSpacing:".05em", textDecoration:"none", whiteSpace:"nowrap", borderRadius:2 }}>
                Submit Your Agent
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ IDEAS PAGE ═══════════════ */}
      {tab === "Ideas" && (
        <div style={{ animation:"up .35s ease forwards" }}>
          {/* Ideas page header */}
          <div style={{ borderBottom:"1px solid rgba(255,255,255,0.08)", padding:"48px 36px 36px", maxWidth:1100, margin:"0 auto" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"3px 10px", border:"1px solid rgba(192,132,252,0.3)", borderRadius:2, marginBottom:20 }}>
              <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(192,132,252,0.8)", letterSpacing:".14em" }}>46 IDEAS · OPEN TO BUILD</span>
            </div>
            <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:"clamp(36px,4vw,58px)", lineHeight:1.06, letterSpacing:"-.01em", marginBottom:16, maxWidth:640 }}>
              Ideas Worth Building.<br/><em style={{ fontStyle:"italic", color:"rgba(255,255,255,0.5)" }}>Pick one. Fork it. Ship it.</em>
            </h1>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", maxWidth:520, lineHeight:1.8, fontWeight:300, marginBottom:28 }}>
              A curated catalog powered by TEEs, verifiable compute, and autonomous agents. Every idea here is open for anyone to build. Trust is built on math, not promises.
            </p>
            {/* Category filter */}
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {allCats.map(c => (
                <button key={c} className="catbtn" onClick={() => setCatFilter(c)}
                  style={{ padding:"4px 12px", border:"1px solid "+(catFilter===c?"rgba(192,132,252,0.7)":"rgba(255,255,255,0.12)"), background:catFilter===c?"rgba(192,132,252,0.12)":"transparent", color:catFilter===c?"#c084fc":"rgba(255,255,255,0.4)", fontFamily:"'IBM Plex Mono', monospace", fontSize:10, letterSpacing:".06em", borderRadius:2 }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Ideas grid */}
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 36px 80px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
              {filteredIdeas.map((idea, i) => (
                <div key={idea.name} className="icard"
                  style={{ border:"1px solid rgba(255,255,255,0.09)", borderRadius:2, padding:"22px 20px", background:"rgba(255,255,255,0.02)", display:"flex", flexDirection:"column", gap:0, animation:"up .35s ease "+(i*.03)+"s both" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                    <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color: catColors[idea.cat] || "#c084fc", letterSpacing:".1em", padding:"2px 7px", border:"1px solid "+(catColors[idea.cat]||"#c084fc")+"40", borderRadius:2, background:(catColors[idea.cat]||"#c084fc")+"10" }}>
                      {idea.cat.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:16, color:"#fff", marginBottom:10, lineHeight:1.25 }}>{idea.name}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.42)", lineHeight:1.72, fontWeight:300, flexGrow:1 }}>{idea.desc}</div>
                  <div style={{ marginTop:16, paddingTop:12, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                    <a href="https://docs.eigencloud.xyz/eigencompute/get-started/quickstart" target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:10, color:"rgba(255,255,255,0.25)", letterSpacing:".06em", textDecoration:"none", transition:"color .12s" }}
                      onMouseEnter={e => e.target.style.color="rgba(192,132,252,0.8)"}
                      onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.25)"}>
                      BUILD THIS &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Challenge strip */}
            <div style={{ marginTop:40, padding:"28px 32px", border:"1px solid rgba(192,132,252,0.2)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20, background:"rgba(192,132,252,0.04)", borderRadius:2 }}>
              <div>
                <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(192,132,252,0.7)", letterSpacing:".14em", marginBottom:8 }}>OPEN INNOVATION CHALLENGE</div>
                <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:22, marginBottom:5 }}>Build a Verifiable Agent. Win $10,000.</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontWeight:300 }}>Best agent takes $10K. Top 5 get EigenCompute credits. No tokenized agents.</div>
              </div>
              <a href="https://forms.gle/j2muPccmK6PHc1kQA" target="_blank" rel="noopener noreferrer" className="btn"
                style={{ padding:"10px 24px", border:"1px solid rgba(255,255,255,0.8)", background:"#fff", color:"#0a0a0a", fontFamily:"'IBM Plex Mono', monospace", fontSize:11, letterSpacing:".05em", textDecoration:"none", whiteSpace:"nowrap", borderRadius:2 }}>
                Submit Your Agent
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ DOCS PAGE ═══════════════ */}
      {tab === "Docs" && (
        <div style={{ animation:"up .35s ease forwards" }}>
          <div style={{ borderBottom:"1px solid rgba(255,255,255,0.08)", padding:"48px 36px 36px", maxWidth:1100, margin:"0 auto" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"3px 10px", border:"1px solid rgba(255,255,255,0.12)", borderRadius:2, marginBottom:20 }}>
              <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:".14em" }}>DOCUMENTATION</span>
            </div>
            <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:"clamp(36px,4vw,58px)", lineHeight:1.06, letterSpacing:"-.01em", marginBottom:16 }}>
              Build Without Limits.
            </h1>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", maxWidth:480, lineHeight:1.8, fontWeight:300 }}>
              Everything you need to ship verifiable apps and agents. Zero fluff. Start in minutes.
            </p>
          </div>
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 36px 80px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", marginBottom:16, overflow:"hidden", borderRadius:2 }}>
              {docCards.map((d, i) => (
                <a key={d.label} href={d.link} target="_blank" rel="noopener noreferrer" className="dtile"
                  style={{ display:"block", padding:"26px 22px", background:"#0a0a0a", borderBottom:i<3?"1px solid rgba(255,255,255,0.07)":"none", textDecoration:"none", animation:"up .4s ease "+(i*.05)+"s both" }}>
                  <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.25)", letterSpacing:".14em", marginBottom:10 }}>{d.tag}</div>
                  <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:18, marginBottom:6, color:"#fff" }}>{d.label}</div>
                  <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", lineHeight:1.6, fontWeight:300 }}>{d.sub}</div>
                </a>
              ))}
            </div>
            <div style={{ padding:"16px 20px", border:"1px solid rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, borderRadius:2 }}>
              <div>
                <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.25)", letterSpacing:".1em", marginBottom:5 }}>CLI QUICKSTART</div>
                <code style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:12, color:"rgba(255,255,255,0.7)", background:"rgba(255,255,255,0.05)", padding:"4px 10px", border:"1px solid rgba(255,255,255,0.1)", borderRadius:2 }}>npm install -g @eigencloud/cli</code>
              </div>
              <a href="https://docs.eigencloud.xyz/eigencompute/get-started/quickstart" target="_blank" rel="noopener noreferrer" className="btnout"
                style={{ padding:"8px 18px", border:"1px solid rgba(255,255,255,0.25)", background:"transparent", color:"rgba(255,255,255,0.7)", fontFamily:"'IBM Plex Mono', monospace", fontSize:10, letterSpacing:".06em", textDecoration:"none", borderRadius:2 }}>
                READ THE DOCS
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ COMMUNITY PAGE ═══════════════ */}
      {tab === "Community" && (
        <div style={{ animation:"up .35s ease forwards" }}>
          <div style={{ borderBottom:"1px solid rgba(255,255,255,0.08)", padding:"48px 36px 36px", maxWidth:1100, margin:"0 auto" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"3px 10px", border:"1px solid rgba(255,255,255,0.12)", borderRadius:2, marginBottom:20 }}>
              <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:".14em" }}>COMMUNITY</span>
            </div>
            <h1 style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:"clamp(36px,4vw,58px)", lineHeight:1.06, letterSpacing:"-.01em", marginBottom:16 }}>
              Join the Builders.
            </h1>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", maxWidth:480, lineHeight:1.8, fontWeight:300 }}>
              The people making the verifiable internet real. Don't build alone.
            </p>
          </div>
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 36px 80px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:1, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", marginBottom:28, overflow:"hidden", borderRadius:2 }}>
              {communityLinks.map((c, i) => (
                <a key={c.name} href={c.link} target="_blank" rel="noopener noreferrer" className="clink"
                  style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"22px 24px", background:"#0a0a0a", textDecoration:"none", gap:16, animation:"up .4s ease "+(i*.06)+"s both" }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:17, color:"#fff" }}>{c.name}</span>
                      <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.25)", letterSpacing:".08em", padding:"1px 5px", border:"1px solid rgba(255,255,255,0.1)", borderRadius:2 }}>{c.tag}</span>
                    </div>
                    <p style={{ fontSize:12, color:"rgba(255,255,255,0.35)", lineHeight:1.5, fontWeight:300 }}>{c.sub}</p>
                  </div>
                  <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:10, color:"rgba(255,255,255,0.35)", whiteSpace:"nowrap", letterSpacing:".04em", flexShrink:0 }}>{c.cta} &rarr;</span>
                </a>
              ))}
            </div>

            {/* Community videos */}
            <div style={{ marginBottom:28, padding:"24px 28px", border:"1px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.02)", borderRadius:2 }}>
              <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:".14em", marginBottom:10 }}>VIDEOS FROM BUILDERS</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(2, minmax(0,1fr))", gap:16 }}>
                <div style={{ borderRadius:2, overflow:"hidden", border:"1px solid rgba(255,255,255,0.1)", background:"#0a0a0a" }}>
                  <iframe
                    title="Eigen video - gajesh"
                    src="https://twitframe.com/show?url=https://x.com/gajesh/status/2024630856892190854"
                    style={{ width:"100%", height:380, border:"none" }}
                    allow="autoplay; fullscreen; picture-in-picture"
                  />
                </div>
                <div style={{ borderRadius:2, overflow:"hidden", border:"1px solid rgba(255,255,255,0.1)", background:"#0a0a0a" }}>
                  <iframe
                    title="Eigen video - zeeshan"
                    src="https://twitframe.com/show?url=https://x.com/zeeshan_utd/status/2027375700618158483"
                    style={{ width:"100%", height:380, border:"none" }}
                    allow="autoplay; fullscreen; picture-in-picture"
                  />
                </div>
              </div>
            </div>

            <div style={{ padding:"32px 36px", border:"1px solid rgba(255,255,255,0.1)", textAlign:"center", background:"rgba(255,255,255,0.02)", borderRadius:2 }}>
              <div style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.25)", letterSpacing:".14em", marginBottom:12 }}>OPEN INNOVATION CHALLENGE</div>
              <div style={{ fontFamily:"'Instrument Serif', serif", fontWeight:400, fontSize:28, marginBottom:10 }}>Build a Verifiable Agent. Win $10,000.</div>
              <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14, maxWidth:420, margin:"0 auto 24px", lineHeight:1.75, fontWeight:300 }}>The community is watching. Build a verifiable or sovereign agent. Utility only.</p>
              <a href="https://forms.gle/j2muPccmK6PHc1kQA" target="_blank" rel="noopener noreferrer" className="btn"
                style={{ display:"inline-block", padding:"11px 28px", border:"1px solid rgba(255,255,255,0.8)", background:"#fff", color:"#0a0a0a", fontFamily:"'IBM Plex Mono', monospace", fontSize:12, letterSpacing:".05em", textDecoration:"none", borderRadius:2 }}>
                Submit Your Agent
              </a>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", padding:"20px 36px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:20, height:20, background:"#fff", borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z" fill="#0a0a0a"/></svg>
          </div>
          <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:11, color:"rgba(255,255,255,0.3)" }}>eigen/ecosystem</span>
        </div>
        <div style={{ display:"flex", gap:24 }}>
          {[["eigencloud.xyz","https://eigencloud.xyz"],["Docs","https://docs.eigencloud.xyz"],["Ideas","https://ideas.eigencloud.xyz"],["Discord","https://discord.gg/eigenlayer"]].map(([l,h]) => (
            <a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{ color:"rgba(255,255,255,0.2)", fontSize:11, textDecoration:"none", fontFamily:"'IBM Plex Mono', monospace", letterSpacing:".04em" }}>{l}</a>
          ))}
        </div>
        <span style={{ fontFamily:"'IBM Plex Mono', monospace", fontSize:9, color:"rgba(255,255,255,0.12)", letterSpacing:".1em" }}>VERIFIABLE · SOVEREIGN · TRUSTLESS</span>
      </div>
    </div>
  );
}
