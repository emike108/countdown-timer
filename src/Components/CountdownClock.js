import { useEffect, useRef, useState } from "react";
import {
  determineRemainingTimeStyle,
  formatRemainingTime,
} from "../Shared/utils";

export default function CountdownClock({
  enteredTimeInMin,
  isCountingDown,
  onFinish,
}) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  const endTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!!enteredTimeInMin && isCountingDown) {
      endTimeRef.current = new Date().getTime() + enteredTimeInMin * 60 * 1000;
    }
  }, [enteredTimeInMin, isCountingDown]);

  useEffect(() => {
    if (isCountingDown && endTimeRef.current) {
      intervalRef.current = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTime = Math.max(
          0,
          Math.floor((endTimeRef.current - currentTime) / 1000)
        );
        setSecondsLeft(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(intervalRef.current);
          timeoutRef.current = setTimeout(() => {
            onFinish();
          }, 3000);
        }
      }, 250);
    } else {
      clearInterval(intervalRef.current);
      setSecondsLeft(0);
    }

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
    // onFinish is not needed in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCountingDown]);

  return (
    <div className="countdown">
      <span
        className="remaining-time"
        style={determineRemainingTimeStyle(secondsLeft, isCountingDown)}
      >
        {formatRemainingTime(secondsLeft)}
      </span>
    </div>
  );
}
