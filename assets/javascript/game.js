var database = firebase.database();

var p1rock = false;
var p1paper = false;
var p1scissors = false;
var p2rock = false;
var p2paper = false;
var p2scissors = false;

var p1wins = 0;
var p2wins = 0;

function playerChoose() {

    //player 1 selection
    $("#player1-rock").one("click", function () {

        if (p1paper === false && p1scissors === false) {
            p1rock = true;
            console.log("player 1 chose rock");
            compareChoice();
        }
        else {
            console.log("player 1 already made a choice");
            return;
        }

    })

    $("#player1-paper").one("click", function () {

        if (p1rock === false && p1scissors === false) {
            p1paper = true;
            console.log("player 1 chose paper");
            compareChoice();
        }
        else {
            console.log("player 1 already made a choice");
            return;
        }

    })

    $("#player1-scissors").one("click", function () {

        if (p1rock === false && p1paper === false) {
            p1scissors = true;
            console.log("player 1 chose scissors");
            compareChoice();
        }
        else {
            console.log("player 1 already made a choice");
            return;
        }

    })

    //player 2 selection
    $("#player2-rock").one("click", function () {

        if (p2paper === false && p2scissors === false) {
            p2rock = true;
            console.log("player 2 chose rock");
            compareChoice();
        }
        else {
            console.log("player 2 already made a choice");
            return;
        }

    })

    $("#player2-paper").one("click", function () {

        if (p2rock === false && p2scissors === false) {
            p2paper = true;
            console.log("player 2 chose paper");
            compareChoice();
        }
        else {
            console.log("player 2 already made a choice");
            return;
        }

    })

    $("#player2-scissors").one("click", function () {

        if (p2rock === false && p2paper === false) {
            p2scissors = true;
            console.log("player 2 chose scissors");
            compareChoice();
        }
        else {
            console.log("player 2 already made a choice");
            return;
        }

    })

}

function singlePlayer() {
    //player 1 selection
    $("#player1-rock").one("click", function () {

        if (p1paper === false && p1scissors === false) {
            p1rock = true;
            console.log("player 1 chose rock");
            setTimeout(function () { vsComputer(); }, 1000);

        }
        else {
            console.log("player 1 already made a choice");
            return;
        }

    })

    $("#player1-paper").one("click", function () {

        if (p1rock === false && p1scissors === false) {
            p1paper = true;
            console.log("player 1 chose paper");
            setTimeout(function () { vsComputer(); }, 1000);
        }
        else {
            console.log("player 1 already made a choice");
            return;
        }

    })

    $("#player1-scissors").one("click", function () {

        if (p1rock === false && p1paper === false) {
            p1scissors = true;
            console.log("player 1 chose scissors");
            setTimeout(function () { vsComputer(); }, 1000);

        }
        else {
            console.log("player 1 already made a choice");
            return;
        }

    })


}

function vsComputer() {
    var randomNum = Math.floor(Math.random() * 3)
    console.log("computer chose " + randomNum);

    if (randomNum === 0) {
        p2rock = true;
    }

    else if (randomNum === 1) {
        p2paper = true;
    }

    else if (randomNum === 2) {
        p2scissors = true;
    }

    else {
        console.log("whoops.. randomNum was " + randomNum);
    }

    compareChoice();

}

function compareChoice() {
    //draws
    if ((p1rock === true && p2rock === true) ||
        (p1paper === true && p2paper === true) ||
        (p1scissors === true && p2scissors === true)) {
        revealChoice()
        console.log("player one " + p1rock + p1paper + p1scissors);
        console.log("player two " + p2rock + p2paper + p2scissors);
        console.log("it's a tie");
        // resetGame();
    }

    //player 1 wins
    else if ((p1rock === true && p2scissors === true) ||
        (p1paper === true && p2rock === true) ||
        (p1scissors === true && p2paper === true)) {
        p1wins++;
        revealChoice()
        console.log("player one " + p1rock + p1paper + p1scissors);
        console.log("player two " + p2rock + p2paper + p2scissors);
        console.log("the number of times p1 has won is " + p1wins);
        // resetGame();
    }

    //player 2 wins
    else if ((p2rock === true && p1scissors === true) ||
        (p2paper === true && p1rock === true) ||
        (p2scissors === true && p1paper === true)) {
        p2wins++;
        revealChoice()
        console.log("player one " + p1rock + p1paper + p1scissors);
        console.log("player two " + p2rock + p2paper + p2scissors);
        console.log("the number of times p2 has won is " + p2wins);
        // resetGame();
    }

    else {
        console.log("neither wins - yet?");
    }
}

function revealChoice() {
    choicesOff();

    if (p1rock === true) {
        $("#player1-rock").attr("style", "color: black");

    }

    else if (p1paper === true) {
        $("#player1-paper").attr("style", "color: black");

    }

    else if (p1scissors === true) {
        $("#player1-scissors").attr("style", "color: black");

    }

    if (p2rock === true) {
        $("#player2-rock").attr("style", "color: black");
    }

    else if (p2paper === true) {
        $("#player2-paper").attr("style", "color: black");

    }

    else if (p2scissors === true) {
        $("#player2-scissors").attr("style", "color: black");

    }

    $("#p1-wins").text(p1wins);
    $("#p2-wins").text(p2wins);
    $("#start-game").text("PLAY THE COMPUTER AGAIN").on("click", function () {
        resetGame()
        $("#player2-buttons").attr("style", "background-color: gray;")
        $("#p2-title").text("Computer");
    })

}

function choicesOff() {
    //buttons can't be clicked between games
    $("#player1-rock").off();
    $("#player1-paper").off();
    $("#player1-scissors").off();
    $("#player2-rock").off();
    $("#player2-paper").off();
    $("#player2-scissors").off();
}

function resetGame() {
    p1rock = false;
    p1paper = false;
    p1scissors = false;
    p2rock = false;
    p2paper = false;
    p2scissors = false;
    //colors go back to default
    $("#player2-buttons").removeAttr("style");
    $("#p2-title").text("Player Two");
    $("#player1-rock").removeAttr("style");
    $("#player1-paper").removeAttr("style");
    $("#player1-scissors").removeAttr("style");
    $("#player2-rock").removeAttr("style");
    $("#player2-paper").removeAttr("style");
    $("#player2-scissors").removeAttr("style");

}

//if there is one or less person online:
$("#start-game").on("click", function () {
    singlePlayer();
    $("#player2-buttons").attr("style", "background-color: gray;")
    $("#p2-title").text("Computer");
    $("#start-game").text("GAME IN PROGRESS...");

})

//once 2+ people are online:
// $("#start-game").on("click", function () {
//     playerChoose();
//     $("#start-game").text("GAME IN PROGRESS...");

// })