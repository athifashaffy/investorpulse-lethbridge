import { useEffect, useRef } from 'react';
import { About } from './components/About';
import { Header } from './components/Header';
import { IndicatorCards } from './components/IndicatorCards';
import { InvestorBriefPanel } from './components/InvestorBriefPanel';
import { SitesList } from './components/SitesList';
import { ToolSimulator } from './components/ToolSimulator';
import { TrendChart } from './components/TrendChart';
import { INDICATORS } from './data/indicators';
import {
  DashboardProvider,
  dashboardBridge,
  useDashboard,
} from './state/dashboardStore';
import { registerWebMcpTools } from './webmcp/registerTools';

function Bridge() {
  const store = useDashboard();
  dashboardBridge.current = store;
  return null;
}

function DashboardBody() {
  const { selectedIndicatorId, compareYears, setWebmcpStatus } = useDashboard();
  const indicator = INDICATORS.find((i) => i.id === selectedIndicatorId) ?? INDICATORS[0];
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current = new AbortController();
    registerWebMcpTools(abortRef.current.signal)
      .then((status) => setWebmcpStatus(status))
      .catch(() => setWebmcpStatus('unavailable'));
    return () => abortRef.current?.abort();
  }, [setWebmcpStatus]);

  return (
    <>
      <Header />
      <main className="layout">
        <p className="banner">
          SAMPLE DATA — hackathon demo for OpenAI WebMCP Challenge. Not official City of Lethbridge statistics.
        </p>
        <IndicatorCards />
        <TrendChart indicator={indicator} compareYears={compareYears} />
        <SitesList />
        <InvestorBriefPanel />
        <ToolSimulator />
        <About />
      </main>
    </>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <Bridge />
      <DashboardBody />
    </DashboardProvider>
  );
}
