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
let wins = 0;
let loses = 0;
let ties = 0;
function play(move) {
    const computermove = Object.keys(game)[Math.floor(Math.random() * 10 % 3)];
    console.log(move);
    console.log(game[computermove]['loses']);
    if (move === game[computermove]['loses'])
        wins++;
    else if (move === game[computermove]['loses'])
        ties++;
    else
        loses++;
    displayResult();
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
    document.querySelector(".result").innerHTML = `Wins : ${wins} , Loses : ${loses} , Ties : ${ties}`;
}
listen();