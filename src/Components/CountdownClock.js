import { useEffect, useRef, useState } from "react";
import {
  calculateRemainingMs,
  determineRemainingTimeStyle,
  formatRemainingTime,
  getDisplayMessage,
} from "../Shared/utils";

export default function CountdownClock({
  countdownState,
  setCountdownState,
  onCountdownFinish,
  endTimeInMsRef,
}) {
  const [isMessageDisplayed, setIsMessageDisplayed] = useState(false);

  const totalCountdownMsTimeRef = useRef(null);

  const countdownIntervalRef = useRef(null);
  const endCountdownTimeoutRef = useRef(null);

  // Initialize the values for endTimeRef and msLeft state when countdown starts
  useEffect(() => {
    if (
      !!countdownState.enteredTimeInMin &&
      countdownState.hasCountdownStarted
    ) {
      endTimeInMsRef.current =
        new Date().getTime() + countdownState.enteredTimeInMin * 60 * 1000;

      const currentTime = new Date().getTime();
      totalCountdownMsTimeRef.current = endTimeInMsRef.current - currentTime;

      setCountdownState((prevState) => ({
        ...prevState,
        msLeft: calculateRemainingMs(endTimeInMsRef.current, currentTime),
      }));
    }
    // Other dependencies will cause unwanted resets of the countdown
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdownState.enteredTimeInMin, countdownState.hasCountdownStarted]);

  // Initialize the countdownIntervalRef which will use the value of endTimeRef to
  // update the amount of seconds left
  useEffect(() => {
    if (
      countdownState.hasCountdownStarted &&
      endTimeInMsRef.current &&
      !countdownState.isCountdownPaused
    ) {
      countdownIntervalRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTimeInMs = calculateRemainingMs(
          endTimeInMsRef.current,
          currentTime
        );
        setCountdownState((prevState) => ({
          ...prevState,
          msLeft: remainingTimeInMs,
        }));

        if (remainingTimeInMs <= 0) {
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
  }, [countdownState.hasCountdownStarted, countdownState.isCountdownPaused]);

  return (
    <>
      <div className="timed-messages">
        &nbsp;&nbsp;
        {isMessageDisplayed
          ? getDisplayMessage(
              totalCountdownMsTimeRef.current,
              countdownState.msLeft
            )
          : null}
      </div>
      <div className="countdown">
        <span
          className="remaining-time"
          style={determineRemainingTimeStyle(
            countdownState.msLeft,
            countdownState.hasCountdownStarted
          )}
        >
          {formatRemainingTime(countdownState.msLeft)}
        </span>
      </div>
    </>
  );
}
