const btnRefresh = document.getElementById("btn-refresh");
const btnPause = document.getElementById("btn-pause");
const btnSound = document.querySelector(".sound_off_btn");
const block = document.querySelector(".block");
const character = document.querySelector(".character");
let counterDisplayElem = document.getElementById("counter-display");
let gameOverAlert = document.getElementById("gameover-alert");
let gameStartAlert = document.getElementById("gamestart-alert");
const AUDIO_BG = new Audio("./audio/backgroundmusic.mp3");
const AUDIO_GAMEOVER = new Audio("./audio/gameover.wav");
const AUDIO_MOVE = new Audio("./audio/move.mp3");
let count = 0;

const faceOne = document.querySelector(".face_one");
const faceTwo = document.querySelector(".face_two");
const faceThree = document.querySelector(".face_three");

function aaa() {
    if (character.classList.contains("one")) {
        character.classList.remove("one");
    }
    if (character.classList.contains("two")) {
        character.classList.remove("two");
    }
    if (character.classList.contains("three")) {
        character.classList.remove("three");
    }
}


function changeFaceOne() {
    aaa();
    character.classList.add('one');
}
function changeFaceTwo() {
    aaa();
    character.classList.add('two');
}
function changeFaceThree() {
    aaa();
    character.classList.add('three');
}

faceOne.onclick = changeFaceOne;
faceTwo.onclick = changeFaceTwo;
faceThree.onclick = changeFaceThree;



document.addEventListener("keypress", function (event) {
    if (event.key === "r") {
        btnRefresh.click();
    }
});

AUDIO_BG.volume = 0.2;
AUDIO_BG.loop = true;

document.addEventListener("keypress", function (event) {
    if (event.key === " ") {
        startGame();
    }
});

document.addEventListener("keypress", function (event) {
    if (event.key === "r") {
        btnRefresh.click();
    }
});

function soundOnOff() {
    btnSound.classList.toggle("sound_on");
    if (btnSound.classList.contains("sound_on")) {
        AUDIO_BG.play();
    } else {
        AUDIO_BG.pause();
    }
}
btnSound.onclick = soundOnOff;

function startGame() {
    block.classList.toggle("active");
    character.classList.toggle("active");
    gameStartAlert.style.display = "none ";
    soundOnOff();
}
btnPause.onclick = startGame;

function moveLeft() {
    let left = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    left -= 100;
    if (left >= 0) {
        character.style.left = left + "px";
        AUDIO_MOVE.play();
    }
}
function moveRight() {
    let left = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    left += 100;
    if (left < 300) {
        character.style.left = left + "px";
        AUDIO_MOVE.play();
    }
}

let counterSeconds = setInterval(() => {
    counterDisplayElem.innerHTML = ++count;
}, 1000);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveLeft();
    }
    if (event.key === "ArrowRight") {
        moveRight();
    }
});

let move = block.addEventListener("animationiteration", () => {
    let random = Math.floor(Math.random() * 3);
    left = random * 100;
    block.style.left = left + "px";
});

setInterval(function () {
    let characterLeft = parseInt(
        window.getComputedStyle(character).getPropertyValue("left")
    );
    let blockLeft = parseInt(
        window.getComputedStyle(block).getPropertyValue("left")
    );
    let blockTop = parseInt(
        window.getComputedStyle(block).getPropertyValue("top")
    );
    if (characterLeft == blockLeft && blockTop < 500 && blockTop > 300) {
        btnRefresh.style.display = "block";
        btnPause.style.display = "none";
        block.style.animation = "none";
        gameOverAlert.style.display = "block";
        counterDisplayElem.style.left = "20px";
        counterDisplayElem.style.scale = "2";
        AUDIO_BG.pause();
        AUDIO_GAMEOVER.play();
        clearInterval(counterSeconds);
    }
}, 10);

document.getElementById("left").addEventListener("touchstart", moveLeft);
document.getElementById("right").addEventListener("touchstart", moveRight);
