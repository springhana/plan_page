import { useState } from "react";

function Clock() {
  const [clock, setClock] = useState<string>("00:00:00");
  const getClock = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const clocks = `${hours}:${minutes}:${seconds}`;
    setClock(clocks);
  };

  setInterval(getClock, 1000);

  return (
    <div>
      <div className="clock">{clock}</div>
    </div>
  );
}
export default Clock;
