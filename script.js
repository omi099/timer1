const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const alarmAudio = document.getElementById('alarm-audio');

let timerInterval;
let remainingTime = 0;

function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}

function updateDisplayTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  timerDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function getInputTimeInSeconds() {
  const hours = parseInt(hoursInput.value, 10) || 0;
  const minutes = parseInt(minutesInput.value, 10) || 0;
  const seconds = parseInt(secondsInput.value, 10) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

function handleStart() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  remainingTime = getInputTimeInSeconds();
  updateDisplayTime(remainingTime);

  timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplayTime(remainingTime);
    } else {
      clearInterval(timerInterval);
      alarmAudio.currentTime = 0;
      alarmAudio.play();
    }
  }, 1000);
}

function handleStop() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
}

function handleReset() {
  handleStop();
  remainingTime = 0;
  updateDisplayTime(remainingTime);
}

startButton.addEventListener('click', handleStart);
stopButton.addEventListener('click', handleStop);
resetButton.addEventListener('click', handleReset);

updateDisplayTime(remainingTime);
