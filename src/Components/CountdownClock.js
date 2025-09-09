import { useEffect, useRef, useState } from "react";
import {
  calculateRemainingSeconds,
  convertMsToSec,
  determineRemainingTimeStyle,
  formatRemainingTime,
  getDisplayMessage,
} from "../Shared/utils";

export default function CountdownClock({
  enteredTimeInMin,
  secondsLeft,
  setSecondsLeft,
  hasCountdownStarted,
  isCountdownPaused,
  onCountdownFinish,
  endTimeInMsRef,
}) {
  const [isMessageDisplayed, setIsMessageDisplayed] = useState(false);

  const totalCountdownMsTimeRef = useRef(null);

  const countdownIntervalRef = useRef(null);
  const endCountdownTimeoutRef = useRef(null);

  // Initialize the values for endTimeRef and secondsLeft state when countdown starts
  useEffect(() => {
    if (!!enteredTimeInMin && hasCountdownStarted) {
      endTimeInMsRef.current =
        new Date().getTime() + enteredTimeInMin * 60 * 1000;

      const currentTime = new Date().getTime();
      totalCountdownMsTimeRef.current = endTimeInMsRef.current - currentTime;

      setSecondsLeft(
        calculateRemainingSeconds(endTimeInMsRef.current, currentTime)
      );
    }
    // Other dependencies will cause unwanted resets of the countdown
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredTimeInMin, hasCountdownStarted]);

  // Initialize the countdownIntervalRef which will use the value of endTimeRef to
  // update the amount of seconds left
  useEffect(() => {
    if (hasCountdownStarted && endTimeInMsRef.current && !isCountdownPaused) {
      countdownIntervalRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTimeInSec = calculateRemainingSeconds(
          endTimeInMsRef.current,
          currentTime
        );
        setSecondsLeft(remainingTimeInSec);

        if (remainingTimeInSec <= 0) {
          clearInterval(countdownIntervalRef.current);
          endCountdownTimeoutRef.current = setTimeout(() => {
            onCountdownFinish();
            setIsMessageDisplayed(false);
          }, 3000);
        }
      }, 250);

      setIsMessageDisplayed(true);
    } else {
      clearInterval(countdownIntervalRef.current);
    }

    return () => {
      clearInterval(countdownIntervalRef.current);
      clearTimeout(endCountdownTimeoutRef.current);
    };
    // onCountdownFinish is not needed in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCountdownStarted, isCountdownPaused]);

  return (
    <>
      <div className="timed-messages">
        &nbsp;&nbsp;
        {isMessageDisplayed
          ? getDisplayMessage(
              convertMsToSec(totalCountdownMsTimeRef.current),
              secondsLeft
            )
          : null}
      </div>
      <div className="countdown">
        <span
          className="remaining-time"
          style={determineRemainingTimeStyle(secondsLeft, hasCountdownStarted)}
        >
          {formatRemainingTime(secondsLeft)}
        </span>
      </div>
    </>
  );
}
