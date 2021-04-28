let timer = 60;
const timerSection = document.getElementById('timer-section')
const timerCount = document.getElementById('timer-count');
let intervalId;

function renderTimer() {
    timerCount.textContent = timer;
}

function deductTime(penalty){
    timer -= penalty;
    if(timer <=0) {
        timer = 0;
        renderTimer();
        endGame();
    }
    renderTimer();
}

function startTimer() {
    timerSection.classList.remove("d-none");
    intervalId = setInterval(function() {
        timer --;
        renderTimer();
        if(timer < 1){
            endGame();
        }
    }, 1000);
}

// let score = Math.floor(time / 1000);