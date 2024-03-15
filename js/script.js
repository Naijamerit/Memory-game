const squaresContainer = document.querySelector('#squares');
const numberOfSquares = 16;
let i = 0;
let square1, square2;
let clickCount = 0;
let score = 0;
document.querySelector("#score").style.visibility = "hidden";
const playAgainBtn = document.querySelector("button");
playAgainBtn.style.visibility = "hidden";
playAgainBtn.addEventListener('click', playAgain);
let colors = [
    '#33ff33',
    '#33ff33',
    '#ff944d',
    '#ff944d',
    '#80ccff',
    '#80ccff',
    '#ffff66',
    '#ffff66',
    '#ff4dff',
    '#ff4dff',
    '#ff1a1a',
    '#ff1a1a',
    '#dddddd',
    '#dddddd',
    '#000099',
    '#000099',
];

function selector() {
    const random = Math.floor(Math.random() * colors.length);
    const selected = colors[random];
    colors.splice(random, 1);
    return selected;
}

while(i < numberOfSquares) {
    const squares = document.createElement('li');
    const colors = selector();
    // squares.style.background = colors;
    squares.setAttribute("data-colors", colors);
    squaresContainer.appendChild(squares);
    i++;
}

const squares = document.querySelectorAll('li');
for(const sqare of squares) {
    sqare.addEventListener('click', squareClicked);
    }

function squareClicked(e) {
    if(square1 == this) return;
    clickCount++;
    if(clickCount > 2) return;
    clickCount === 1 ? (square1 = this) : (square2 = this);
    console.log(square1, square2);
    if(clickCount === 1){
        square1.style.background = square1.getAttribute("data-colors");
    } else {
        square2.style.background = square2.getAttribute("data-colors");
        checkMatch();
    }
}

function checkMatch(){
   let match = square1.getAttribute("data-colors") === square2.getAttribute("data-colors");
   if(!match){
        square1.classList.add("shake");
        square2.classList.add("shake");
        setTimeout(function (){
            noMatch();
        }, 500);

   } else {
    isMatch();
    checkGameEnded();
   }
}

function noMatch(){
    square1.style.background = "";
    square2.style.background = "";
    square1.classList.remove("shake");
    square2.classList.remove("shake");
    square1 = "";
    square2 = "";
    clickCount = 0;
    console.log("no Match");
}

function isMatch(){
    score++;
    document.querySelector("#score").style.visibility = "visible";
    square1.classList.add("pop");
    square2.classList.add("pop");
    document.querySelector("#score").innerHTML = score;
    square1.style.border = "none";
    square2.style.border = "none";
    square1.removeEventListener('click', squareClicked);
    square2.removeEventListener('click', squareClicked);
    clickCount = 0;
    console.log("is a Match");
}

function checkGameEnded(){
    const target = numberOfSquares / 2;
    const gameOver = score === target ? true : false;
    if(gameOver){
        playAgainBtn.style.visibility = "visible";
    }
}

function playAgain(){
    location.reload();
}