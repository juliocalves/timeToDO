import React, { useEffect, useRef, useState } from "react";
import "./clock.css";

export function Clock() {
  const hourRef = useRef();
  const minuteRef = useRef();
  const secondRef = useRef();
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secDeg = seconds * 6;
      const minDeg = minutes * 6 + seconds * 0.1;
      const hourDeg = hours * 30 + minutes * 0.5;

      if (secondRef.current) secondRef.current.style.transform = `rotate(${secDeg}deg)`;
      if (minuteRef.current) minuteRef.current.style.transform = `rotate(${minDeg}deg)`;
      if (hourRef.current) hourRef.current.style.transform = `rotate(${hourDeg}deg)`;
      
      
      setTime(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }

    setInterval(updateClock, 1000);
    //updateClock();

   //  return () => clearInterval(interval);
  }, []);
  const getClockNumbers = () => {
   const romanNumbers = [
      "XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"
    ];
   const numberRadius = 40; // Define o raio onde os números ficarão
   return romanNumbers.map((num, index) => {
      const angle = (index * 30) - 90; // Cada número fica a 30° do próximo, começando no topo
      const x = numberRadius * Math.cos(angle * (Math.PI / 180));
      const y = numberRadius * Math.sin(angle * (Math.PI / 180));

      return (
         <span className="roman-numbers"
         key={num}
         style={{
            top: `${50 + y}%`,
            left: `${50 + x}%`,
         }}
         >
         {num}
         </span>
      );
   });
   };
  return (
    <div id="clock-container" title={`Current Hour: ${time}`}>
      <figure className="clock">
        <div className="base-clock">
            <div ref={hourRef} className="base-pointer hour"><div></div></div>
            <div ref={minuteRef} className="base-pointer minute"><div></div></div>
            <div ref={secondRef} className="base-pointer second"><div></div></div>
            <div className="decorator"></div>

            {/* Números Romanos */}
            <div className="roman-numbers">
            {getClockNumbers()}
            </div>
        </div>
      </figure>
    </div>
  );
}
