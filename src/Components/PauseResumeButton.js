import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export function PauseResumeButton({
  countdownState,
  onCountdownPause,
  onCountdownResume,
}) {
  return (
    <div
      title={
        !countdownState.hasCountdownStarted
          ? null
          : countdownState.isCountdownPaused
          ? "Resume"
          : "Pause"
      }
    >
      <button
        className="pause-button"
        type="button"
        disabled={!countdownState.hasCountdownStarted}
        onClick={() => {
          if (!countdownState.isCountdownPaused) {
            onCountdownPause();
          } else {
            onCountdownResume(countdownState.msLeft);
          }
        }}
      >
        {countdownState.isCountdownPaused ? <PlayArrowIcon /> : <PauseIcon />}
      </button>
    </div>
  );
}
