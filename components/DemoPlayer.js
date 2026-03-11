'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

// ─── VOICE ────────────────────────────────────────────────────────────────────
const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL' // Casey Kim — confident, urgent

// ─── DEMO SCENES ─────────────────────────────────────────────────────────────
const SCENES = [
  {
    id: 1,
    num: '01',
    title: 'Predictive Transition Scoring',
    subtitle: 'APEX Recruiting Intelligence',
    url: 'mapex.huit.ai/dashboard',
    color: '#00D4FF',
    screen: 'apex_candidates',
    script: `Before I show you the technology, let me give you the problem it solves. Every mortgage recruiter in the country is guessing. They're cold calling anyone with an NMLS number, hoping something lands. APEX doesn't guess. It reads fourteen public data sources, scores sixteen weighted factors, and tells you exactly who is about to move — and why — with a sixty-day precision window. Let me show you a live example. This is Sarah Martinez. She's producing eighty-four million a year at Caliber in Phoenix. Her Transition Likelihood Score is eighty-four out of one hundred — flagged IMMINENT. That score didn't come from a hunch. It came from a restructuring announcement at her parent company, a forty-two percent production drop in Q4, and a compensation alignment gap of thirty-eight thousand dollars versus market. Click into her card and you get a sixteen-factor breakdown — and a six-week outreach execution plan, auto-generated, with pitch scripts, objection handlers, and a ranked list of ten company fits. All from a single NMLS number.`,
    callouts: [
      { at: 8,  label: 'Data Sources', value: '14 Public Feeds', x: 72, y: 18 },
      { at: 16, label: 'Factors Scored', value: '16 Weighted', x: 72, y: 30 },
      { at: 26, label: 'Sarah Martinez', value: 'TLS 84 / IMMINENT', x: 62, y: 44 },
      { at: 42, label: 'Comp Gap', value: '−$38K vs Market', x: 62, y: 60 },
      { at: 58, label: 'Auto-Generated', value: '6-Week Playbook', x: 62, y: 76 },
    ],
  },
  {
    id: 2,
    num: '02',
    title: 'HMDA Market Intelligence',
    subtitle: 'Ranked LO Identification',
    url: 'mapex.huit.ai/dashboard → Market Intel',
    color: '#7C3AED',
    screen: 'market_intel',
    script: `The HMDA database is the single most underutilized competitive intelligence asset in the mortgage industry. It contains every originated loan in America, by lender, by geography, by product type — seven years of it. We've loaded all seven years — 2017 through 2024 — into a live query engine. I can tell you, right now, who the top eighteen producers in the Nashville market are, which company they're at, and what their production trend looks like. This is the Market Intel tab. Nashville, Tennessee. Two hundred fourteen active loan officers ranked by origination volume. The top tier — the eighteen we call Market Movers — are the producers most likely to be recruitable based on their TLS profile crossing into receptive territory. You can filter by state, by metro, by production tier, by loan type. You can pull any market in the country in under sixty seconds. Seven years of HMDA data, fully indexed. Something no competing platform offers at this price point.`,
    callouts: [
      { at: 10, label: 'Data Loaded', value: '7 Years HMDA', x: 65, y: 18 },
      { at: 22, label: 'Nashville, TN', value: '214 Active LOs', x: 65, y: 34 },
      { at: 34, label: 'Market Movers', value: '18 Recruitable', x: 65, y: 50 },
      { at: 50, label: 'Query Speed', value: 'Under 60 Seconds', x: 65, y: 66 },
    ],
  },
  {
    id: 3,
    num: '03',
    title: 'Retention Risk Monitor',
    subtitle: 'TLS Flight Risk Alerts',
    url: 'mapex.huit.ai/pulse',
    color: '#F59E0B',
    screen: 'retention_risk',
    script: `Recruiting is half the equation. The other half is retention. The average mortgage company loses thirty to forty percent of its loan officer base annually. Most of those departures are completely predictable — if you're watching the right signals. APEX monitors fourteen data signals in real time. When someone's flight risk score crosses a threshold, you get an alert — before they've taken a call from a competitor. This is James Rodriguez. He's been with your company for three years in Houston. His Transition Likelihood Score is sixty-seven out of one hundred — and it climbed thirty-six points in sixty days. That thirty-six point swing is the exact pattern our backtesting showed predicted departure with eighty-six percent accuracy across a one hundred thirty loan officer cohort. His intent signal shows frustrated. He hasn't posted publicly. He hasn't moved yet. But the data says: this manager needs to have a conversation with James this week — not next quarter.`,
    callouts: [
      { at: 12, label: 'LO Attrition Rate', value: '30–40% Annual', x: 64, y: 20 },
      { at: 24, label: 'James Rodriguez', value: 'Risk Score 67/100', x: 64, y: 36 },
      { at: 36, label: 'TLS Delta', value: '+36 pts / 60 Days', x: 64, y: 52 },
      { at: 48, label: 'Accuracy', value: '86% Predictive', x: 64, y: 68 },
    ],
  },
  {
    id: 4,
    num: '04',
    title: 'Property Pulse Equity Engine',
    subtitle: 'Past Borrower Re-Engagement',
    url: 'mapex.huit.ai/pulse → Equity Alerts',
    color: '#10B981',
    screen: 'property_pulse',
    script: `The highest-value leads in any loan officer's database are the people they've already closed. Property Pulse monitors your past borrower portfolio for three triggers: equity accumulation, rate drop opportunity, and life event signals. When a trigger fires, it auto-initiates a three-touch outreach sequence — text, email, then a call prompt. This is a real borrower scenario. Home value: four hundred forty-seven thousand dollars. Current rate: seven point two-five percent. Today's market rate: six point five-eight percent. That's a sixty-seven basis point delta. Estimated equity: two hundred twenty-five thousand dollars. Two alert triggers just fired: refinance savings opportunity and cash-out eligibility. The system automatically drafts the first SMS — sent within minutes of the trigger. The loan officer gets a notification: call this borrower today. No manual tracking. No leads falling through. The AI is monitoring every property in the portfolio, every morning, while the loan officer is already on calls.`,
    callouts: [
      { at: 10, label: 'Triggers', value: 'Equity · Rate · Life Event', x: 62, y: 20 },
      { at: 22, label: 'Property Value', value: '$447,000 AVM', x: 62, y: 34 },
      { at: 30, label: 'Rate Delta', value: '7.25% → 6.58% (−67bps)', x: 62, y: 48 },
      { at: 38, label: 'Equity Available', value: '$225,000', x: 62, y: 62 },
      { at: 52, label: 'Sequence Fired', value: 'SMS → Email → Call', x: 62, y: 76 },
    ],
  },
  {
    id: 5,
    num: '05',
    title: 'AI Lead Scoring Engine',
    subtitle: '91/100 Score in 48 Hours',
    url: 'crmex-huit-agent-ai.vercel.app',
    color: '#EF4444',
    screen: 'lead_scoring',
    script: `Speed to lead is the single biggest variable in mortgage conversion. The data is clear: first contact wins. But when you're running twenty-plus leads simultaneously, you can't call everyone immediately. You need to know who to call first. Our AI scoring engine reads behavioral signals — form fills, SMS response speed, open rates, keyword patterns — and assigns a zero to one hundred score in real time. Marcus Tran hit ninety-four out of one hundred within forty-eight hours of his first touch. He's in Wasilla, Alaska, looking at a cash-out refinance on a four hundred eighty-five thousand dollar property with one hundred eighty-two thousand dollars in equity. Score ninety-four. HOT. Call him now. Jennifer Kowalski: ninety-one, Eagle River, VA loan, HOT. Below the hot leads panel: twenty-two additional leads auto-enrolled in nurture sequences. The AI is working the pipeline twenty-four hours a day while the loan officer is focused on the top three.`,
    callouts: [
      { at: 14, label: 'Marcus Tran', value: 'Score 94 / HOT', x: 62, y: 22 },
      { at: 24, label: 'Cash-Out Refi', value: '$485K | $182K Equity', x: 62, y: 36 },
      { at: 34, label: 'Jennifer K.', value: 'Score 91 / HOT', x: 62, y: 50 },
      { at: 46, label: 'Auto-Nurture', value: '22 Leads Enrolled', x: 62, y: 64 },
    ],
  },
  {
    id: 6,
    num: '06',
    title: 'Huit Agent AI',
    subtitle: '90-Second Qualification',
    url: 'crmex-huit-agent-ai.vercel.app',
    color: '#8B5CF6',
    screen: 'agent_ai',
    script: `The mortgage industry loses deals at eleven PM every single night. A qualified buyer submits a form. Nobody responds. They move on to the next lender. Huit Agent AI responds in ninety seconds, any time of day or night. It has access to nine live CRM tools: lead lookup, rate data, property values, pipeline status, email drafting — all live. It doesn't just respond — it qualifies. Diana Lane submitted a purchase inquiry at eleven-oh-four PM. By eleven-sixteen PM, Huit Agent AI had gathered her loan type, estimated property value, timeline, and credit range — and scheduled a callback with a licensed loan officer for the following morning. Watch what happens when I type into the chat: "Who should I call today?" — it immediately surfaces Marcus Tran from the hot leads queue. "Draft a rate alert email for Marcus" — it composes a personalized outreach in seconds using his live loan data. Nine live CRM tools. Natural language. Ninety seconds. This is what an AI co-pilot actually looks like when it has real data access.`,
    callouts: [
      { at: 10, label: 'Response Time', value: '< 90 Seconds', x: 58, y: 20 },
      { at: 20, label: 'CRM Tools', value: '9 Live Integrations', x: 58, y: 34 },
      { at: 30, label: 'Diana Lane', value: '11:04 PM → Pre-Qual', x: 58, y: 48 },
      { at: 44, label: 'Marcus Tran', value: 'Surfaced from Queue', x: 58, y: 62 },
      { at: 56, label: 'Email Drafted', value: 'Live Loan Data Used', x: 58, y: 76 },
    ],
  },
]

