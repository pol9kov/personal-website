/**
 * Maintenance stub — the whole site redirects here while the copy is being
 * actively rewritten (Egor's decision, 2026-08-10). Resume PDFs stay live:
 * links to them are already out in applications, so the redirect in
 * next.config.ts excludes any path with a file extension.
 */
export const metadata = {
  title: "Yegor Polyakov — site under rework",
  robots: { index: false },
};

export default function MaintenancePage() {
  return (
    <>
      <style>{`html, body { margin: 0; height: 100%; overflow: hidden; background: #141414; }`}</style>
    <main
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background: "#141414",
        color: "#eaeae7",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: 560 }}>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>Yegor Polyakov</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "#9a9a95" }}>
          This site is being actively rewritten and will be back shortly.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.6 }}>
          Resume:{" "}
          <a href="/resume-en.pdf" style={{ color: "#7aa2f7" }}>
            English
          </a>{" "}
          ·{" "}
          <a href="/resume-ru.pdf" style={{ color: "#7aa2f7" }}>
            Russian
          </a>{" "}
          ·{" "}
          <a href="/resume-es.pdf" style={{ color: "#7aa2f7" }}>
            Spanish
          </a>
        </p>
        <p style={{ fontSize: 15, color: "#9a9a95" }}>
          egor.pol9kov@gmail.com
        </p>
      </div>
    </main>
    </>
  );
}
