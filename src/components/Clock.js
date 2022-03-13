import React from "react";
import './clock.css';

export function Clock(){
   setInterval(() => {
      
      const second = document.getElementById('secondpointer');
      const minute = document.getElementById('minutePointer');
      const hour = document.getElementById('hourPointer');


      const date = new Date();
      const seconds = date.getSeconds()/ 60;
      const minutes = (seconds + date.getMinutes())/ 60;
      const hours = (minutes + date.getHours())/ 12; 
      
      second.style.setProperty('--rotation',seconds * 360)
      minute.style.setProperty('--rotation',minutes * 360)
      hour.style.setProperty('--rotation',hours * 360)

      // setRotation(second,seconds)
      // setRotation(minute,minutes)
      // setRotation(hour,hours)

      // function setRotation(element, rotationRatio){
      //    element.style.setProperty('--rotation',rotationRatio * 360)
      // }

   },1000);

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