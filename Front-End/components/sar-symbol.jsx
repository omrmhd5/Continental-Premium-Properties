import { memo } from "react";

export const SARSymbol = memo(function SARSymbol({ className = "text-sm" }) {
  return <span className={className}>AED</span>;
});
