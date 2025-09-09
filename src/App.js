import { useRef, useState } from "react";
import "./App.css";
import CountdownClock from "./Components/CountdownClock";
import { CountdownInputSection } from "./Components/CountdownInputSection";
import { calculateRemainingMs } from "./Shared/utils";

export function App() {
  const [countdownState, setCountdownState] = useState({
    enteredTimeInMin: "",
    msLeft: null,
    hasCountdownStarted: false,
    isCountdownPaused: false,
  });

  const endTimeInMsRef = useRef(null);

  function onCountdownPause() {
    setCountdownState((prevState) => ({
      ...prevState,
      isCountdownPaused: true,
    }));
  }

  function onCountdownResume(timeInMs) {
    endTimeInMsRef.current = new Date().getTime() + timeInMs;
    const currentTime = new Date().getTime();

    setCountdownState((prevState) => ({
      ...prevState,
      msLeft: calculateRemainingMs(endTimeInMsRef.current, currentTime),
      isCountdownPaused: false,
    }));
  }

  function onCountdownFinish() {
    setCountdownState({
      enteredTimeInMin: "",
      msLeft: null,
      hasCountdownStarted: false,
      isCountdownPaused: false,
    });
  }

  return (
    <div className="App">
      <div className="main-div">
        <CountdownInputSection
          countdownState={countdownState}
          setCountdownState={setCountdownState}
          onCountdownPause={onCountdownPause}
          onCountdownResume={onCountdownResume}
        />
        <CountdownClock
          countdownState={countdownState}
          setCountdownState={setCountdownState}
          onCountdownFinish={onCountdownFinish}
          endTimeInMsRef={endTimeInMsRef}
        />
        {/* <span className="speed-indicator">
          Speed:{" "}
          {timerSpeed === 1000 ? "1x" : timerSpeed === 666 ? "1.5x" : "2x"}
        </span> */}
        {/* <div className="speed-buttons">
          <Button
            className="speed1"
            type="button"
            value="1X"
            onClick={() => {
              handleSpeed(1000);
            }}
          />
          <Button
            className="speed1.5"
            type="button"
            value="1.5X"
            onClick={() => {
              handleSpeed(666);
            }}
          />
          <Button
            className="speed2"
            type="button"
            value="2X"
            onClick={() => {
              handleSpeed(500);
            }}
          />
        </div> */}
        {/* <div className="est-time">
          <p>
            <em>Est.Deployment Time:</em>
          </p>
        </div>
        <AdditionalTimeInfo deploymentTime={deploymentTime} /> */}
      </div>
    </div>
  );
}
