import { useEffect, useRef, useState } from "react";
import { formatRemainingTime } from "../Shared/utils";

export default function Clock({
  enteredTimeInMin,
  isCountingDown,
  // countDownStyle,
  // setIsCountingDown, // function: to stop countdown
  // onFinish, // optional: parent callback when done
}) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  const endTimeRef = useRef(null);
  const intervalRef = useRef(null);

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
        }
      }, 250);
    } else {
      clearInterval(intervalRef.current);
      setSecondsLeft(0);
    }

    return () => clearInterval(intervalRef.current);
  }, [isCountingDown]);

  return (
    <div className="countdown">
      <span className="remaining-time" /* style={countDownStyle} */>
        {formatRemainingTime(secondsLeft)}
      </span>
    </div>
  );
}
