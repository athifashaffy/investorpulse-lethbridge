export function About() {
  return (
    <section className="panel about" id="about">
      <h2>About this WebMCP demo</h2>
      <p>
        <strong>InvestorPulse Lethbridge</strong> is Athif Shaffy&apos;s entry for the OpenAI WebMCP Challenge.
        It demonstrates a dual-use municipal dashboard: humans get charts and site search; in-browser agents call
        structured tools via <code>document.modelContext.registerTool</code> instead of scraping the DOM.
      </p>
      <p>
        Framed for economic development storytelling akin to City of Lethbridge COL-26-139-style RFPs — but this
        build uses <strong>fictional sample data</strong> only.
      </p>
      <ul>
        <li>
          Test WebMCP in Chrome: enable <code>chrome://flags/#enable-webmcp-testing</code>, reload, confirm the green
          &quot;WebMCP tools active&quot; badge.
        </li>
        <li>Or use ChatGPT&apos;s in-app browser when WebMCP tool discovery is available.</li>
        <li>License: MIT (see repository LICENSE).</li>
      </ul>
      <p className="muted">Author: Athif Shaffy · Stack: Vite + React + TypeScript · No login required for public view.</p>
    </section>
  );
}
