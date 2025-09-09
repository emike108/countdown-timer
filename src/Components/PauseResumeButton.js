import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export function PauseResumeButton({
  hasCountdownStarted,
  isCountdownPaused,
  onCountdownPause,
  onCountdownResume,
  secondsLeft,
}) {
  return (
    <div
      title={
        !hasCountdownStarted ? null : isCountdownPaused ? "Resume" : "Pause"
      }
    >
      <button
        className="pause-button"
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
        {isCountdownPaused ? <PlayArrowIcon /> : <PauseIcon />}
      </button>
    </div>
  );
}
