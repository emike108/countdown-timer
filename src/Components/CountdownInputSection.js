import { PauseResumeButton } from "./PauseResumeButton";

export function CountdownInputSection({
  enteredTimeInMin,
  setEnteredTimeInMin,
  msLeft,
  hasCountdownStarted,
  setHasCountdownStarted,
  isCountdownPaused,
  onCountdownPause,
  onCountdownResume,
}) {
  function handleTimeInput(e) {
    const onlyNumbersAndPeriod = /^[0-9]*\.?[0-9]*$/;

    if (onlyNumbersAndPeriod.test(e.target.value)) {
      setEnteredTimeInMin(e.target.value);
    }
  }

  return (
    <div className="countdown-input-section">
      <label htmlFor="time-input">Countdown:</label>
      <input
        className="search-bar"
        id="time-input"
        placeholder="(Minutes)"
        value={enteredTimeInMin}
        onChange={handleTimeInput}
        disabled={hasCountdownStarted}
      />
      <button
        className="start-button"
        type="button"
        disabled={hasCountdownStarted}
        onClick={() => {
          if (parseFloat(enteredTimeInMin) > 0) {
            setHasCountdownStarted(true);
          } else {
            alert("Please enter a value that is greater than 0!");
            setEnteredTimeInMin("");
          }
        }}
      >
        START
      </button>
      <PauseResumeButton
        hasCountdownStarted={hasCountdownStarted}
        isCountdownPaused={isCountdownPaused}
        onCountdownPause={onCountdownPause}
        onCountdownResume={onCountdownResume}
        msLeft={msLeft}
      />
    </div>
  );
}
