let lives = 6;
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let lettersArray = letters.split("");
let challenge = "I challenge you to guess the letters of the hidden word."
let goodLetter = 0;

//Takes the word entered from the keyboard and returns it.
function getTheWord() {
    return document.getElementById('pwd').value.toUpperCase();
}

function startGame() {
    lives();
    createAlphabet();
    document.getElementById("text").innerHTML = challenge;
    underlineWord();
}

//The status of lives in the game is updated.
function lives() {
    if (lives >= 3) {
        document.getElementById('lives').innerText = 'Lives: ' + lives;
    } else if (lives <= 2 && lives > 0) {
         document.getElementById('lives').style.color = "red";
         document.getElementById('lives').innerText = 'Lives: ' + lives + "😬";
    } else if (lives == 0) {
        document.getElementById('lives').innerText = 'Lives: ' + lives + "💀";
    }
}

//The hidden word formed by the underscore("_") character is created.
function underlineWord() {
    let censoredText = document.getElementById("underline");
    for (let i = 0; i < getTheWord().length; ++i) {
        let underline = document.createElement("span");
        underline.className = "badge text-bg-info";
        underline.style.fontSize = '30px'; 
        underline.id = i;
        underline.innerHTML = "___";
        censoredText.appendChild(underline);
    }
}

//The letters of the alphabet are created.
function createAlphabet() {
    for (let i = 1; i < 27; ++i) {
        let btns = lettersArray.shift();;
        let buttonsContainer = document.getElementById('btns');
        let button = document.createElement('button');
        button.className = "alphabet";
        button.id = btns;
        button.innerText = btns;
        buttonsContainer.appendChild(button);
        button.onclick = () =>{checkLetter(button.id)} 
    }    
}

//It is checked whether the letter chosen by the player is in the entered word or not.
function checkLetter(id) {
    let length = getTheWord().length;
    let noMatch = 0;
    for (let i = 0; i < length; ++i) {
        if (getTheWord()[i] == id) {
            ++goodLetter;
            ++noMatch;
            document.getElementById(i).innerText = id;
            if (goodLetter == getTheWord().length) {
                winOrLose();
            }
        }
    }   
    if (noMatch == 0) {
        --lives;
        Lives();
        if (lives == 0) {
            winOrLose();    
        }
    }
    document.getElementById(id).remove();   
}

//Checking game status.
function winOrLose() {
    if (lives > 0) {
       let win = "Congratulations, you guessed the word."
        document.getElementById("WinOrLose").innerHTML = win + "😎";
        document.getElementById("btns").remove();   
    } else {
        let lose = "You lost. The word was: " + getTheWord();
        document.getElementById("WinOrLose").innerHTML = lose + "😀";
        document.getElementById("btns").remove();    
    }
}

function restartGame(){
    window.location.reload();
} 
