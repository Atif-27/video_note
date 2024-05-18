import { Duration } from "luxon";
// This function takes a number of seconds and returns a formatted string
export default function formatTimestamp(seconds: number) {
  const duration = Duration.fromObject({ seconds });
  const hours = Math.floor(duration.as("hours"));
  const minutes = Math.floor(duration.as("minutes")) % 60;
  const remainingSeconds = duration.seconds % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(Math.floor(remainingSeconds)).padStart(
    2,
    "0"
  );

  if (hours > 0) {
    return `${formattedHours} hr ${formattedMinutes} min ${formattedSeconds} sec`;
  } else {
    return `${formattedMinutes} min ${formattedSeconds} sec`;
  }
}
