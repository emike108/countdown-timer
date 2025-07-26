import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import AdditonalTimeInfo from "./Components/AdditionalTimeInfo";
import Button from "./Components/Button";
import Clock from "./Components/Clock";
import InputBar from "./Components/InputBar";

function App() {
  const [timerMinutes, setTimesMinutes] = useState("00");
  const [timerSeconds, setTimesSeconds] = useState("00");

  const [selectedTime, setSelectedTime] = useState("");
  const [startSearch, setStartSearch] = useState(0);

  const [timerPaused, setTimerPaused] = useState(false);
  const [timerSpeed, setTimerSpeed] = useState(1000);

  const [deploymentTime, setDeploymentTime] = useState(new Date().getTime());
  const [countDownStyle, setCountDownStyle] = useState();

  const [displayMessage, setDisplayMessage] = useState(null);
  const [totalTime, setTotalTime] = useState();

  let endTime = new Date().getTime() + selectedTime * 60 * 1000;
  let startTime = new Date().getTime();
  let countDownTime = (endTime - startTime) / 1000;

  let isFirstRender = useRef(true);
  let intervalRef = useRef(null);
  let timeRef = useRef(new Date().getTime());

  useEffect(() => {
    timeRef.current = countDownTime;
  }, [startSearch]);

  useEffect(() => {
    if (!isFirstRender.current) {
      intervalRef.current = setInterval(() => {
        updateRemainingTime();
      }, timerSpeed);
      setSelectedTime("");
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      isFirstRender.current = false;
    }
  }, [startSearch]);

  const updateRemainingTime = () => {
    let minutes = Math.floor(timeRef.current / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let seconds = timeRef.current % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    if (totalTime / timeRef.current >= 2) {
      setDisplayMessage("More than halfway there!");
    }

    if (timeRef.current <= 20) {
      setCountDownStyle({ color: "red" });
      if (timeRef.current <= 10) {
        setCountDownStyle({
          color: "red",
          animation: "blinker 1s linear infinite",
        });
      }
    } else {
      setCountDownStyle({ color: "black" });
    }

    if (timeRef.current >= 0) {
      timeRef.current--;
      setTimesMinutes(minutes);
      setTimesSeconds(seconds);
    } else {
      clearInterval(intervalRef.current);
      setCountDownStyle({ color: "red" });
      setDisplayMessage("Times up!!");
      console.log("Time's up!!");
    }
  };

  const handlePause = () => {
    if (intervalRef.current) {
      if (!timerPaused) {
        clearInterval(intervalRef.current);
      } else {
        intervalRef.current = setInterval(() => {
          updateRemainingTime();
        }, timerSpeed);
      }
      setTimerPaused((prev) => !prev);
    }
  };

  const handleSpeed = (speed) => {
    if (intervalRef.current) {
      if (speed === timerSpeed) {
        console.log("Timer already at indicated speed");
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          updateRemainingTime();
        }, speed);
        setTimerSpeed(speed);
      }
    }
  };

  return (
    <div className="App">
      <div className="main-div">
        <InputBar
          setSelectedTime={setSelectedTime}
          selectedTime={selectedTime}
          setStartSearch={setStartSearch}
          startSearch={startSearch}
          setDeploymentTime={setDeploymentTime}
          setDisplayMessage={setDisplayMessage}
          countDownTime={countDownTime}
          setTotalTime={setTotalTime}
        />
        <div className="timed-messages">
          &nbsp;&nbsp;
          {displayMessage ? displayMessage : <div></div>}
        </div>
        <Clock
          timerMinutes={timerMinutes}
          timerSeconds={timerSeconds}
          timerPaused={timerPaused}
          handlePause={handlePause}
          countDownStyle={countDownStyle}
        />
        <span className="speed-indicator">
          Speed:{" "}
          {timerSpeed === 1000 ? "1x" : timerSpeed === 666 ? "1.5x" : "2x"}
        </span>
        <div className="speed-buttons">
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
        </div>
        <div className="est-time">
          <p>
            <em>Est.Deployment Time:</em>
          </p>
        </div>
        <AdditonalTimeInfo deploymentTime={deploymentTime} />
      </div>
    </div>
  );
}

export default App;
