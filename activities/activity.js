const countdown = document.getElementById('countdown');
const startButton = document.getElementById('startButton');

let startingTime = 10
const totalTime = startingTime;


startButton.addEventListener('click', () => {
    const timer = setInterval(() => {
        countdown.innerHTML = startingTime--
    }, 1000)
    setTimeout(() => {
        clearInterval(timer)
        countdown.innerHTML = `Time's Up!`
    }, totalTime * 1000)
});