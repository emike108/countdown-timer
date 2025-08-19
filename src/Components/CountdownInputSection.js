const CountdownInputSection = ({
  enteredTimeInMin,
  setEnteredTimeInMin,
  isCountingDown,
  setIsCountingDown,
  // setDisplayMessage,
}) => {
  const handleTimeInput = (e) => {
    const onlyNumbersAndPeriod = /^[0-9]*\.?[0-9]*$/;

    if (onlyNumbersAndPeriod.test(e.target.value)) {
      setEnteredTimeInMin(e.target.value);
    }
  };

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
            //is this message clearing needed?
            // setDisplayMessage(null);
            // setEnteredTimeInMin("");
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
};

export default CountdownInputSection;
