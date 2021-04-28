const landingPage = document.getElementById('landing-page');
const footerEl = document.getElementById('footer');
const highScoreButton = document.getElementById('high-score-btn');
const homeButton = document.getElementById('home-btn');
const startGameButton = document.getElementById('start-game-btn');
const questionContainer = document.querySelector("#question-container");
const endGamePage = document.getElementById('end-game-page');
const initialsInput = document.getElementById('initials');
const submitButton = document.getElementById('submit-btn');
const highScorePage = document.getElementById('high-score-page');
const highScorePageList = document.getElementById('high-score-list');
const tryAgainButton = document.getElementById('try-again-btn');
const result = document.getElementById('result');

// let score = timer;
let questionIndex = -1;
let question = '';

function checkChoice(event) {
    event.preventDefault();
    
    const buttonClicked = event.target;
    const correctAnswer = "Nailed it.";
    const incorrectAnswer = "Yeah, nah...";

    if(buttonClicked.textContent === questions[questionIndex].answer) {
        // Add text to indicate to user if they chose the correct answer.
        // result.textContent = correctAnswer;
        answerResult("Nailed it!", 500);
        // Move onto the next question.
        getNewQuestion();
    }
    else {
        answerResult("Yeah, nah...", 500);
        // Move onto the next question.
        getNewQuestion();
        // Take 5 seconds from the timer.
        deductTime(5);
        // Add text to indicate to user if they chose the incorrect answer.
        // result.textContent = incorrectAnswer;
    };
}

function answerResult(msg, duration) {
    const el = document.createElement("div");
    el.classList.add('result');
    el.innerHTML = msg;
    setTimeout(function(){
        el.parentNode.removeChild(el);
    }, duration);
    result.appendChild(el);
}

function renderQuestion() {
    question = questions[questionIndex];

    const questionTitle = document.createElement('h2');
    questionTitle.textContent = question.questionTitle;
    questionContainer.append(questionTitle);
    
    for (let index = 0; index < question.choices.length; index++) {
        const choice = question.choices[index];

        const button = document.createElement('button');
        button.classList.add('answer-button');
        button.textContent = choice;

        button.addEventListener('click', checkChoice);
        questionContainer.append(button);

    };
    // if there are no questions left then end the game
}

function clearList() {
    Array.from(questionContainer.children).forEach(child => {
        child.remove();
    });
}

function getNewQuestion() {
    questionIndex ++;
    clearList();
    if (questionIndex < questions.length) {
        renderQuestion();
    }
    else {
        endGame();
    }
    // WHEN the use selects an answer
    // THEN the user moves on to the next question
    // IF the user has answered all the questions
    // THEN the endGame function is invoked
}

startGameButton.addEventListener('click', function(event) {
    event.preventDefault();
    // WHEN I click on the start button:
    // THEN I start the timer.
    renderTimer();
    startTimer();
    // THEN I hide the landing page and footer.
    landingPage.classList.add('d-none');
    footerEl.classList.add('d-none');
    homeButton.classList.remove('d-none');
    // THEN I show question 1.
    getNewQuestion();
})

highScoreButton.addEventListener('click', function(event) {
    event.preventDefault();
    // WHEN I click on the high score button:
    // THEN I am redirected to the high score page.
    saveUserDetails();
    sortLeaderboardArray();
    renderLeaderboard();
    landingPage.classList.add('d-none');
    highScoreButton.classList.add('d-none');
    timerSection.classList.add('d-none');
    questionContainer.classList.add('d-none');
    highScorePage.classList.remove('d-none');
    homeButton.classList.remove('d-none');
    footerEl.classList.remove('d-none');
})

homeButton.addEventListener('click', function(event) {
    event.preventDefault();
    // WHEN I click on the high score button:
    // THEN I am redirected to the high score page.
    // clearInterval(intervalId);
    // homeButton.classList.add('d-none');
    // questionContainer.classList.add('d-none');
    // highScorePage.classList.add('d-none');
    // timerSection.classList.add('d-none');
    // landingPage.classList.remove('d-none');
    // footerEl.classList.remove('d-none');
    returnToHomepage();
})

function endGame() {
    clearInterval(intervalId);
    timerSection.classList.add("d-none");
    questionContainer.classList.add('d-none');
    endGamePage.classList.remove('d-none')
    footerEl.classList.remove('d-none');
    const finalScore = document.getElementById('final-score');
    finalScore.innerHTML = timerCount.textContent;
    // WHEN the game ends
    // THEN the game over screen displays
    // THEN the user is presented with a text box where they can log their initials
    // WHEN the user submits their details
    // THEN the information is stored in local storage
}

const endGameEl = document.getElementById('end-game-form');
const initialsInputEl = document.getElementById('initials');

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    // if(initialsInput.length != 3) {
    //     window.alert('Whoops! Please enter 3 characters for your initials.');
    //   }
    // else {
    if (!initialsInputEl.value) {
        alert('this field is required');
        return;
      }
    saveUserDetails();
    highScores();
    sortLeaderboardArray();
    renderLeaderboard();
    // };
})

let leaderboardArray = [];

function saveUserDetails(){
    let userInitialsAndScore = {
        initials: initialsInputEl.value,
        score: timer
    };
    checkForLocalStorageData();
    leaderboardArray.push(userInitialsAndScore);
    window.localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
}

function checkForLocalStorageData() {
    let localStorageLeaderboard = localStorage.getItem("leaderboardArray");
    if (localStorageLeaderboard !== null) {
        leaderboardArray = JSON.parse(localStorageLeaderboard);
    }
}

function renderLeaderboard() {

    for (i = 0; i < 10 && i < leaderboardArray.length; i++) {

        const savedUserDetails = leaderboardArray[i];
        const leaderboardScores = document.createElement('li');

        highScorePageList.append(leaderboardScores);

        leaderboardScores.textContent = (savedUserDetails.initials + "  " + savedUserDetails.score);

    };
}

function sortLeaderboardArray() {
    // var highScoresLi = savedUserDetails.score;
    // highScoresLi.sort(function(a,b){return b-a});
    
    leaderboardArray.sort(function(a,b){return b.score-a.score});
}

function returnToHomepage() {
    location.reload();
}

var highScore = localStorage.getItem("score");
var initial = localStorage.getItem("initial");

function highScores() {
    endGamePage.classList.add('d-none');
    highScoreButton.classList.add('d-none');
    highScorePage.classList.remove('d-none');
    tryAgainButton.classList.remove('d-none');
}

tryAgainButton.addEventListener('click', returnToHomepage);
    // Create ordered list with high scores
    // WHEN the user has submitted their details
    // THEN the user is redirected to the 'high scores' screen
    // THEN the user can see a list of high scores