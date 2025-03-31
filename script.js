
let count = 0; // Keep track of the current card in the array
let knownCount = 0; // Keep track of known cards
let gameCards = [];

document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript is loaded and ready!");

    // Load cards from localStorage or initialize with a default card
    loadCards();

    // Add event listener to the "Add Card" button
    const addCardButton = document.getElementById("addCard");
    console.log("Add Card Button:", addCardButton); // Debugging line
    if (addCardButton) {
        addCardButton.addEventListener("click", () => {
            console.log("Add Card button clicked"); // Debugging line
            promptAddCard();
        });
    } else {
        console.error("Add Card button not found in the DOM");
    }

    // Add event listener to the "Next" button
    const nextButton = document.getElementById("nextButton");
    console.log("Next Button:", nextButton); // Debugging line
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            console.log("Next button clicked");
            displayValue();
            increaseProgress();
        });
    } else {
        console.error("Next button not found in the DOM");
    }


    const previousButton = document.getElementById("previousButton");
    console.log("Previous Button:", previousButton); // Debugging line
    if (previousButton) {
        previousButton.addEventListener("click", () => {
            console.log("Previous button clicked");
            displayValue();
            decreaseProgress();
        });
    } else {
        console.error("Previous button not found in the DOM");
    }


    // Add event listener to the "Mark as Known" button
    const knownButton = document.getElementById("knownButton");
    console.log("Mark as Known Button:", knownButton); // Debugging line
    if (knownButton) {
        knownButton.addEventListener("click", () => {
            console.log("Mark as Known button clicked");
            addToKnown();
        });
    } else {
        console.error("Mark as Known button not found in the DOM");
    }
});

// Load cards from localStorage or initialize with a default card
function loadCards() {
    const storedCards = JSON.parse(localStorage.getItem('flashcards'));
    if (storedCards && Array.isArray(storedCards)) {
        gameCards = storedCards; // Use the stored cards if available
    } else {
        gameCards = [
            { front: "Where is Dugong Cove?", back: "On the left" }
        ];
    }

    if (gameCards.length > 0) {
        document.querySelector(".card-front").innerHTML = gameCards[0].front;
    }
    increaseProgress();
}

// Save the current deck of cards to localStorage
function saveCards() {
    localStorage.setItem('flashcards', JSON.stringify(gameCards));
}

// Prompt the user for a new card's question and answer
function promptAddCard() {
    const question = prompt("Enter the question for the card:");
    const answer = prompt("Enter the answer for the card:");

    if (question && answer) {
        const newCard = { front: question, back: answer };
        gameCards.push(newCard); // Add new card to the deck
        console.log("Card added:", newCard);
        console.log("Updated gameCards:", gameCards);

        saveCards(); // Save the deck to localStorage

        // Display the new card and increase progress
        displayValue();
        increaseProgress();
    } else {
        alert("Please enter both a question and an answer.");
    }
}

// Randomly shuffle cards and store in a new array
function shuffleCards(cards) {
    let shuffledArray = [...cards];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

// Display front of card
const displayValue = () => {
    if (gameCards && count < gameCards.length - 1) {
        count++; // Increment count
        document.querySelector(".card-front").innerHTML = gameCards[count].front;

        const cardWrapper = document.querySelector('.card-wrapper');
        if (cardWrapper.classList.contains('flipped')) {
            cardWrapper.classList.toggle('flipped');
        }
    } else {
        endGame();
    }
};

// Increase progress bar
function increaseProgress() {
    let progressBar = document.getElementById("progress-bar");
    if (progressBar.value < progressBar.max) {
        progressBar.value += 4;
    } else if (progressBar.value >= progressBar.max) {
        endGame();
    }
}


function decreaseProgress() {
  let progressBar = document.getElementById("progress-bar");
  if (progressBar.value < progressBar.max) {
      progressBar.value -= 4;
  } else if (progressBar.value >= progressBar.max) {
      endGame();
  }
}

// End game
function endGame() {
    let progressBar = document.getElementById("progress-bar");
    progressBar.classList.add("end");
    showConfetti();
    console.log("knownCount:", knownCount);
    document.getElementById("ending").innerHTML = `Great job! You mastered ${knownCount} flashcards!`;
}

// Confetti
function showConfetti() {
    confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 }
    });
}

// When click on card, call flip card function
document.querySelector(".card-wrapper").addEventListener("click", flipCard);

// Trigger CSS to flip and display answer on back
function flipCard() {
    const flipCardElement = document.querySelector('.card-wrapper');
    flipCardElement.classList.toggle('flipped');
    document.querySelector(".card-back").innerHTML = gameCards[count].back;
}

// Add to known count
function addToKnown() {
    if (count < 25) { // Add to known until game is over
        const knownCountValue = document.getElementById("known-count-value");
        knownCountValue.textContent = parseInt(knownCountValue.textContent, 10) + 1;
        knownCount++; // Updating global variable
        displayValue();
        increaseProgress();
    }
}



