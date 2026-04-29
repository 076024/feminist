import { useState } from "react";
import { Phone, X } from "lucide-react";

const CrisisBanner = () => {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div className="bg-destructive text-destructive-foreground text-sm">
      <div className="container flex items-center justify-center gap-3 py-2 text-center">
        <Phone className="h-4 w-4 shrink-0" aria-hidden />
        <p className="leading-tight">
          In immediate danger? Call{" "}
          <a href="tel:933" className="font-bold underline underline-offset-2">
            933 (Zambia GBV Helpline)
          </a>{" "}
          or{" "}
          <a href="tel:991" className="font-bold underline underline-offset-2">
            991 (Police)
          </a>
        </p>
        <button
          onClick={() => setHidden(true)}
          aria-label="Dismiss crisis banner"
          className="ml-auto opacity-80 hover:opacity-100 shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CrisisBanner;