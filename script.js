let timer;
let startTime;
let pausedTime = 0;
let running = false;
let lapCounter = 1;

function startStopwatch() {
    if (!running) {
        running = true;
        startTime = Date.now() - pausedTime;
        timer = setInterval(updateStopwatch, 10); // Update every 10 milliseconds
    }
}

function pauseStopwatch() {
    if (running) {
        running = false;
        clearInterval(timer);
        pausedTime = Date.now() - startTime;
    }
}

function resetStopwatch() {
    running = false;
    clearInterval(timer);
    pausedTime = 0;
    document.querySelector('.display').textContent = '00:00:00';
    clearLapTimes();
    lapCounter = 1;
}

function recordLap() {
    if (running) {
        const lapTime = calculateLapTime();
        const lapTimeString = formatTime(lapTime.minutes, lapTime.seconds, lapTime.milliseconds);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTimeString}`;
        document.querySelector('.lap-times').appendChild(lapItem);
        lapCounter++;
    }
}

function updateStopwatch() {
    const elapsedTime = Date.now() - startTime;
    const time = calculateTime(elapsedTime);
    const timeString = formatTime(time.minutes, time.seconds, time.milliseconds);
    document.querySelector('.display').textContent = timeString;
}

function calculateTime(elapsedTime) {
    let totalMilliseconds = elapsedTime;
    let totalSeconds = Math.floor(totalMilliseconds / 1000);
    let totalMinutes = Math.floor(totalSeconds / 60);

    let milliseconds = Math.floor(totalMilliseconds % 1000 / 10);
    let seconds = totalSeconds % 60;
    let minutes = totalMinutes % 60;

    return { minutes, seconds, milliseconds };
}

function calculateLapTime() {
    const elapsedTime = Date.now() - startTime;
    const lapTime = elapsedTime - (lapCounter > 1 ? (lapCounter - 1) * 1000 : 0);
    return calculateTime(lapTime);
}

function formatTime(minutes, seconds, milliseconds) {
    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
}

function padTime(value) {
    return value < 10 ? `0${value}` : value;
}

function clearLapTimes() {
    const lapList = document.querySelector('.lap-times');
    lapList.innerHTML = '';
}