const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const alarmAudio = document.getElementById('alarm-audio');
const themeToggle = document.getElementById('theme-toggle');

let timerInterval;
let remainingTime = 0;

/**
 * Formats time to `MM:SS` format.
 */
function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}

/**
 * Updates Timer Display
 */
function updateDisplayTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  timerDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

/**
 * Obtains the Input Time in Seconds
 */
function getInputTimeInSeconds() {
  const hours = parseInt(hoursInput.value, 10) || 0;
  const minutes = parseInt(minutesInput.value, 10) || 0;
  const seconds = parseInt(secondsInput.value, 10) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Handles the Start Button Click Event
 */
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

/**
 * Handles the Stop Button Click Event
 */
function handleStop() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
}

/**
 * Handles the Reset Button Click Event
 */
function handleReset() {
  handleStop();
  remainingTime = 0;
  updateDisplayTime(remainingTime);
}

/**
 * Handles Theme Toggle between Light and Dark Modes.
 */
function handleThemeToggle() {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');

  if (document.body.classList.contains('light')) {
    themeToggle.textContent = "🌙 Dark Mode";
  } else {
    themeToggle.textContent = "☀️ Light Mode";
  }
}

startButton.addEventListener('click', handleStart);
stopButton.addEventListener('click', handleStop);
resetButton.addEventListener('click', handleReset);
themeToggle.addEventListener('click', handleThemeToggle);

// Initialize Default Theme
document.body.classList.add('light');
updateDisplayTime(remainingTime);
