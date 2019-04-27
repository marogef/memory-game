const cardsNames = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

const cardsContainer = document.querySelector(".deck");

let cardsopen = [];
let matchedCards = [];

/*
 * start the game
 */
function startGame() {
    for(let i = 0; i < cardsNames.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${cardsNames[i]}"></i>`;
        cardsContainer.appendChild(card);
    
        // Add Click Event to each Card
        click(card);
    }
}
// First Click Indicator
let firstClick = true;

// Click Function
function click(card) {

    // Card Click Event
    card.addEventListener("click", function() {

        if(firstClick) {
            // Start our timer
            startTimer();
            // Change our First Click indicator's value
            firstClick = false;
        }
        
        const currentCard = this;
        const previousCard = cardsopen[0];

        // We have an existing OPENED card
        if(cardsopen.length === 1) {

            card.classList.add("open", "show", "disable");
            cardsopen.push(this);

            //compare the 2 opened cards!
            compareCards(currentCard, previousCard);

        } else {
        // We don't have any open cards
            currentCard.classList.add("open", "show", "disable");
            cardsopen.push(this);
        } 
    });
}

function compareCards(currentCard, previousCard) {

    // Matcher
    if(currentCard.innerHTML === previousCard.innerHTML) {  
        // Matched
        currentCard.classList.add("match");
        previousCard.classList.add("match");
        matchedCards.push(currentCard, previousCard);
        cardsopen = [];
        // Check if the game is over!
        isOver();

    } else {
        // Wait 500ms then, do this!
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");
            
        }, 500);

        cardsopen = [];
        
    }
    // Add New Move
    addMove();
}

/*
 * Make a function to see if the game is over
 */
function checkIfOver() {
    if(matchedCards.length === boxNames.length) {

        // Stop our timer
        stopTimer();
        alert("We're done here!");
        
    }
}
/*
 * Add move
 */
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    // Set the rating
    rating();
}
/*
 * Rating
 */
const cardContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
cardContainer.innerHTML = star + star + star;
function rating() {
    if( moves < 10) {
        cardContainer.innerHTML = star + star + star;
    } else if( moves < 15) {
        cardContainer.innerHTML = star + star;
    } else {
        cardContainer.innerHTML = star;
    }
}
/*
 * Timer
 */
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;
// Set the default value to timer's container
timerContainer.innerHTML = totalSeconds + 's';

 function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with new time
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
}

function stopTimer() {
    clearInterval(liveTimer);
}

/*
 * Restart the Button
 */
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    // Delete ALL of the cards
    cardsContainer.innerHTML = "";

    // Call the `startGame` to create new cards
    startGame();

    // Reset game
    reset();

});


/*
 * Reset the Game Variables
 */
function reset() {
    // Empty the `matchedCards` array
    matchedCards = [];

    // Reset the moves
    moves = 0;
    movesContainer.innerHTML = moves;

    // Reset the rating
    container.innerHTML = star + star + star;

    stopTimer();
    firstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";
}
//Start the game for the first time!
startGame();

// shuffle the function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
