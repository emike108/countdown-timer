import { useState, useRef } from "react";
import "./App.css";
import CountdownClock from "./Components/CountdownClock";
import { CountdownInputSection } from "./Components/CountdownInputSection";
import { calculateRemainingSeconds } from "./Shared/utils";

export function App() {
  const [enteredTimeInMin, setEnteredTimeInMin] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(null);

  const [hasCountdownStarted, setHasCountdownStarted] = useState(false);
  const [isCountdownPaused, setIsCountdownPaused] = useState(false);

  const endTimeInMsRef = useRef(null);

  function onCountdownPause() {
    setIsCountdownPaused(true);
  }

  function onCountdownResume(timeInSec) {
    endTimeInMsRef.current = new Date().getTime() + timeInSec * 1000;
    const currentTime = new Date().getTime();

    setSecondsLeft(
      calculateRemainingSeconds(endTimeInMsRef.current, currentTime)
    );
    setIsCountdownPaused(false);
  }

  // const [timerPaused, setTimerPaused] = useState(false);
  // const [timerSpeed, setTimerSpeed] = useState(1000);

  // const [deploymentTime, setDeploymentTime] = useState(new Date().getTime());

  // const [totalTime, setTotalTime] = useState();

  // let endTime = new Date().getTime() + enteredTimeInMin * 60 * 1000;
  // let startTime = new Date().getTime();
  // let countDownTime = (endTime - startTime) / 1000;

  // let isFirstRender = useRef(true);
  // let countdownIntervalRef = useRef(null);
  // let timeRef = useRef(new Date().getTime());

  // useEffect(() => {
  //   timeRef.current = countDownTime;
  // }, [startSearch]);

  // useEffect(() => {
  //   if (!isFirstRender.current) {
  //     countdownIntervalRef.current = setInterval(() => {
  //       updateRemainingTime();
  //     }, timerSpeed);
  //     setSelectedTime("");
  //     return () => {
  //       if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
  //     };
  //   } else {
  //     isFirstRender.current = false;
  //   }
  // }, [startSearch]);

  // const updateRemainingTime = () => {
  //   let minutes = Math.floor(timeRef.current / 60);
  //   minutes = minutes < 10 ? "0" + minutes : minutes;
  //   let seconds = timeRef.current % 60;
  //   seconds = seconds < 10 ? "0" + seconds : seconds;

  //   if (totalTime / timeRef.current >= 2) {
  //     setDisplayMessage("More than halfway there!");
  //   }

  //   if (timeRef.current <= 20) {
  //     setCountDownStyle({ color: "red" });
  //     if (timeRef.current <= 10) {
  //       setCountDownStyle({
  //         color: "red",
  //         animation: "blinker 1s linear infinite",
  //       });
  //     }
  //   } else {
  //     setCountDownStyle({ color: "black" });
  //   }

  //   if (timeRef.current >= 0) {
  //     timeRef.current--;
  //     setTimesMinutes(minutes);
  //     setTimesSeconds(seconds);
  //   } else {
  //     clearInterval(countdownIntervalRef.current);
  //     setCountDownStyle({ color: "red" });
  //     setDisplayMessage("Times up!!");
  //     console.log("Time's up!!");
  //   }
  // };

  // const handlePause = () => {
  // console.log("Pause functionality disabled for now");
  //   if (countdownIntervalRef.current) {
  //     if (!timerPaused) {
  //       clearInterval(countdownIntervalRef.current);
  //     } else {
  //       countdownIntervalRef.current = setInterval(() => {
  //         updateRemainingTime();
  //       }, timerSpeed);
  //     }
  //     setTimerPaused((prev) => !prev);
  //   }
  // };

  // const handleSpeed = (speed) => {
  //   if (countdownIntervalRef.current) {
  //     if (speed === timerSpeed) {
  //       console.log("Timer already at indicated speed");
  //     } else {
  //       clearInterval(countdownIntervalRef.current);
  //       countdownIntervalRef.current = setInterval(() => {
  //         updateRemainingTime();
  //       }, speed);
  //       setTimerSpeed(speed);
  //     }
  //   }
  // };

  function onCountdownFinish() {
    setEnteredTimeInMin("");
    setHasCountdownStarted(false);
    setIsCountdownPaused(false);
  }

  return (
    <div className="App">
      <div className="main-div">
        <CountdownInputSection
          enteredTimeInMin={enteredTimeInMin}
          setEnteredTimeInMin={setEnteredTimeInMin}
          secondsLeft={secondsLeft}
          hasCountdownStarted={hasCountdownStarted}
          setHasCountdownStarted={setHasCountdownStarted}
          isCountdownPaused={isCountdownPaused}
          onCountdownPause={onCountdownPause}
          onCountdownResume={onCountdownResume}
        />
        <CountdownClock
          enteredTimeInMin={parseFloat(enteredTimeInMin)}
          secondsLeft={secondsLeft}
          setSecondsLeft={setSecondsLeft}
          hasCountdownStarted={hasCountdownStarted}
          isCountdownPaused={isCountdownPaused}
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
