# InvestorPulse Lethbridge

**OpenAI WebMCP Challenge 2026 entry** by Athif Shaffy.

A public municipal economic / investment indicators dashboard for Lethbridge, Alberta that is also **WebMCP-native**. Humans use charts, filters, and a schematic site map. In-browser agents call structured tools via `document.modelContext.registerTool` — no DOM scraping.

> **SAMPLE DATA** — fictional hackathon demo figures, clearly labeled. Not official City of Lethbridge statistics.

## Why WebMCP fits

Municipal economic-development teams want dual-use surfaces: a dashboard council and investors can read, plus machine-callable actions for copilots. WebMCP lets the page publish tools such as `filter_indicators` and `export_investor_brief` so an agent updates the same React state the UI uses. That story maps cleanly to RFP-style asks (e.g. City of Lethbridge COL-26-139 vibe) without requiring login for the public view.

## Stack

- Vite + React + TypeScript
- MIT License
- Deploy target: Vercel (or Netlify) free tier

## Quick start

From this directory, install JS dependencies with your preferred package manager, then run the Vite `dev` script. For a production bundle, run the `build` script and optionally `preview`.

See `package.json` scripts: `dev`, `build`, `preview`.

## WebMCP tools registered

| Tool | Description |
|------|-------------|
| `list_indicators` | List sample indicators (id, category, latest value, description). |
| `filter_indicators` | Filter by `category` + `keyword`; **updates the UI cards**. |
| `compare_years` | Compare an indicator across two years; **selects chart + comparison**. |
| `export_investor_brief` | Build markdown brief from current filters; **fills the brief panel**. |
| `search_sites` | Search sample investment sites; **highlights list + map pins**. |

Registration lives in `src/webmcp/registerTools.ts` and uses feature detection for `document.modelContext` (fallback `navigator.modelContext`).

## How to test WebMCP

1. **Chrome WebMCP testing flag**
   - Open `chrome://flags/#enable-webmcp-testing` and enable it.
   - Relaunch Chrome, open the deployed app (HTTPS).
   - Confirm the green **WebMCP tools active** badge in the header.
   - Use an agent / WebMCP inspector that can call page tools, or the in-page **Simulate tool calls** panel to verify UI updates without the flag.

2. **ChatGPT in-app browser**
   - Open the live HTTPS URL inside ChatGPT's browser when WebMCP tool discovery is available.
   - Ask the agent to list indicators, filter to Labour, compare building permits 2021 vs 2025, search industrial sites, and export a brief.

3. **Without WebMCP**
   - The **Simulate tool calls** panel exercises the same store mutations so judges always see UI updates.

## Demo video script outline (under 3 minutes)

1. **0:00-0:20** — Open live URL. Point at SAMPLE DATA banner + WebMCP badge. One-liner: dual-use municipal dashboard.
2. **0:20-0:50** — Human path: filter category, click an indicator, show trend chart comparison.
3. **0:50-1:40** — Agent path: call `filter_indicators` (Labour), `compare_years` (building-permits), show UI reacting live.
4. **1:40-2:20** — `search_sites` for industrial then pins/list highlight. `export_investor_brief` then brief panel fills.
5. **2:20-2:50** — Why it matters for city economic development / RFP dual-use; MIT + GitHub.
6. **2:50-3:00** — Closing: Athif Shaffy, OpenAI WebMCP Challenge 2026.

## Project layout

```
src/
  data/indicators.ts
  data/sites.ts
  state/dashboardStore.tsx
  webmcp/registerTools.ts
  components/
  App.tsx
```

## Live demo

- **HTTPS:** https://athifashaffy.github.io/investorpulse-lethbridge/
- **Repo:** https://github.com/athifashaffy/investorpulse-lethbridge

## License

MIT (c) 2026 Athif Shaffy
