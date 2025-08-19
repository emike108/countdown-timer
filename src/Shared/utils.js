export function formatRemainingTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export function determineRemainingTimeStyle(remainingTime, isCountingDown) {
  if (!isCountingDown) {
    return { color: "black" };
  }

  if (remainingTime <= 10) {
    return {
      color: "red",
      animation: "blinker 1s linear infinite",
    };
  }

  if (remainingTime <= 20) {
    return { color: "red" };
  }

  return { color: "black" };
}
