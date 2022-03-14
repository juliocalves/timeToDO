import React from "react";
import './clock.css';

export function Clock(){

   const getElement = el => document.querySelector(el);
   
   const addRotate = (element, rotation) => element.style.transform = `rotate(${rotation}deg)`;

   function clockTime () {
      let dateTime = new Date();

      let seconds = dateTime.getSeconds() * 6,
         minutes = dateTime.getMinutes() * 6 + (seconds / 60),
         hours = dateTime.getHours()  * 30 + (minutes / 12);

      addRotate(secEl, seconds);
      addRotate(minEl, minutes);
      addRotate(houEl, hours);
   }
   
   const secEl = getElement('#secondPointer'),
         minEl = getElement('#minutePointer'),
         houEl = getElement('#hourPointer');

   setInterval(clockTime, 1000);

   // const deg = 6;
   // const second = document.querySelector('secondPointer');
   // const minute = document.querySelector('minutePointer');
   // const hour = document.querySelector('hourPointer');
   // setInterval(() => {
      
   //    let date = new Date();
   //    let hours = date.getHours() * 30; 
   //    let minutes = date.getMinutes() * deg;
   //    let seconds = date.getSeconds() * deg;
      
   //    second.style.transform(`rotate(${seconds}deg)`);
   //    minute.style.transform(`rotate(${minutes}deg)`);
   //    hour.style.transform(`rotate(${hours+(minutes/12)}deg)`);
   //    second.style.transform('--rotation',seconds * 360)
   //    minute.style.transform('--rotation',minutes * 360)
   //    hour.style.transform('--rotation',hours * 360)

   //    // setRotation(second,seconds)
   //    // setRotation(minute,minutes)
   //    // setRotation(hour,hours)

   //    // function setRotation(element, rotationRatio){
   //    //    element.style.transform('--rotation',rotationRatio * 360)
   //    // }

   // });

    return (
        <div id="clock">
           <figure className="clock">
               <div className="base-clock">
                  <div id='hourPointer' className="base-pointer hour" >
                     <div></div>
                  </div>
                  <div id='minutePointer'className="base-pointer minute"  >
                     <div></div>
                  </div>
                  <div id='secondPointer'className="base-pointer second" >
                     <div></div>
                  </div>
                  <div className="decorator"></div>
               </div>
           </figure>
        </div>
   )
}