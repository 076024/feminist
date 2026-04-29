import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const SAFE_URL = "https://www.google.com/search?q=weather";

const handleExit = () => {
  // Replace history so back button doesn't return here
  try {
    window.history.replaceState(null, "", "/");
  } catch {
    /* ignore */
  }
  window.location.replace(SAFE_URL);
};

/**
 * Floating Quick Exit button — lets a visitor in danger leave the site instantly.
 * Pressing the Esc key three times also triggers an exit.
 */
const QuickExit = () => {
  if (typeof window !== "undefined") {
    let escCount = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    window.onkeydown = (e) => {
      if (e.key !== "Escape") return;
      escCount += 1;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => (escCount = 0), 1500);
      if (escCount >= 3) handleExit();
    };
  }

  return (
    <Button
      onClick={handleExit}
      aria-label="Quick exit — leave this site immediately"
      className="fixed bottom-4 right-4 z-[60] shadow-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2"
      size="sm"
    >
      <LogOut className="h-4 w-4" />
      Quick Exit
    </Button>
  );
};

export default QuickExit;