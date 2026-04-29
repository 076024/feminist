import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// PWA service worker — only register on the live site, never in the Lovable preview iframe.
const isInIframe = (() => {
  try { return window.self !== window.top; } catch { return true; }
})();
const host = window.location.hostname;
const isPreviewHost =
  host.includes("id-preview--") ||
  host.includes("lovableproject.com") ||
  host === "localhost" ||
  host === "127.0.0.1";

if (isInIframe || isPreviewHost) {
  // Clean up any stale SW so preview always shows fresh code
  navigator.serviceWorker?.getRegistrations().then((regs) => regs.forEach((r) => r.unregister()));
} else if ("serviceWorker" in navigator) {
  import("workbox-window").then(({ Workbox }) => {
    const wb = new Workbox("/sw.js");
    wb.register().catch(() => {});
  });
}
