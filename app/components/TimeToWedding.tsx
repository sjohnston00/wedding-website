import React from "react";
import Navbar from "./Navbar";

export default function TimeToWedding() {
  return (
    <>
      <script src='/scripts/index.js' defer></script>
      <div className='index-hero'>
        <Navbar />
        <h1 id='title'>Melissa & Sam</h1>
        <span id='time-place'>Thurs 16th May 2022 2:00PM | Hockwold Hall</span>
        <section id='time-to-wedding'>
          <div className='time'>
            <span>Days</span>
            <span id='days'>00</span>
          </div>
          <div className='time'>
            <span>Hours</span>
            <span id='hours'>00</span>
          </div>
          <div className='time'>
            <span>Minutes</span>
            <span id='minutes'>00</span>
          </div>
          <div className='time'>
            <span>Seconds</span>
            <span id='seconds'>00</span>
          </div>
        </section>
      </div>
    </>
  );
}
