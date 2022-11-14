const daysToWedding = document.getElementById("days");
const hoursToWedding = document.getElementById("hours");
const minutesToWedding = document.getElementById("minutes");
const secondsToWedding = document.getElementById("seconds");
const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;
const showCountdown = () => {
  const weddingDate = new Date("2024-05-16 14:00:00");
  const today = new Date();
  const distance = weddingDate - today;

  if (distance <= 0) {
    clearInterval(timer);
    return;
  }

  const days = Math.floor(distance / _day);
  const hours = Math.floor((distance % _day) / _hour);
  const minutes = Math.floor((distance % _hour) / _minute);
  const seconds = Math.floor((distance % _minute) / _second);

  daysToWedding.textContent = days.toString().padStart(2, "0");
  hoursToWedding.textContent = hours.toString().padStart(2, "0");
  minutesToWedding.textContent = minutes.toString().padStart(2, "0");
  secondsToWedding.textContent = seconds.toString().padStart(2, "0");
};

const timer = setInterval(showCountdown, 1000);
