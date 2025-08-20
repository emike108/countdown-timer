import { useEffect, useRef, useState } from "react";
import {
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

  const endTimeRef = useRef(null);
  const totalCountdownTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!!enteredTimeInMin && isCountingDown) {
      endTimeRef.current = new Date().getTime() + enteredTimeInMin * 60 * 1000;
      totalCountdownTimeRef.current = endTimeRef.current - new Date().getTime();
    }
  }, [enteredTimeInMin, isCountingDown]);

  useEffect(() => {
    if (isCountingDown && endTimeRef.current) {
      intervalRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTimeInSec = Math.max(
          0,
          Math.floor((endTimeRef.current - currentTime) / 1000)
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
          ? getDisplayMessage(totalCountdownTimeRef.current / 1000, secondsLeft)
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