// ─── MOCK SCREENS ─────────────────────────────────────────────────────────────

function ApexCandidatesScreen({ calloutActive }) {
  const candidates = [
    { name: 'Sarah Martinez', company: 'Caliber Home Loans', market: 'Phoenix, AZ', score: 84, tier: 'IMMINENT', intent: 'Ready to Move', vol: '$84M', active: true },
    { name: 'David Chen', company: 'Guaranteed Rate', market: 'Scottsdale, AZ', score: 76, tier: 'MOBILE', intent: 'Interested', vol: '$61M', active: false },
    { name: 'Amanda Torres', company: 'UWM', market: 'Tempe, AZ', score: 71, tier: 'MOBILE', intent: 'Neutral', vol: '$49M', active: false },
    { name: 'Brian Walsh', company: 'Movement Mortgage', market: 'Mesa, AZ', score: 58, tier: 'RECEPTIVE', intent: 'Interested', vol: '$38M', active: false },
    { name: 'Linda Park', company: 'Rocket Mortgage', market: 'Chandler, AZ', score: 44, tier: 'RECEPTIVE', intent: 'Neutral', vol: '$29M', active: false },
  ]
  const tierColors = { IMMINENT: '#FF3B5C', MOBILE: '#F59E0B', RECEPTIVE: '#00D4FF' }
  const intentColors = { 'Ready to Move': '#10B981', Interested: '#00D4FF', Neutral: '#6B7280' }

  return (
    <div style={{ background: '#060C14', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Top bar */}
      <div style={{ background: '#0A1628', borderBottom: '1px solid rgba(0,212,255,0.15)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ color: '#00D4FF', fontWeight: 700, fontSize: 13, letterSpacing: 3 }}>APEX</span>
        <span style={{ color: '#374151', fontSize: 11 }}>|</span>
        {['Dashboard', 'Candidates', 'Market Intel', 'Pulse'].map(t => (
          <span key={t} style={{ fontSize: 11, color: t === 'Candidates' ? '#00D4FF' : '#6B7280', borderBottom: t === 'Candidates' ? '1px solid #00D4FF' : 'none', paddingBottom: 2, cursor: 'pointer' }}>{t}</span>
        ))}
        <div style={{ marginLeft: 'auto', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 4, padding: '4px 12px', fontSize: 11, color: '#00D4FF' }}>247 Candidates</div>
      </div>

      {/* Filters row */}
      <div style={{ padding: '10px 20px', display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {['All Tiers', 'IMMINENT', 'MOBILE', 'RECEPTIVE'].map(f => (
          <div key={f} style={{ background: f === 'IMMINENT' ? 'rgba(255,59,92,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${f === 'IMMINENT' ? '#FF3B5C' : 'rgba(255,255,255,0.08)'}`, borderRadius: 4, padding: '3px 10px', fontSize: 10, color: f === 'IMMINENT' ? '#FF3B5C' : '#6B7280', cursor: 'pointer' }}>{f}</div>
        ))}
        <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, padding: '3px 12px', fontSize: 10, color: '#6B7280' }}>Phoenix Metro ▾</div>
      </div>

      {/* Table header */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 100px 110px 80px 80px', gap: 0, padding: '8px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 9, color: '#374151', letterSpacing: 2 }}>
        {['CANDIDATE', 'COMPANY / MARKET', 'VOLUME', 'TLS SCORE', 'TIER', 'INTENT', ''].map(h => <span key={h}>{h}</span>)}
      </div>

      {/* Rows */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {candidates.map((c, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 100px 110px 80px 80px',
            padding: '11px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)',
            background: c.active ? 'rgba(0,212,255,0.04)' : 'transparent',
            border: c.active ? '1px solid rgba(0,212,255,0.12)' : '1px solid transparent',
            borderRadius: c.active ? 4 : 0,
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: c.active ? '#E2E8F0' : '#9CA3AF' }}>{c.name}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#6B7280' }}>{c.company}</div>
              <div style={{ fontSize: 10, color: '#374151' }}>{c.market}</div>
            </div>
            <div style={{ fontSize: 12, color: c.active ? '#10B981' : '#6B7280', fontWeight: 600 }}>{c.vol}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', border: `2px solid ${tierColors[c.tier]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: tierColors[c.tier], background: `${tierColors[c.tier]}18`, animation: c.active ? 'pulse 2s infinite' : 'none' }}>
                {c.score}
              </div>
            </div>
            <div style={{ background: `${tierColors[c.tier]}18`, border: `1px solid ${tierColors[c.tier]}44`, borderRadius: 3, padding: '2px 8px', fontSize: 9, color: tierColors[c.tier], letterSpacing: 1, textAlign: 'center' }}>{c.tier}</div>
            <div style={{ fontSize: 10, color: intentColors[c.intent] }}>{c.intent}</div>
            {c.active && <div style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 3, padding: '3px 8px', fontSize: 9, color: '#00D4FF', cursor: 'pointer', textAlign: 'center' }}>ANALYZE</div>}
          </div>
        ))}
      </div>

      {/* Bottom AI panel for Sarah */}
      <div style={{ borderTop: '1px solid rgba(0,212,255,0.15)', background: '#0A1628', padding: 16 }}>
        <div style={{ fontSize: 9, color: '#00D4FF', letterSpacing: 2, marginBottom: 10 }}>AI MATCH ANALYSIS — SARAH MARTINEZ</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {[
            { label: 'Production Fit', score: 92 },
            { label: 'Culture Alignment', score: 87 },
            { label: 'Comp Delta', score: 84 },
            { label: 'Non-Compete Risk', score: 91 },
          ].map(f => (
            <div key={f.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 4, padding: '8px 10px' }}>
              <div style={{ fontSize: 9, color: '#6B7280', marginBottom: 4 }}>{f.label}</div>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                <div style={{ width: `${f.score}%`, height: '100%', background: '#00D4FF', borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 11, color: '#00D4FF', marginTop: 4, fontWeight: 700 }}>{f.score}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 10, color: '#6B7280' }}>6-Week Outreach Plan Generated · 10 Company Fits Ranked · Pitch Scripts Ready</div>
      </div>
      <style>{`@keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(0,212,255,0.4); } 50% { box-shadow: 0 0 0 6px rgba(0,212,255,0); } }`}</style>
    </div>
  )
}

function MarketIntelScreen() {
  const lOs = [
    { rank: 1, name: 'Jordan Ellis', company: 'Benchmark Mortgage', vol: '$142M', units: 312, tier: 'MOVER', tls: 82 },
    { rank: 2, name: 'Priya Nair', company: 'CrossCountry Mortgage', vol: '$118M', units: 267, tier: 'MOVER', tls: 78 },
    { rank: 3, name: 'Carlos Vega', company: 'Movement Mortgage', vol: '$97M', units: 228, tier: 'MOVER', tls: 74 },
    { rank: 4, name: 'Ashley Monroe', company: 'Fairway Independent', vol: '$83M', units: 194, tier: 'MOVER', tls: 71 },
    { rank: 5, name: 'Kevin Park', company: 'Caliber Home Loans', vol: '$71M', units: 162, tier: 'MOVER', tls: 68 },
    { rank: 6, name: 'Denise Carter', company: 'Guaranteed Rate', vol: '$64M', units: 149, tier: 'TARGET', tls: 55 },
    { rank: 7, name: 'Marcus Webb', company: 'United Wholesale', vol: '$58M', units: 134, tier: 'TARGET', tls: 48 },
  ]
  return (
    <div style={{ background: '#060C14', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: "'JetBrains Mono', monospace" }}>
      <div style={{ background: '#0A1628', borderBottom: '1px solid rgba(124,58,237,0.2)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: '#7C3AED', fontWeight: 700, fontSize: 13, letterSpacing: 3 }}>APEX</span>
        <span style={{ color: '#374151' }}>|</span>
        <span style={{ color: '#7C3AED', fontSize: 11, borderBottom: '1px solid #7C3AED', paddingBottom: 2 }}>Market Intel</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <div style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 4, padding: '3px 10px', fontSize: 10, color: '#7C3AED' }}>Nashville, TN</div>
          <div style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 4, padding: '3px 10px', fontSize: 10, color: '#7C3AED' }}>2017–2024</div>
        </div>
      </div>
      <div style={{ padding: '12px 20px', display: 'flex', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {[['214', 'Active LOs'], ['18', 'Market Movers'], ['$2.1B', 'Market Volume'], ['4.2%', 'YoY Growth']].map(([v, l]) => (
          <div key={l} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 6, padding: '8px 16px', flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#7C3AED' }}>{v}</div>
            <div style={{ fontSize: 9, color: '#6B7280', letterSpacing: 1, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '12px 20px', overflowY: 'auto' }}>
        <div style={{ fontSize: 9, color: '#7C3AED', letterSpacing: 2, marginBottom: 8 }}>MARKET MOVERS — NASHVILLE METRO</div>
        {lOs.map(lo => (
          <div key={lo.rank} style={{ display: 'grid', gridTemplateColumns: '32px 2fr 2fr 80px 70px 80px 80px', alignItems: 'center', padding: '9px 12px', marginBottom: 4, background: lo.tier === 'MOVER' ? 'rgba(124,58,237,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${lo.tier === 'MOVER' ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.05)'}`, borderRadius: 4 }}>
            <span style={{ fontSize: 11, color: '#374151', fontWeight: 700 }}>#{lo.rank}</span>
            <span style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 600 }}>{lo.name}</span>
            <span style={{ fontSize: 10, color: '#6B7280' }}>{lo.company}</span>
            <span style={{ fontSize: 12, color: '#10B981', fontWeight: 700 }}>{lo.vol}</span>
            <span style={{ fontSize: 10, color: '#6B7280' }}>{lo.units} units</span>
            <span style={{ fontSize: 10, color: lo.tier === 'MOVER' ? '#7C3AED' : '#374151', background: lo.tier === 'MOVER' ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: 3 }}>{lo.tier}</span>
            <span style={{ fontSize: 11, color: lo.tls > 70 ? '#F59E0B' : '#6B7280', fontWeight: 700 }}>TLS {lo.tls}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RetentionRiskScreen() {
  return (
    <div style={{ background: '#060C14', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: "'JetBrains Mono', monospace" }}>
      <div style={{ background: '#0A1628', borderBottom: '1px solid rgba(245,158,11,0.2)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: 13, letterSpacing: 3 }}>APEX PULSE</span>
        <span style={{ color: '#374151' }}>|</span>
        <span style={{ color: '#F59E0B', fontSize: 11 }}>Retention Risk Monitor</span>
        <div style={{ marginLeft: 'auto', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 4, padding: '3px 10px', fontSize: 10, color: '#F59E0B' }}>LIVE · 12 New Signals</div>
      </div>
      <div style={{ padding: '12px 20px', display: 'flex', gap: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {[['3', 'IMMINENT', '#FF3B5C'], ['8', 'MOBILE', '#F59E0B'], ['21', 'RECEPTIVE', '#00D4FF']].map(([n, l, c]) => (
          <div key={l} style={{ flex: 1, background: `${c}0D`, border: `1px solid ${c}33`, borderRadius: 6, padding: '10px 16px' }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: c }}>{n}</div>
            <div style={{ fontSize: 9, color: '#6B7280', letterSpacing: 1 }}>{l}</div>
          </div>
        ))}
      </div>
      {/* Featured alert — James */}
      <div style={{ margin: '16px 20px', background: 'rgba(255,59,92,0.06)', border: '2px solid rgba(255,59,92,0.35)', borderRadius: 8, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0' }}>James Rodriguez</div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>Senior Loan Officer · Houston, TX · 3 years tenure</div>
          </div>
          <div style={{ background: 'rgba(255,59,92,0.15)', border: '1px solid #FF3B5C', borderRadius: 4, padding: '4px 12px', fontSize: 10, color: '#FF3B5C', fontWeight: 700 }}>IMMINENT</div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: 4, padding: 10 }}>
            <div style={{ fontSize: 9, color: '#6B7280', letterSpacing: 1, marginBottom: 4 }}>TLS SCORE</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#FF3B5C' }}>67</div>
            <div style={{ fontSize: 9, color: '#10B981' }}>▲ +36 pts in 60 days</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: 4, padding: 10 }}>
            <div style={{ fontSize: 9, color: '#6B7280', letterSpacing: 1, marginBottom: 4 }}>INTENT SIGNAL</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#FF3B5C', marginTop: 4 }}>FRUSTRATED</div>
            <div style={{ fontSize: 9, color: '#6B7280', marginTop: 4 }}>14 signals detected</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: 4, padding: 10 }}>
            <div style={{ fontSize: 9, color: '#6B7280', letterSpacing: 1, marginBottom: 4 }}>PREDICTIVE ACC.</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#F59E0B' }}>86%</div>
            <div style={{ fontSize: 9, color: '#6B7280' }}>backtested / 130 LOs</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Production drop Q4 −18%', 'Comp gap vs market $24K', 'Platform login −62%', 'Team engagement low'].map(s => (
            <div key={s} style={{ background: 'rgba(255,59,92,0.1)', border: '1px solid rgba(255,59,92,0.2)', borderRadius: 3, padding: '2px 8px', fontSize: 9, color: '#FF3B5C' }}>{s}</div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 4, fontSize: 10, color: '#F59E0B' }}>
          ⚡ Recommended action: Schedule 1:1 with branch manager this week — do not wait.
        </div>
      </div>
    </div>
  )
}

function PropertyPulseScreen() {
  const equity = [
    { mo: "Mar'21", eq: 15 }, { mo: "Sep'21", eq: 42 }, { mo: "Mar'22", eq: 98 },
    { mo: "Sep'22", eq: 142 }, { mo: "Mar'23", eq: 168 }, { mo: "Sep'23", eq: 189 },
    { mo: "Mar'24", eq: 207 }, { mo: "Mar'25", eq: 225 },
  ]
  return (
    <div style={{ background: '#060C14', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: "'JetBrains Mono', monospace" }}>
      <div style={{ background: '#0A1628', borderBottom: '1px solid rgba(16,185,129,0.2)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: '#10B981', fontWeight: 700, fontSize: 13, letterSpacing: 3 }}>PROPERTY PULSE</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <div style={{ background: 'rgba(255,59,92,0.12)', border: '1px solid rgba(255,59,92,0.3)', borderRadius: 3, padding: '2px 8px', fontSize: 9, color: '#FF3B5C' }}>🔥 REFI SAVINGS</div>
          <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 3, padding: '2px 8px', fontSize: 9, color: '#10B981' }}>💰 CASH-OUT ELIGIBLE</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: 14 }}>
            <div style={{ fontSize: 9, color: '#6B7280', letterSpacing: 2, marginBottom: 6 }}>BORROWER</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0' }}>Past Borrower</div>
            <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>3721 Hillside Dr · Wasilla, AK 99654</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
              <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 3, padding: '2px 7px', fontSize: 9, color: '#10B981' }}>HOT</div>
              <div style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 3, padding: '2px 7px', fontSize: 9, color: '#00D4FF' }}>CONVENTIONAL</div>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: 14 }}>
            <div style={{ fontSize: 9, color: '#6B7280', letterSpacing: 2, marginBottom: 6 }}>PROPERTY VALUE (AVM)</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#10B981' }}>$447,000</div>
            <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>Purchase: $310,000 · Mar 2021</div>
            <div style={{ fontSize: 11, color: '#10B981', marginTop: 4 }}>▲ +44% appreciation</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 12 }}>
          {[
            { l: 'EQUITY AVAILABLE', v: '$225,000', c: '#10B981' },
            { l: 'CURRENT RATE', v: '7.25%', c: '#FF3B5C' },
            { l: 'MARKET RATE', v: '6.58%', c: '#00D4FF' },
          ].map(({ l, v, c }) => (
            <div key={l} style={{ background: `${c}0A`, border: `1px solid ${c}33`, borderRadius: 6, padding: '10px 12px' }}>
              <div style={{ fontSize: 9, color: '#6B7280', letterSpacing: 1, marginBottom: 4 }}>{l}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: c }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(255,59,92,0.06)', border: '1px solid rgba(255,59,92,0.2)', borderRadius: 6, padding: 12, marginBottom: 12 }}>
          <div style={{ fontSize: 9, color: '#FF3B5C', letterSpacing: 2, marginBottom: 4 }}>RATE DELTA</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0' }}>7.25% → 6.58% = <span style={{ color: '#10B981' }}>−67 bps</span></div>
          <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>Breakeven at closing costs: ~18 months · Savings compound monthly</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, padding: 12 }}>
          <div style={{ fontSize: 9, color: '#6B7280', letterSpacing: 2, marginBottom: 8 }}>AUTO-OUTREACH SEQUENCE FIRED</div>
          {[['Day 1 — SMS', 'Market update sent · 3 min ago', '#10B981'],
            ['Day 2 — Email', 'Equity analysis queued · Tomorrow', '#F59E0B'],
            ['Day 3 — Call', 'LO prompt scheduled', '#6B7280']].map(([s, d, c]) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c, flexShrink: 0 }} />
              <div style={{ fontSize: 11, color: '#E2E8F0', fontWeight: 600 }}>{s}</div>
              <div style={{ fontSize: 10, color: '#6B7280' }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LeadScoringScreen() {
  const leads = [
    { name: 'Marcus Tran', city: 'Wasilla, AK', type: 'Cash-Out Refi', score: 94, status: 'HOT', loan: '$485K', equity: '$182K', rate: '7.25%', active: true },
    { name: 'Jennifer Kowalski', city: 'Eagle River, AK', type: 'VA IRRRL', score: 91, status: 'HOT', loan: '$520K', equity: '—', rate: '5.25%', active: true },
    { name: 'Robert Alvarez', city: 'Palmer, AK', type: 'Refinance', score: 86, status: 'WARM', loan: '$310K', equity: '$64K', rate: '7.1%', active: false },
    { name: 'Sandra Meyers', city: 'Wasilla, AK', type: 'Purchase', score: 79, status: 'WARM', loan: '$390K', equity: '—', rate: '—', active: false },
    { name: 'David Liu', city: 'Palmer, AK', type: 'VA IRRRL', score: 74, status: 'NURTURE', loan: '$285K', equity: '$67K', rate: '6.1%', active: false },
  ]
  const sc = s => s === 'HOT' ? '#FF3B5C' : s === 'WARM' ? '#F59E0B' : '#00D4FF'
  return (
    <div style={{ background: '#060C14', height: '100%', display: 'flex', fontFamily: "'JetBrains Mono', monospace" }}>
      <div style={{ width: 220, borderRight: '1px solid rgba(255,255,255,0.07)', padding: '14px 16px', overflowY: 'auto', flexShrink: 0 }}>
        <div style={{ fontSize: 9, color: '#6B7280', letterSpacing: 2, marginBottom: 10 }}>HOT LEADS</div>
        {leads.filter(l => l.status === 'HOT').map(l => (
          <div key={l.name} style={{ background: 'rgba(255,59,92,0.06)', border: '1px solid rgba(255,59,92,0.25)', borderRadius: 6, padding: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#E2E8F0' }}>{l.name}</div>
            <div style={{ fontSize: 9, color: '#6B7280', marginTop: 2 }}>{l.city} · {l.type}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#FF3B5C' }}>{l.score}</div>
              <div style={{ fontSize: 8, color: '#FF3B5C', background: 'rgba(255,59,92,0.15)', border: '1px solid rgba(255,59,92,0.3)', borderRadius: 2, padding: '1px 5px' }}>HOT</div>
            </div>
          </div>
        ))}
        <div style={{ fontSize: 9, color: '#6B7280', letterSpacing: 2, margin: '12px 0 8px' }}>NURTURE QUEUE</div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, padding: '8px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#00D4FF' }}>22</div>
          <div style={{ fontSize: 9, color: '#6B7280' }}>leads in sequence</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 9, color: '#374151', letterSpacing: 2, display: 'grid', gridTemplateColumns: '2fr 1.5fr 80px 90px 80px 80px 70px' }}>
          {['NAME / LOCATION', 'LOAN TYPE', 'SCORE', 'STATUS', 'LOAN AMT', 'EQUITY', 'RATE'].map(h => <span key={h}>{h}</span>)}
        </div>
        {leads.map(l => (
          <div key={l.name} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 80px 90px 80px 80px 70px', padding: '11px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', background: l.active ? 'rgba(255,59,92,0.03)' : 'transparent', alignItems: 'center' }}>
            <div><div style={{ fontSize: 12, fontWeight: 600, color: l.active ? '#E2E8F0' : '#9CA3AF' }}>{l.name}</div><div style={{ fontSize: 9, color: '#374151', marginTop: 1 }}>{l.city}</div></div>
            <div style={{ fontSize: 10, color: '#6B7280' }}>{l.type}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: sc(l.status) }}>{l.score}</div>
            <div style={{ fontSize: 9, color: sc(l.status), background: `${sc(l.status)}15`, border: `1px solid ${sc(l.status)}33`, borderRadius: 3, padding: '2px 6px', textAlign: 'center' }}>{l.status}</div>
            <div style={{ fontSize: 11, color: '#10B981' }}>{l.loan}</div>
            <div style={{ fontSize: 11, color: '#6B7280' }}>{l.equity}</div>
            <div style={{ fontSize: 11, color: l.rate === '—' ? '#374151' : '#F59E0B' }}>{l.rate}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AgentAIScreen() {
  const messages = [
    { role: 'user', text: 'Hi — I saw an ad for homes in Wasilla and I think I might be ready to buy. My name is Diana Lane.', time: '11:04 PM' },
    { role: 'ai', text: 'Hi Diana! Great to hear from you. Huit Agent AI here — I can help get you started and make sure you\'re connected with a licensed loan officer right away. Are you looking to purchase a primary residence in Wasilla?', time: '11:04 PM' },
    { role: 'user', text: 'Yes, primary residence. Looking at homes around $450,000.', time: '11:06 PM' },
    { role: 'ai', text: 'Perfect. A few quick questions to get you to the right loan officer: roughly what range is your credit score in? (Excellent 740+, Good 680-739, Fair 620-679)', time: '11:07 PM' },
    { role: 'user', text: 'I think it\'s around 720, maybe a little higher.', time: '11:09 PM' },
    { role: 'ai', text: 'That\'s a strong profile for conventional financing. What timeline are you working with — is this a purchase you\'re targeting in the next 30–90 days?', time: '11:10 PM' },
    { role: 'user', text: 'Yes, probably 60 days. We found a neighborhood we love.', time: '11:12 PM' },
    { role: 'ai', text: 'Excellent. I have everything I need. I\'m flagging your file as HOT and scheduling a callback for Derek Huit first thing tomorrow morning. You\'ll get a confirmation text in the next few minutes. He\'ll walk you through rate options and next steps. Welcome to Alaska homeownership, Diana.', time: '11:14 PM' },
  ]
  const tools = ['CRM Lead Lookup', 'AI Lead Scoring', 'Rate Feed', 'Property Pulse', 'Email Drafter', 'Pipeline View', 'HMDA Lookup', 'Calendar Book', 'SMS Trigger']

  return (
    <div style={{ background: '#060C14', height: '100%', display: 'flex', fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Tools sidebar */}
      <div style={{ width: 180, borderRight: '1px solid rgba(139,92,246,0.15)', padding: '14px 12px', flexShrink: 0 }}>
        <div style={{ fontSize: 8, color: '#6B7280', letterSpacing: 2, marginBottom: 10 }}>ACTIVE TOOLS</div>
        {tools.map(t => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', animation: 'toolpulse 2s infinite', animationDelay: `${Math.random() * 2}s` }} />
            <span style={{ fontSize: 9, color: '#6B7280' }}>{t}</span>
          </div>
        ))}
        <div style={{ marginTop: 12, padding: '6px 8px', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 4 }}>
          <div style={{ fontSize: 8, color: '#8B5CF6', letterSpacing: 1 }}>AUTONOMOUS</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#8B5CF6', marginTop: 2 }}>ACTIVE</div>
        </div>
      </div>

      {/* Chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#0A1628', borderBottom: '1px solid rgba(139,92,246,0.15)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: 12, color: '#8B5CF6', fontWeight: 700 }}>Huit Agent AI</span>
          </div>
          <span style={{ fontSize: 9, color: '#6B7280' }}>Diana Lane · Wasilla, AK · 11:04 PM</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '78%', background: m.role === 'user' ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.1)', border: `1px solid ${m.role === 'user' ? 'rgba(255,255,255,0.08)' : 'rgba(139,92,246,0.25)'}`, borderRadius: 8, padding: '8px 12px', fontSize: 11, color: '#E2E8F0', lineHeight: 1.5 }}>
                {m.text}
              </div>
              <div style={{ fontSize: 9, color: '#374151', marginTop: 3 }}>{m.time}</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(139,92,246,0.15)', padding: '10px 16px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 6, padding: '8px 12px', fontSize: 10, color: '#374151', display: 'flex', justifyContent: 'space-between' }}>
            <span>Type a message or ask Huit Agent AI...</span>
            <span style={{ color: '#8B5CF6', fontSize: 9 }}>⌘↵</span>
          </div>
        </div>
      </div>
      <style>{`@keyframes toolpulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  )
}

const SCREEN_MAP = {
  apex_candidates: ApexCandidatesScreen,
  market_intel: MarketIntelScreen,
  retention_risk: RetentionRiskScreen,
  property_pulse: PropertyPulseScreen,
  lead_scoring: LeadScoringScreen,
  agent_ai: AgentAIScreen,
}

// ─── DEMO PLAYER ─────────────────────────────────────────────────────────────
export default function DemoPlayer() {
  const [sceneIdx, setSceneIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [activeCallout, setActiveCallout] = useState(null)
  const [visibleCallouts, setVisibleCallouts] = useState([])
  const [error, setError] = useState(null)
  const [apiKey, setApiKey] = useState('')
  const [keySubmitted, setKeySubmitted] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [showKey, setShowKey] = useState(false)

  const audioRef = useRef(null)
  const audioUrlRef = useRef({}) // cache: sceneId → blob url
  const timerRef = useRef(null)
  const calloutTimersRef = useRef([])

  const scene = SCENES[sceneIdx]
  const ScreenComponent = SCREEN_MAP[scene.screen]

  // Check if API key set via env (server set)
  useEffect(() => {
    // Try a quick ping to see if server-side key works
    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'test', voice_id: VOICE_ID }),
    }).then(r => {
      if (r.ok) setKeySubmitted(true)
    }).catch(() => {})
  }, [])

  const clearCalloutTimers = useCallback(() => {
    calloutTimersRef.current.forEach(clearTimeout)
    calloutTimersRef.current = []
  }, [])

  const scheduleCallouts = useCallback((sceneData) => {
    clearCalloutTimers()
    setVisibleCallouts([])
    sceneData.callouts.forEach(c => {
      const t = setTimeout(() => {
        setVisibleCallouts(prev => [...prev, c])
        setActiveCallout(c)
        setTimeout(() => setActiveCallout(null), 2500)
      }, c.at * 1000)
      calloutTimersRef.current.push(t)
    })
  }, [clearCalloutTimers])

  const fetchAudio = useCallback(async (s) => {
    if (audioUrlRef.current[s.id]) return audioUrlRef.current[s.id]
    const body = { text: s.script, voice_id: VOICE_ID }
    if (!keySubmitted && apiKey) body.api_key = apiKey

    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`TTS failed: ${res.status}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    audioUrlRef.current[s.id] = url
    return url
  }, [apiKey, keySubmitted])

  const playScene = useCallback(async (idx) => {
    const s = SCENES[idx]
    setLoading(true)
    setError(null)
    setElapsed(0)
    clearCalloutTimers()
    setVisibleCallouts([])

    try {
      const url = await fetchAudio(s)
      const audio = new Audio(url)
      audioRef.current = audio

      audio.ontimeupdate = () => setElapsed(Math.floor(audio.currentTime))
      audio.onended = () => {
        setPlaying(false)
        if (idx < SCENES.length - 1) {
          setTimeout(() => {
            setSceneIdx(idx + 1)
            playScene(idx + 1)
          }, 1800)
        }
      }
      audio.onerror = () => setError('Audio playback failed')

      await audio.play()
      setPlaying(true)
      setAudioReady(true)
      scheduleCallouts(s)

      // Pre-fetch next
      if (idx + 1 < SCENES.length) {
        setTimeout(() => fetchAudio(SCENES[idx + 1]).catch(() => {}), 3000)
      }
    } catch (e) {
      setError(e.message || 'Failed to generate audio')
      setPlaying(false)
    } finally {
      setLoading(false)
    }
  }, [fetchAudio, scheduleCallouts, clearCalloutTimers])

  const handlePlay = useCallback(() => {
    if (playing) {
      audioRef.current?.pause()
      setPlaying(false)
      clearCalloutTimers()
    } else {
      if (audioRef.current?.src) {
        audioRef.current.play()
        setPlaying(true)
        scheduleCallouts(scene)
      } else {
        playScene(sceneIdx)
      }
    }
  }, [playing, scene, sceneIdx, playScene, clearCalloutTimers, scheduleCallouts])

  const goScene = useCallback((idx) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null }
    clearCalloutTimers()
    setVisibleCallouts([])
    setPlaying(false)
    setElapsed(0)
    setSceneIdx(idx)
    setAudioReady(false)
  }, [clearCalloutTimers])

  const duration = scene.script.split(' ').length / 2.8 // ~2.8 words/sec estimate
  const pct = Math.min((elapsed / duration) * 100, 100)

  // KEY INPUT SCREEN
  if (!keySubmitted) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#060C14', fontFamily: "'JetBrains Mono', monospace" }}>
        <div style={{ background: '#0A1628', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 12, padding: 40, width: 440, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#00D4FF', letterSpacing: 3, marginBottom: 8 }}>HUIT.AI</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#E2E8F0', marginBottom: 4 }}>Live Demo Player</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 28 }}>Enter your ElevenLabs API key to enable audio narration</div>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && apiKey && setKeySubmitted(true)}
              placeholder="sk-..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,212,255,0.25)', borderRadius: 6, padding: '10px 40px 10px 14px', fontSize: 13, color: '#E2E8F0', outline: 'none', fontFamily: 'inherit' }}
            />
            <button onClick={() => setShowKey(!showKey)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: 12 }}>{showKey ? '🙈' : '👁'}</button>
          </div>
          <button
            onClick={() => apiKey && setKeySubmitted(true)}
            style={{ width: '100%', background: apiKey ? '#00D4FF' : 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 6, padding: '11px 0', fontSize: 13, fontWeight: 700, color: apiKey ? '#060C14' : '#374151', cursor: apiKey ? 'pointer' : 'default', fontFamily: 'inherit', letterSpacing: 1 }}>
            LAUNCH DEMO PLAYER
          </button>
          <div style={{ marginTop: 20, fontSize: 10, color: '#374151' }}>Key is used server-side only · never stored</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#060C14', fontFamily: "'Inter', sans-serif", overflow: 'hidden' }}>

      {/* ── TOP BAR ─────────────────────────────────────────────── */}
      <div style={{ background: '#0A1628', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 20px', height: 48, display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: '#00D4FF', letterSpacing: 3 }}>HUIT.AI</span>
        <span style={{ color: '#1F2937', fontSize: 14 }}>|</span>
        <span style={{ fontSize: 11, color: '#6B7280' }}>Live Platform Demo</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: playing ? '#10B981' : '#374151' }} />
          <span style={{ fontSize: 10, color: '#6B7280', fontFamily: "'JetBrains Mono', monospace" }}>
            {playing ? 'NARRATING' : loading ? 'GENERATING AUDIO' : 'READY'}
          </span>
        </div>
      </div>

      {/* ── SCENE NAV ────────────────────────────────────────────── */}
      <div style={{ background: '#080E18', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0 20px', height: 44, display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', flexShrink: 0 }}>
        {SCENES.map((s, i) => (
          <button key={s.id} onClick={() => goScene(i)} style={{
            background: i === sceneIdx ? `${s.color}18` : 'transparent',
            border: `1px solid ${i === sceneIdx ? s.color : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 4, padding: '4px 12px', cursor: 'pointer', whiteSpace: 'nowrap',
            color: i === sceneIdx ? s.color : '#6B7280', fontSize: 10,
            fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ fontSize: 9, opacity: 0.6 }}>{s.num}</span>
            <span>{s.title}</span>
            {audioUrlRef.current[s.id] && <span style={{ color: '#10B981', fontSize: 8 }}>✓</span>}
          </button>
        ))}
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', overflow: 'hidden' }}>

        {/* LEFT: Script & Controls */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Scene header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: scene.color, letterSpacing: 2 }}>UC {scene.num}</span>
              <div style={{ flex: 1, height: 1, background: `${scene.color}33` }} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#E2E8F0', marginBottom: 2 }}>{scene.title}</div>
            <div style={{ fontSize: 11, color: '#6B7280' }}>{scene.subtitle}</div>
            <div style={{ fontSize: 10, color: scene.color, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>↗ {scene.url}</div>
          </div>

          {/* Script text */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
            <div style={{ fontSize: 9, color: '#374151', letterSpacing: 2, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>NARRATION SCRIPT</div>
            <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.8 }}>{scene.script}</p>

            {/* Callout guide */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 9, color: '#374151', letterSpacing: 2, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>DATA CALLOUTS</div>
              {scene.callouts.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, opacity: visibleCallouts.includes(c) ? 1 : 0.35, transition: 'opacity 0.4s' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: scene.color, minWidth: 32 }}>{c.at}s</div>
                  <div style={{ flex: 1, background: visibleCallouts.includes(c) ? `${scene.color}18` : 'rgba(255,255,255,0.03)', border: `1px solid ${visibleCallouts.includes(c) ? scene.color + '44' : 'rgba(255,255,255,0.06)'}`, borderRadius: 3, padding: '3px 8px', transition: 'all 0.4s' }}>
                    <div style={{ fontSize: 9, color: scene.color, fontFamily: "'JetBrains Mono', monospace" }}>{c.label}</div>
                    <div style={{ fontSize: 10, color: '#E2E8F0', fontWeight: 600 }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '14px 20px', flexShrink: 0 }}>
            {/* Progress bar */}
            <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 12, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: scene.color, borderRadius: 2, transition: 'width 0.5s linear' }} />
            </div>

            {error && <div style={{ fontSize: 10, color: '#FF3B5C', marginBottom: 8 }}>{error}</div>}

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button onClick={() => sceneIdx > 0 && goScene(sceneIdx - 1)} disabled={sceneIdx === 0} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '8px 12px', color: sceneIdx === 0 ? '#374151' : '#9CA3AF', cursor: sceneIdx === 0 ? 'default' : 'pointer', fontSize: 14 }}>‹</button>

              <button onClick={handlePlay} disabled={loading} style={{
                flex: 1, background: loading ? 'rgba(255,255,255,0.04)' : playing ? 'rgba(239,68,68,0.15)' : `${scene.color}22`,
                border: `1px solid ${loading ? 'rgba(255,255,255,0.1)' : playing ? '#EF4444' : scene.color}`,
                borderRadius: 4, padding: '9px 0', color: loading ? '#374151' : playing ? '#EF4444' : scene.color,
                cursor: loading ? 'default' : 'pointer', fontSize: 12, fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1,
              }}>
                {loading ? '⟳ GENERATING AUDIO...' : playing ? '⏸ PAUSE' : audioUrlRef.current[scene.id] ? '▶ RESUME' : '▶ PLAY NARRATION'}
              </button>

              <button onClick={() => sceneIdx < SCENES.length - 1 && goScene(sceneIdx + 1)} disabled={sceneIdx === SCENES.length - 1} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '8px 12px', color: sceneIdx === SCENES.length - 1 ? '#374151' : '#9CA3AF', cursor: sceneIdx === SCENES.length - 1 ? 'default' : 'pointer', fontSize: 14 }}>›</button>
            </div>

            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#374151', fontFamily: "'JetBrains Mono', monospace" }}>
              <span>Scene {sceneIdx + 1} / {SCENES.length}</span>
              <span>{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Mock Screen + Callouts */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ScreenComponent calloutActive={activeCallout} />

          {/* Callout overlays */}
          {visibleCallouts.map((c, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${c.x}%`,
              top: `${c.y}%`,
              transform: 'translate(-50%, -50%)',
              background: '#060C14',
              border: `2px solid ${scene.color}`,
              borderRadius: 8,
              padding: '8px 14px',
              boxShadow: `0 0 24px ${scene.color}66, 0 0 0 1px ${scene.color}33`,
              animation: 'calloutIn 0.35s ease-out forwards',
              zIndex: 10,
              pointerEvents: 'none',
            }}>
              <div style={{ fontSize: 9, color: scene.color, letterSpacing: 2, fontFamily: "'JetBrains Mono', monospace", marginBottom: 2 }}>{c.label}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#E2E8F0' }}>{c.value}</div>
            </div>
          ))}

          {/* Scene title overlay (top-left) */}
          <div style={{ position: 'absolute', top: 12, right: 16, background: 'rgba(6,12,20,0.85)', border: `1px solid ${scene.color}44`, borderRadius: 6, padding: '6px 12px', backdropFilter: 'blur(8px)' }}>
            <div style={{ fontSize: 9, color: scene.color, letterSpacing: 2, fontFamily: "'JetBrains Mono', monospace" }}>{scene.url}</div>
          </div>

          {/* Playing indicator */}
          {playing && (
            <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(6,12,20,0.9)', border: `1px solid ${scene.color}44`, borderRadius: 6, padding: '6px 12px', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', gap: 3 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 3, height: 12, background: scene.color, borderRadius: 2, animation: `bar 0.8s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }} />)}
              </div>
              <span style={{ fontSize: 10, color: scene.color, fontFamily: "'JetBrains Mono', monospace" }}>NARRATING</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes calloutIn { from { opacity:0; transform: translate(-50%,-50%) scale(0.85); } to { opacity:1; transform: translate(-50%,-50%) scale(1); } }
        @keyframes bar { 0%,100% { transform: scaleY(0.4); opacity:0.5; } 50% { transform: scaleY(1); opacity:1; } }
      `}</style>
    </div>
  )
}
