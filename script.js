const sampleTexts = [
    "The rapid advancement of technology has revolutionized every aspect of human life. From artificial intelligence to renewable energy, the innovations of today pave the way for a sustainable future. Yet, with great progress comes the responsibility to use technology wisely and ethically.",
    "The ancient Egyptians built pyramids that have stood the test of time, their secrets buried beneath layers of history. These marvels of engineering remind us of the ingenuity and perseverance of humankind, inspiring future generations to dream and achieve the impossible.",
    "Every day is a chance to rewrite your story. The power to change lies within you, waiting to be unleashed. Believe in yourself, set ambitious goals, and take deliberate actions toward achieving them. Success is not a destination but a journey of continuous improvement."
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

let referenceText = ""; // The full reference text
let currentLineStart = 0; // Tracks the start index of the visible portion

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
    currentLineStart = 0; // Reset to the beginning
    renderVisibleText(); // Render the first portion of the text

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

    // Check correctness of input
    for (let i = currentLineStart; i < currentLineStart + typedText.length; i++) {
        if (referenceText[i] === typedText[i - currentLineStart]) {
            correctChars++;
        }
    }

    // Dynamically check if the text reaches the end of the line
    if (isEndOfLine(typedText)) {
        currentLineStart += typedText.length; // Move the visible window forward
        inputArea.value = ""; // Clear the input box
    }

    renderVisibleText(); // Update the visible text
    updateAccuracy();
}

function renderVisibleText() {
    // Extract the visible portion of the text
    const visibleText = referenceText.substring(currentLineStart); // Show text starting from the current line
    let styledHTML = "";

    for (let i = 0; i < visibleText.length; i++) {
        if (i < inputArea.value.length) {
            // Characters already typed
            if (inputArea.value[i] === visibleText[i]) {
                styledHTML += `<span style="color: black;">${visibleText[i]}</span>`;
            } else {
                styledHTML += `<span style="color: red;">${visibleText[i]}</span>`;
            }
        } else {
            // Remaining characters
            styledHTML += `<span style="color: gray;">${visibleText[i]}</span>`;
        }
    }

    textOverlay.innerHTML = styledHTML;
}

function isEndOfLine(typedText) {
    // Create a temporary span to measure the width of the typed text
    const tempSpan = document.createElement("span");
    tempSpan.style.position = "absolute";
    tempSpan.style.visibility = "hidden";
    tempSpan.style.whiteSpace = "pre";
    tempSpan.style.fontFamily = window.getComputedStyle(inputArea).fontFamily;
    tempSpan.style.fontSize = window.getComputedStyle(inputArea).fontSize;
    tempSpan.textContent = typedText;

    document.body.appendChild(tempSpan);
    const textWidth = tempSpan.offsetWidth; // Get the width of the rendered text
    document.body.removeChild(tempSpan);

    const inputWidth = inputArea.clientWidth - parseFloat(window.getComputedStyle(inputArea).paddingLeft) - parseFloat(window.getComputedStyle(inputArea).paddingRight);

    return textWidth >= inputWidth; // Check if the text width exceeds the input box width
}

function updateAccuracy() {
    const accuracy = Math.round((correctChars / totalChars) * 100) || 0;
    accuracyDisplay.textContent = accuracy;
}

startButton.addEventListener("click", startTest);
inputArea.addEventListener("input", checkInput);
