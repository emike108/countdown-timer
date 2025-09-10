import React from "react";
import { useEffect } from "react";

export function ResetButton({ hasCountdownStarted, resetCountdown }) {
  useEffect(() => {}, [])
  return (
    <div className="reset-button-container">
      <button
        className="reset-button"
        type="button"
        disabled={!hasCountdownStarted}
        onClick={() => {
          resetCountdown();
        }}
      >
        RESET
      </button>
    </div>
  );
}
