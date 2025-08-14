const CountdownInputSection = ({
  enteredTime,
  setEnteredTime,
  isCountingDown,
  setIsCountingDown,
  setDisplayMessage,
  countDownTime,
}) => {
  const handleTimeInput = (e) => {
    const onlyNumbersAndPeriod = /^[0-9]*\.?[0-9]*$/;

    if (onlyNumbersAndPeriod.test(e.target.value)) {
      setEnteredTime(e.target.value);
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
        value={enteredTime}
        onChange={handleTimeInput}
        disabled={isCountingDown}
      />
      <button
        className="search-button"
        type="button"
        disabled={isCountingDown}
        onClick={() => {
          if (enteredTime > 0) {
            //is this message clearing needed?
            setDisplayMessage(null);
            setIsCountingDown(true);
          } else {
            alert("Please enter a value that is greater than 0!");
            setEnteredTime("");
          }
        }}
      >
        START
      </button>
    </div>
  );
};

export default CountdownInputSection;
