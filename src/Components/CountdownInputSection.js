import React from "react";
import { PauseResumeButton } from "./PauseResumeButton";

export function CountdownInputSection({
  countdownState,
  setCountdownState,
  onCountdownPause,
  onCountdownResume,
}) {
  function handleTimeInput(e) {
    const onlyNumbersAndPeriod = /^[0-9]*\.?[0-9]*$/;

    if (onlyNumbersAndPeriod.test(e.target.value)) {
      setCountdownState((prevState) => ({
        ...prevState,
        enteredTimeInMin: e.target.value,
      }));
    }
  }

  return (
    <div className="countdown-input-section">
      <label htmlFor="time-input">Countdown:</label>
      <input
        className="search-bar"
        id="time-input"
        placeholder="(Minutes)"
        value={countdownState.enteredTimeInMin}
        onChange={handleTimeInput}
        disabled={countdownState.hasCountdownStarted}
      />
      <button
        className="start-button"
        type="button"
        disabled={countdownState.hasCountdownStarted}
        onClick={() => {
          if (parseFloat(countdownState.enteredTimeInMin) > 0) {
            setCountdownState((prevState) => ({
              ...prevState,
              hasCountdownStarted: true,
            }));
          } else {
            alert("Please enter a value that is greater than 0!");
            setCountdownState((prevState) => ({
              ...prevState,
              enteredTimeInMin: "",
            }));
          }
        }}
      >
        START
      </button>
      <PauseResumeButton
        countdownState={countdownState}
        onCountdownPause={onCountdownPause}
        onCountdownResume={onCountdownResume}
      />
    </div>
  );
}
