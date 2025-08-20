export function formatRemainingTime(secondsLeft) {
  if (secondsLeft === null) {
    return "00:00";
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export function determineRemainingTimeStyle(secondsLeft, isCountingDown) {
  if (!isCountingDown || secondsLeft === null) {
    return { color: "black" };
  }

  if (secondsLeft <= 10) {
    return {
      color: "red",
      animation: "blinker 1s linear infinite",
    };
  }

  if (secondsLeft <= 20) {
    return { color: "red" };
  }

  return { color: "black" };
}

export function getDisplayMessage(totalTimeInSec, secondsLeft) {
  if (secondsLeft === null) {
    return null;
  }

  if (secondsLeft <= 0) {
    return "Times up!!";
  }

  if (secondsLeft <= 10) {
    return "Only a few seconds left!";
  }

  if (totalTimeInSec / secondsLeft >= 2) {
    return "More than halfway there!";
  }

  return null;
}
