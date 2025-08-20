export default function CountdownInputSection({
  enteredTimeInMin,
  setEnteredTimeInMin,
  isCountingDown,
  setIsCountingDown,
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
      &nbsp;
      <input
        className="search-bar"
        id="time-input"
        placeholder="(Minutes)"
        value={enteredTimeInMin}
        onChange={handleTimeInput}
        disabled={isCountingDown}
      />
      <button
        className="search-button"
        type="button"
        disabled={isCountingDown}
        onClick={() => {
          if (parseFloat(enteredTimeInMin) > 0) {
            setIsCountingDown(true);
          } else {
            alert("Please enter a value that is greater than 0!");
            setEnteredTimeInMin("");
          }
        }}
      >
        START
      </button>
    </div>
  );
}
