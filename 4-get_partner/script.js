// Array to store questions
const questions = [
  "8/ 👨‍🦰 What type of hair do you like in men?",
  "7/ 👀 What type of eyes do you like in men?",
  "6/ 💪 What type of body do you like in men?",
  "5/ 🌙 What's your favorite date night activity?",
  "4/ 😄 Do you prefer a sense of humor or a romantic gesture?",
  "3/ 💖 What's the most attractive personality trait for you?",
  "2/ 🗨️ How important is communication in a relationship?",
  "1/ 💍 Would you prefer a surprise proposal or a planned one?",
];

// Array to store user answers
const userAnswers = [];

// Current question index
let currentQuestionIndex = 0;

// Function to generate proposal
function generateProposal() {
  // Get user input
  const userInput = document.getElementById("userInput").value;

  // Check if the input is empty
  if (userInput.trim() === "") {
    // Add a CSS class for the shaking effect
    const inputElement = document.getElementById("userInput");
    inputElement.classList.add("shake");

    // Remove the class after the animation completes
    inputElement.addEventListener("animationend", () => {
      inputElement.classList.remove("shake");
    });

    return; // Exit the function if the input is empty
  }

  // Store the user's answer
  userAnswers[currentQuestionIndex] = userInput;

  // Move to the next question or display the final result
  if (currentQuestionIndex < questions.length - 1) {
    // Display the next question
    currentQuestionIndex++;
    displayNextQuestion();
  } else {
    // Remove input and button
    document.getElementById("questionContainer").style.display = "none";
    document.getElementById("generateButton").style.display = "none";

    // Display user's answers
    displayUserAnswers();

    // Display loading message
    const resultContainer = document.getElementById("proposalResult");
    resultContainer.innerHTML = "<p>Your partner is loading...</p>";
    resultContainer.classList.remove("hidden");

    // Simulate delay (you can replace this with an actual backend call)
    setTimeout(() => {
      // Display the final result
      resultContainer.innerHTML =
        "<h2>Yee, your partner is me! Propose to me, hehe 😍🌸</h2>";
    }, 2000); // 2000 milliseconds (2 seconds) delay for demonstration
  }
}

// Function to display the next question
function displayNextQuestion() {
  // Display the next question
  const questionContainer = document.getElementById("questionContainer");
  questionContainer.innerHTML =
    `<label for='userInput'>${questions[currentQuestionIndex]}</label>` +
    "<input type='text' id='userInput' placeholder='Enter your preference'>";

  // Clear the previous user input
  document.getElementById("userInput").value = "";
}

// Function to display user answers
function displayUserAnswers() {
  // Display user's answers in a list
  const answersList = document.getElementById("userAnswers");
  userAnswers.forEach((answer, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${questions[index]}</strong>: ${answer}`;
    answersList.appendChild(listItem);
  });
}
