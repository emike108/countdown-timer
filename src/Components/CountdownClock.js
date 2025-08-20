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
  isCountingDown,
  onFinish,
}) {
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [isMessageDisplayed, setIsMessageDisplayed] = useState(false);

  const endMsTimeRef = useRef(null);
  const totalMsCountdownRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!!enteredTimeInMin && isCountingDown) {
      endMsTimeRef.current =
        new Date().getTime() + enteredTimeInMin * 60 * 1000;

      const currentTime = new Date().getTime();
      totalMsCountdownRef.current = endMsTimeRef.current - currentTime;

      setSecondsLeft(
        calculateRemainingSeconds(endMsTimeRef.current, currentTime)
      );
    }
  }, [enteredTimeInMin, isCountingDown]);

  useEffect(() => {
    if (isCountingDown && endMsTimeRef.current) {
      intervalRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTimeInSec = calculateRemainingSeconds(
          endMsTimeRef.current,
          currentTime
        );
        setSecondsLeft(remainingTimeInSec);

        if (remainingTimeInSec <= 0) {
          clearInterval(intervalRef.current);
          timeoutRef.current = setTimeout(() => {
            onFinish();
            setIsMessageDisplayed(false);
          }, 3000);
        }
      }, 250);

      setIsMessageDisplayed(true);
    } else {
      clearInterval(intervalRef.current);
      setSecondsLeft(null);
      setIsMessageDisplayed(false);
    }

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
    // onFinish is not needed in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCountingDown]);

  return (
    <>
      <div className="timed-messages">
        &nbsp;&nbsp;
        {isMessageDisplayed
          ? getDisplayMessage(
              convertMsToSec(totalMsCountdownRef.current),
              secondsLeft
            )
          : null}
      </div>
      <div className="countdown">
        <span
          className="remaining-time"
          style={determineRemainingTimeStyle(secondsLeft, isCountingDown)}
        >
          {formatRemainingTime(secondsLeft)}
        </span>
      </div>
    </>
  );
}
