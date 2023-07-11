export const convertMillisecondsToTime = (ms: number): string => {
  ms *= 10
  const milliseconds = Math.floor((ms % 1000) / 10);
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");
  const millisecondsStr = milliseconds.toString().padStart(2, "0");


  return `${hoursStr}:${minutesStr}:${secondsStr}.${millisecondsStr}`;
}