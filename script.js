const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect, so keep typing!",
    "A journey of a thousand miles begins with a single step."
];

const inputArea = document.getElementById("input-area");
const textOverlay = document.getElementById("text-overlay");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const startButton = document.getElementById("start-btn");

let isStarted = false;
let timeLeft = 60;
let timer;
let correctChars = 0;
let totalChars = 0;

let referenceText = "";

function startTest() {
    if (isStarted) return;

    isStarted = true;
    timeLeft = 60;
    correctChars = 0;
    totalChars = 0;

    inputArea.value = "";
    inputArea.disabled = false;
    inputArea.focus();

    // Display a random text
    referenceText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textOverlay.textContent = referenceText;

    timer = setInterval(updateTime, 1000);
}

function updateTime() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        endTest();
    }
}

function endTest() {
    isStarted = false;
    inputArea.disabled = true;

    const wordsTyped = correctChars / 5;
    const wpm = Math.round((wordsTyped / (60 - timeLeft)) * 60);
    const accuracy = Math.round((correctChars / totalChars) * 100) || 0;

    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = accuracy;
}

function checkInput() {
    const typedText = inputArea.value;
    correctChars = 0;
    totalChars = typedText.length;

    let overlayHTML = "";

    for (let i = 0; i < referenceText.length; i++) {
        if (i < typedText.length) {
            if (typedText[i] === referenceText[i]) {
                overlayHTML += `<span style="color: black;">${referenceText[i]}</span>`;
                correctChars++;
            } else {
                overlayHTML += `<span style="color: red;">${referenceText[i]}</span>`;
            }
        } else {
            overlayHTML += `<span style="color: gray;">${referenceText[i]}</span>`;
        }
    }

    textOverlay.innerHTML = overlayHTML;

    // Update accuracy
    const accuracy = Math.round((correctChars / totalChars) * 100) || 0;
    accuracyDisplay.textContent = accuracy;
}

startButton.addEventListener("click", startTest);
inputArea.addEventListener("input", checkInput);
