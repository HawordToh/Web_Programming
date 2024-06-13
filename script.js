// Array of questions with images and correct options
const questions = [
  {
    image: "A.Madrid.jpg",
    correct_option: "A.Madrid",
  },
  {
    image: "AC Milan.jpg",
    correct_option: "AC Milan",
  },
  {
    image: "Arsenal.jpg",
    correct_option: "Arsenal",
  },
  {
    image: "Barcelona.jpg",
    correct_option: "Barcelona",
  },
  {
    image: "Bayern.jpg",
    correct_option: "Bayern",
  },
  {
    image: "Chelsea.jpg",
    correct_option: "Chelsea",
  },
  {
    image: "Dortmund.jpg",
    correct_option: "Dortmund",
  },
  {
    image: "Everton.jpg",
    correct_option: "Everton",
  },
  {
    image: "Fulham.jpg",
    correct_option: "Fulham",
  },
  {
    image: "Girona.jpg",
    correct_option: "Girona",
  },
  {
    image: "I.Milan.jpg",
    correct_option: "I.Milan",
  },
  {
    image: "Juventus.jpg",
    correct_option: "Juventus",
  },
  {
    image: "Lazio.jpg",
    correct_option: "Lazio",
  },
  {
    image: "Leicester.jpg",
    correct_option: "Leicester",
  },
  {
    image: "Leipzig.jpg",
    correct_option: "Leipzig",
  },
  {
    image: "Lens.jpg",
    correct_option: "Lens",
  },
  {
    image: "Leverkusen.jpg",
    correct_option: "Leverkusen",
  },
  {
    image: "Liverpool.jpg",
    correct_option: "Liverpool",
  },
  {
    image: "Lyon.jpg",
    correct_option: "Lyon",
  },
  {
    image: "M.City.jpg",
    correct_option: "M.City",
  },
  {
    image: "M.United.jpg",
    correct_option: "M.United",
  },
  {
    image: "Marseille.jpg",
    correct_option: "Marseille",
  },
  {
    image: "Monaco.jpg",
    correct_option: "Monaco",
  },
  {
    image: "Napoli.jpg",
    correct_option: "Napoli",
  },
  {
    image: "Newcastle.jpg",
    correct_option: "Newcastle",
  },
  {
    image: "PSG.jpg",
    correct_option: "PSG",
  },
  {
    image: "R.Madrid.jpg",
    correct_option: "R.Madrid",
  },
  {
    image: "Roma.jpg",
    correct_option: "Roma",
  },
  {
    image: "Sevilla.jpg",
    correct_option: "Sevilla",
  },
  {
    image: "Spurs.jpg",
    correct_option: "Spurs",
  },
];

//All options
const optionsArray = [
  "A.Madrid",
  "AC Milan",
  "Arsenal",
  "Atalanta",
  "Barcelona",
  "Bayern",
  "Bilbao",
  "Bologna",
  "Brentford",
  "Brighton",
  "Chelsea",
  "Dortmund",
  "Everton",
  "Frankfurt",
  "Fulham",
  "Getafe",
  "Girona",
  "I.Milan",
  "Juventus",
  "Lazio",
  "Leicester",
  "Leipzig",
  "Lens",
  "Leverkusen",
  "Liverpool",
  "Luton",
  "Lyon",
  "M.City",
  "M.United",
  "Marseille",
  "Monaco",
  "Napoli",
  "Newcastle",
  "PSG",
  "R.Madrid",
  "Roma",
  "Sevilla",
  "Sociedad",
  "Spurs",
  "Westham",
];

// DOM elements
const container = document.querySelector(".container");
const gameContainer = document.querySelector(".game-container");
const startButton = document.getElementById("start");
const scoreContainer = document.querySelector(".score-container");
const userScore = document.getElementById("user-score");
let timer = document.getElementsByClassName("timer")[0];
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

let nextBtn;
let score, currentQuestion, finalQuestions;
let countdown, count = 11;

// Function to randomly select a value from an array
const randomValueGenerator = (array) =>
  array[Math.floor(Math.random() * array.length)];

// Function to shuffle an array randomly
const randomShuffle = (array) => array.sort(() => 0.5 - Math.random());

// Function to start the game
const startGame = () => {
  scoreContainer.classList.add("hide"); // Hide the score container
  gameContainer.classList.remove("hide"); // Show the game container
  finalQuestions = populateQuestions(); // Get 10 random questions
  score = 0; // Initialize score to 0
  currentQuestion = 0; // Initialize current question index
  cardGenerator(finalQuestions[currentQuestion]); // Generate the first question card
};

