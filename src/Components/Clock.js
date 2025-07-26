import React from "react";

const Clock = ({
  timerMinutes,
  timerSeconds,
  timerPaused,
  handlePause,
  countDownStyle,
}) => {
  return (
    <>
      <div className="countdown">
        <span className="remaining-time" style={countDownStyle}>
          {timerMinutes}:{timerSeconds}
        </span>
      </div>
      <button className="play-pause" type="button" onClick={handlePause}>
        {timerPaused ? (
          <i className="fa fa-play"></i>
        ) : (
          <i className="fa fa-pause"></i>
        )}
      </button>
    </>
  );
};

export default Clock;
