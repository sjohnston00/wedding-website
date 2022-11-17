import React from "react"

export default function TimeToWedding() {
  return (
    <>
      <script src="/scripts/index.js" defer></script>
      <section id="time-to-wedding">
        <div className="time">
          <span>Days</span>
          <span id="days">00</span>
        </div>
        <div className="time">
          <span>Hours</span>
          <span id="hours">00</span>
        </div>
        <div className="time">
          <span>Minutes</span>
          <span id="minutes">00</span>
        </div>
        <div className="time">
          <span>Seconds</span>
          <span id="seconds">00</span>
        </div>
      </section>
    </>
  )
}
