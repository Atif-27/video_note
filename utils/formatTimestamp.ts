export function formatTimestamp(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;

  if (hrs > 0) {
    return `${hrs}:${formattedMins}:${formattedSecs}`;
  } else {
    return `${mins}:${formattedSecs}`;
  }
}
