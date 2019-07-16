var database = firebase.database();

var p1rock = false;
var p1paper = false;
var p1scissors = false;
var p2rock = false;
var p2paper = false;
var p2scissors = false;

var p1wins = 0;
var p2wins = 0;
var draws = 0;

function playerChoose() {

    //player 1 selection
    $("#player1-rock").on("click", function () {

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

    $("#player1-paper").on("click", function () {

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

    $("#player1-scissors").on("click", function () {

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
    $("#player2-rock").on("click", function () {

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

    $("#player2-paper").on("click", function () {

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

    $("#player2-scissors").on("click", function () {

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

function compareChoice() {
    console.log(p1rock + p1paper + p1scissors);

    if ((p1rock === true && p2rock === true) || 
    (p1paper === true && p2paper === true) ||
    (p1scissors === true && p2scissors === true)){

        console.log("tie");
    }

    else {
        console.log("this is broken");
    }
}

$("#start-game").on("click", function(){
    playerChoose();
    $("#start-game").text("GAME IN PROGRESS...");
   
})