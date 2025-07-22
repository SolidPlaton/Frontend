type Prop = {
  timeLeft: number
}

export default function Timer({ timeLeft }: Prop) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  let textColor = 'text-white';
  if (timeLeft <= 60) {
    textColor = 'text-red-500';
  } else if (timeLeft <= 120) {
    textColor = 'text-red-300';
  }

  // Aplica a animação somente se timeLeft > 0 e timeLeft <= 120
  const pulseClass = timeLeft > 0 && timeLeft <= 120 ? 'animate-pulse-scale' : '';

  return (
    <div className={`text-3xl ${textColor} ${pulseClass}`}>
      <p>{minutes}:{formattedSeconds}</p>
    </div>
  );
}
