
type Prop = {
  timeLeft: number
}

export default function Timer ({ timeLeft }:Prop) {

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;


  return (
    <div className="text-white text-3xl">
      <p>{minutes}:{formattedSeconds}</p>
    </div>
  )
}