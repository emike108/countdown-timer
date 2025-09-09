export function formatRemainingTime(msLeft) {
  if (msLeft === null) {
    return "00:00";
  }

  const minutes = Math.floor(msLeft / 60000);
  const seconds = Math.floor((msLeft % 60000) / 1000);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export function determineRemainingTimeStyle(msLeft, hasCountdownStarted) {
  if (!hasCountdownStarted || msLeft === null) {
    return { color: "black" };
  }

  if (msLeft <= 10000) {
    return {
      color: "red",
      animation: "blinker 1s linear infinite",
    };
  }

  if (msLeft <= 20000) {
    return { color: "red" };
  }

  return { color: "black" };
}

export function getDisplayMessage(totalTimeInMs, msLeft) {
  if (msLeft === null) {
    return null;
  }

  if (msLeft <= 1000) {
    return "Times up!!";
  }

  if (msLeft <= 11000) {
    return "Only a few seconds left!";
  }

  if (Math.floor(totalTimeInMs / msLeft) >= 2) {
    return "More than halfway there!";
  }

  return null;
}

export function calculateRemainingMs(endTime, currentTime) {
  return Math.max(0, endTime - currentTime);
}
