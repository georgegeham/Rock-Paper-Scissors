const game = {
    rock: {
        loses: "paper",
        beats: "scissors"
    },
    paper: {
        loses: "scissors",
        beats: "rock"
    },
    scissors: {
        loses: "rock",
        beats: "paper"
    }
};
const result = JSON.parse(localStorage.getItem('result')) || {
    wins: 0,
    loses: 0,
    ties: 0
};
displayResult();
function play(move) {
    const computermove = Object.keys(game)[Math.floor(Math.random() * 10 % 3)];
    console.log(move);
    console.log(game[computermove]['loses']);
    if (move === game[computermove]['loses']) {
        result.wins++;
        gamePlay(move, computermove, "Win.");
    }
    else if (move === computermove) {
        result.ties++;
        gamePlay(move, computermove, "Tie.");
    }
    else {
        result.loses++;
        gamePlay(move, computermove, "Lose.")
    }
    displayResult();
    save();
}
function listen() {
    document.querySelectorAll(".icon").forEach(button => {
        button.addEventListener('click', () => {
            play(button.dataset.id);
        }
        )
    })
};
function displayResult() {
    document.querySelector(".result").innerHTML = `Wins : ${result.wins} , Loses : ${result.loses} , Ties : ${result.ties}`;
}
function save() {
    localStorage.setItem('result', JSON.stringify(result));
}
function clear() {
    document.querySelector('.alert').innerHTML = `
        <p> Are you sure you want to reset the score <button class = "yes">Yes</button><button class="no">No</button></p>
    `
    document.querySelector('.yes').addEventListener('click', () => {
        result.wins = 0;
        result.loses = 0;
        result.ties = 0;
        displayResult();
        save();
        document.querySelector('.alert').innerHTML = '';
    })
    document.querySelector('.no').addEventListener('click', () => { document.querySelector('.alert').innerHTML = '' })
}
document.querySelector(".reset").addEventListener('click', () => {
    clear();
})
let isauto = false;
let key;
function autoplay() {
    if (!isauto) {
        isauto = true;
        key = setInterval(() => {
            const auto = Object.keys(game)[Math.floor(Math.random() * 5 % 3)];
            play(auto);
        }, 1000);
        document.querySelector('.autoPlay').innerHTML = 'Stop';
    }
    else {
        clearInterval(key);
        isauto = false;
        document.querySelector('.autoPlay').innerHTML = 'Auto Play';
    }
}
document.querySelector(".autoPlay").addEventListener('click', () => {
    autoplay();
});
function gamePlay(move, computermove, result) {
    document.querySelector('.gameplay').innerHTML = `<h3>${result}</h3>
    <p> You <img class= "inline" src="image/${move}-emoji.png"> <img class= "inline" src="image/${computermove}-emoji.png">
     Computer 
    `
}
document.addEventListener("keydown", e => {
    if (e.key === 'a')
        autoplay();
    if (e.key === " ")
        clear();
})
listen();
