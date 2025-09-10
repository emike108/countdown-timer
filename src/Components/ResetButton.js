import React from "react";

export function ResetButton({ hasCountdownStarted, resetCountdown }) {
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