// Function to display the timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count -= 1;
    timer.innerHTML = `<span>Time Left: </span>${count}s`;
    if (count === 0) {
      clearInterval(countdown); // Clear the interval if time is up
      proceedToNextQuestion(); // Proceed to the next question
    }
  }, 1000);
};

// Function to create options for a question
const populateOptions = (correct_option) => {
  let arr = [];
  arr.push(correct_option); // Add the correct option to the array
  let optionsCount = 1;
  while (optionsCount < 4) {
    let randomvalue = randomValueGenerator(optionsArray); // Get a random option
    if (!arr.includes(randomvalue)) {
      arr.push(randomvalue); // Add the random option if not already in the array
      optionsCount += 1;
    }
  }
  return arr;
};

// Function to choose 10 random questions
const populateQuestions = () => {
  let questionsCount = 0;
  let chosenObjects = [];
  let questionsBatch = [];
  while (questionsCount < 10) {
    let randomvalue = randomValueGenerator(questions); // Get a random question
    let index = questions.indexOf(randomvalue);
    if (!chosenObjects.includes(index)) {
      questionsBatch.push(randomvalue); // Add the random question to the batch
      chosenObjects.push(index); // Track the index of chosen questions
      questionsCount += 1;
    }
  }
  return questionsBatch;
};

// Function to check the selected answer
const checker = (e) => {
  let userSolution = e.target.innerText;
  let options = document.querySelectorAll(".option");
  if (userSolution === finalQuestions[currentQuestion].correct_option) {
    e.target.classList.add("correct"); // Highlight the correct option
    score++;
    correctSound.play(); // Play correct sound
  } else {
    e.target.classList.add("incorrect"); // Highlight the incorrect option
    options.forEach((element) => {
      if (element.innerText == finalQuestions[currentQuestion].correct_option) {
        element.classList.add("correct"); // Highlight the correct answer
      }
    });
    wrongSound.play(); // Play wrong sound
  }

  clearInterval(countdown); // Stop the timer
  // Disable all options
  options.forEach((element) => {
    element.disabled = true;
  });

  // Enable the next button
  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) {
    nextBtn.disabled = false;
    nextBtn.addEventListener("click", handleManualNext);
  }
};

// Function to handle moving to the next question
const nextQuestion = (manual = false) => {
  if (manual) {
    const footballImage = document.getElementById("football-image");
    if (footballImage) {
      const unblurredImage = footballImage.src.replace('_blurred.jpg', '.jpg');
      footballImage.src = unblurredImage; // Show the unblurred image
    }

    // Disable the next button to prevent multiple clicks
    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
      nextBtn.disabled = true;
      nextBtn.removeEventListener("click", handleManualNext);
    }

    setTimeout(() => {
      proceedToNextQuestion(); // Move to the next question after 3 seconds
    }, 3000);
  } else {
    proceedToNextQuestion(); // Move to the next question immediately
  }
};

// Function to proceed to the next question
const proceedToNextQuestion = () => {
  currentQuestion += 1; // Increment the current question index
  if (currentQuestion == finalQuestions.length) {
    gameContainer.classList.add("hide"); // Hide the game container
    scoreContainer.classList.remove("hide"); // Show the score container
    startButton.innerText = `RESTART`; // Change button text to "RESTART"
    userScore.innerHTML =
      "Your score is " + score + " out of " + currentQuestion + " !";
    clearInterval(countdown); // Clear the timer
  } else {
    cardGenerator(finalQuestions[currentQuestion]); // Generate the next question card
  }
};

// Function to handle the manual "Next" button click
const handleManualNext = () => {
  nextQuestion(true);
};

// Function to generate the question card UI
const cardGenerator = (cardObject) => {
  const { image, correct_option } = cardObject;
  let options = randomShuffle(populateOptions(correct_option)); // Shuffle options
  const blurredImage = image.replace('.jpg', '_blurred.jpg');
  container.innerHTML = `<div class="quiz">
  <p class="num">
  ${currentQuestion + 1}/10
  </p>
  <div class="questions">
    <img class="football-image" src="${blurredImage}" id="football-image"/>
  </div>
    <div class="options">
    <button class="option" onclick="checker(event)">${options[0]}</button>
    <button class="option" onclick="checker(event)">${options[1]}</button>
    <button class="option" onclick="checker(event)">${options[2]}</button>
    <button class="option" onclick="checker(event)">${options[3]}</button>
    </div>

    <div class="nxt-btn-div">
        <button class="next-btn" id="next-btn" disabled>Next</button>
    </div>

  </div>`;
  count = 11; // Reset timer
  clearInterval(countdown); // Clear any existing timer
  timerDisplay(); // Display the timer
};

// Add event listener to start button
startButton.addEventListener("click", startGame);
