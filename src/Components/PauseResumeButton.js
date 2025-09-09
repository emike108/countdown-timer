export function PauseResumeButton({
  hasCountdownStarted,
  isCountdownPaused,
  onCountdownPause,
  onCountdownResume,
  secondsLeft,
}) {
  return (
    <button
      //update the styling for the button
      className="start-button"
      type="button"
      disabled={!hasCountdownStarted}
      onClick={() => {
        if (!isCountdownPaused) {
          onCountdownPause();
        } else {
          onCountdownResume(secondsLeft);
        }
      }}
    >
      {/* convert to icons from MUI? */}
      {isCountdownPaused ? "Resume" : "Pause"}
    </button>
  );
}
