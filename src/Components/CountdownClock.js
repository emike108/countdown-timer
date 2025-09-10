import { useCallback, useEffect, useRef, useState } from "react";
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

  const initializeCountdown = useCallback(() => {
    endTimeInMsRef.current =
      new Date().getTime() + countdownState.enteredTimeInMin * 60 * 1000;
    const currentTime = new Date().getTime();

    totalCountdownMsTimeRef.current = endTimeInMsRef.current - currentTime;

    setCountdownState((prevState) => ({
      ...prevState,
      msLeft: calculateRemainingMs(endTimeInMsRef.current, currentTime),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdownState.enteredTimeInMin, setCountdownState]);

  const manageCountdownInterval = useCallback(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    countdownState.hasCountdownStarted,
    countdownState.isCountdownPaused,
    endTimeInMsRef,
    setCountdownState,
  ]);

  useEffect(() => {
    if (
      !!countdownState.enteredTimeInMin &&
      countdownState.hasCountdownStarted
    ) {
      initializeCountdown();
    }
  }, [
    countdownState.enteredTimeInMin,
    countdownState.hasCountdownStarted,
    initializeCountdown,
  ]);

  useEffect(() => {
    manageCountdownInterval();

    return () => {
      clearInterval(countdownIntervalRef.current);
      clearTimeout(endCountdownTimeoutRef.current);
    };
  }, [
    countdownState.hasCountdownStarted,
    countdownState.isCountdownPaused,
    manageCountdownInterval,
  ]);

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
