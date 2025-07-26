const InputBar = ({
  setSelectedTime,
  selectedTime,
  setStartSearch,
  startSearch,
  setDeploymentTime,
  setDisplayMessage,
  countDownTime,
  setTotalTime,
}) => {
  return (
    <div className="input-bar">
      <label htmlFor="time input">Countdown:</label>
      &nbsp;
      <input
        className="search-bar"
        id="time input"
        placeholder="(Min)"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      />
      <button
        className="search-button"
        type="button"
        onClick={() => {
          if (selectedTime > 0) {
            setStartSearch((startSearch += 1));
            setDeploymentTime(new Date().getTime() + selectedTime * 60 * 1000);
            setDisplayMessage(null);
            setTotalTime(countDownTime);
          } else {
            alert("Please enter a positive value and greater than 0!");
            setSelectedTime("");
          }
        }}
      >
        START
      </button>
    </div>
  );
};

export default InputBar;
