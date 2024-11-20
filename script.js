let timeLeft = 60;
let timer;
let isStarted = false;
let wpm = 0;
let accuracy = 100;
let correctChars = 0;
let totalChars = 0;

const displayText = document.getElementById("display-text");
const inputArea = document.getElementById("input-area");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const startButton = document.getElementById("start-btn");

const sampleText = ["The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect, so keep typing!",
    "A journey of a thousand miles begins with a single step."];


function startTest () {
    if(isStarted)   return;

    isStarted = true;
    timeLeft = 60;
    correctChars = 0;
    wpm = 0;
    accuracy = 100;
    totalChars = 0;

    inputArea.value = "";
    inputArea.disabled = false;
    inputArea.focus();

    // Display a random text
    const randomText = sampleText[Math.floor(Math.random() * sampleText.length)];
    displayText.textContent = randomText;

    timer = setInterval(updateTime, 1000);
}

function updateTime () {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if(timeLeft <= 0) {
        clearInterval(timer);
        endTest();
    }
}

function endTest () {
    isStarted = false;
    inputArea.disabled = true;

    // Calculate WPM and accuracy
    const wordsTyped = correctChars / 5;
    wpm = Math.round((wordsTyped / (60 - timeLeft)) * 60);
    accuracy = Math.round((correctChars / totalChars) * 100);

    // Display results
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy || 0;
}

function checkInput() {
    const typedText = inputArea.value;
    const referenceText = displayText.textContent;

    correctChars = 0;
    totalChars = typedText.length;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === referenceText[i]) {
            correctChars++;
        }
    }

    // Update accuracy in real time
    accuracyDisplay.textContent = Math.round((correctChars / totalChars) * 100) || 0;
}

startButton.addEventListener("click", startTest);
inputArea.addEventListener("input", checkInput);