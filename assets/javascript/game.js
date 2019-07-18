var database = firebase.database();
var amOnline = database.ref(".info/connected");
var numConnections = database.ref("/connected");
var userRef = database.ref("/user");
var gameStatus = database.ref("/game");
var chatLog = database.ref("/chatlog");
var newGame = database.ref("/newgame");

//assigns two users who click play multiplayer to the game spaces
userRef.on("child_added", function (newUserSnap) {

    var newUser = newUserSnap.val();
    if (($("#p1-title").attr("class") === "taken") && ($("#p2-title").attr("class") !== "taken")) {
        $("#p2-title").text(newUser).attr("class", "taken");
    }

    else if ($("#p1-title").attr("class") !== "taken") {
        $("#p1-title").text(newUser).attr("class", "taken");
    }


})

//adds a true to a firebase folder each time a connection fires
amOnline.on("value", function (snap) {
    if (snap.val()) {
        var newConn = numConnections.push(true);
    }
    //and removes it when it disconnects
    newConn.onDisconnect().remove();

})

var p1rock = false;
var p1paper = false;
var p1scissors = false;
var p2rock = false;
var p2paper = false;
var p2scissors = false;

var p1wins = 0;
$("#p1-wins").text(p1wins);
var p2wins = 0;
$("#p2-wins").text(p2wins);

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

function callComputer() {
    setTimeout(function () { vsComputer(); }, 1000);
}

function singlePlayer(nextStep) {
    $("#player2-buttons").attr("style", "background-color: gray;")
    //player 1 selection
    $("#player1-rock").one("click", function () {

        if (p1paper === false && p1scissors === false) {
            p1rock = true;
            gameStatus.set({ choice: "p1rock" });
            console.log("player 1 chose rock");
            nextStep();
        }
        else {
            console.log("player 1 already made a choice");
            return;
        }

    })

    $("#player1-paper").one("click", function () {

        if (p1rock === false && p1scissors === false) {
            p1paper = true;
            gameStatus.set({ choice: "p1paper" });
            console.log("player 1 chose paper");
            nextStep();
        }
        else {
            console.log("player 1 already made a choice");
            return;
        }

    })

    $("#player1-scissors").one("click", function () {

        if (p1rock === false && p1paper === false) {
            p1scissors = true;
            gameStatus.set({ choice: "p1scissors" });
            console.log("player 1 chose scissors");
            nextStep();
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

    compareChoice();


}

function vsPlayer() {

    //player 2 selection
    $("#player2-rock").one("click", function () {

        if (p2paper === false && p2scissors === false) {
            p2rock = true;
            gameStatus.set({ choice: "p2rock" });
            console.log("player 2 chose rock");
        }
        else {
            console.log("player 2 already made a choice");
            return;
        }

    })

    $("#player2-paper").one("click", function () {

        if (p2rock === false && p2scissors === false) {
            p2paper = true;
            gameStatus.set({ choice: "p2paper" });
            console.log("player 2 chose paper");
        }
        else {
            console.log("player 2 already made a choice");
            return;
        }

    })

    $("#player2-scissors").one("click", function () {

        if (p2rock === false && p2paper === false) {
            p2scissors = true;
            gameStatus.set({ choice: "p2scissors" })
            console.log("player 2 chose scissors");
        }
        else {
            console.log("player 2 already made a choice");
            return;
        }

    })
}

function compareChoice() {
    gameStatus.remove();
    //draws
    if ((p1rock === true && p2rock === true) ||
        (p1paper === true && p2paper === true) ||
        (p1scissors === true && p2scissors === true)) {
        revealChoice()
    }

    //player 1 wins
    else if ((p1rock === true && p2scissors === true) ||
        (p1paper === true && p2rock === true) ||
        (p1scissors === true && p2paper === true)) {
        p1wins++;
        revealChoice()
    }

    //player 2 wins
    else if ((p2rock === true && p1scissors === true) ||
        (p2paper === true && p1rock === true) ||
        (p2scissors === true && p1paper === true)) {
        p2wins++;
        revealChoice()
    }

    else {
        console.log("neither wins");
    }
}

function revealChoice() {
    choicesOff();

    $("#player2-buttons").removeAttr("style");
    $("#player1-buttons").removeAttr("style");

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
    $("#start-game").text("PLAY THE COMPUTER").on("click", function () {
        $("#start-game").text("GAME IN PROGRESS...");
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
    userRef.remove();
    gameStatus.remove();
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

function multiReplay() {
    p1rock = false;
    p1paper = false;
    p1scissors = false;
    p2rock = false;
    p2paper = false;
    p2scissors = false;
    gameStatus.remove();
    $("#player1-buttons").removeAttr("style");
    $("#player1-rock").removeAttr("style");
    $("#player1-paper").removeAttr("style");
    $("#player1-scissors").removeAttr("style");
    $("#player2-rock").removeAttr("style");
    $("#player2-paper").removeAttr("style");
    $("#player2-scissors").removeAttr("style");
    singlePlayer(vsPlayer);
}

//wait for the fontawesome icons to load before activating any buttons
$(document).ready(function () {

    $("#reset-game").on("click", function () {
        p1wins = 0;
        p2wins = 0;
        $("#p1-wins").text(p1wins);
        $("#p2-wins").text(p2wins);
        resetGame();
        $("#p1-title").text("Player One").removeAttr("class");
        $("#p2-title").text("Player Two").removeAttr("class");
        $(".chat-log").remove();


    });

    numConnections.on("value", function (snapshot) {

        if (snapshot.numChildren() <= 1) {
            $("#start-multi-game").attr("style", "color: gray;");
            $("#start-multi-game").off();
            $("#start-game").on("click", function () {
                $("#player2-buttons").attr("style", "background-color: gray;")
                $("#p2-title").text("Computer");
                $("#start-game").text("GAME IN PROGRESS...");
                singlePlayer(callComputer);
            })
        }

        else if (snapshot.numChildren() >= 2) {
            //once 2+ people are online:
            $("#start-multi-game").removeAttr("style");
            $("#start-multi-game").removeAttr("title");
            //when they click the start multiplayer game button...
            $("#start-multi-game").on("click", function () {
                //if both spaces are assigned
                //clears out any previous game they may have been playing
                resetGame();
                if (($("#p1-title").attr("class") === "taken") && ($("#p2-title").attr("class") === "taken")) {
                    $("#start-multi-game").attr("title", "Two players are already in an active game.")
                    $("#start-multi-game").off();
                }

                else {
                    var userID = prompt("Please enter your name");
                    //pushes userID from prompt to firebase
                    userRef.push(userID);

                    userRef.on("value", function () {
                        //if only the first player is assigned, wait
                        if (($("#p1-title").attr("class") === "taken") && ($("#p2-title").attr("class") !== "taken")) {
                            $("start-mult-game").text("SECOND PLAYER CLICK TO BEGIN");
                        }
                        //if both players are assigned, begin
                        else if (($("#p1-title").attr("class") === "taken") && ($("#p2-title").attr("class") === "taken")) {
                            singlePlayer(vsPlayer);
                            console.log("starting the game")
                            $("#start-multi-game").text("GAME IN PROGRESS...")
                            $("#start-multi-game").off();


                        }
                    })
                }

            })
        }
    })

    //if a player makes a selection during multiplayer, the game moves on to p2's turn for both players
    gameStatus.on("value", function (p1snap) {
        var playerPick = p1snap.val().choice;
        console.log("player chose " + playerPick)
        //if a two-player game is in progress
        if ($("#p2-title").attr("class") === "taken") {
            $("#player2-buttons").removeAttr("style");
            $("#player1-buttons").attr("style", "background-color: gray;")
            if (playerPick === "p1rock") {
                p1rock = true;
                vsPlayer();
            }
            else if (playerPick === "p1paper") {
                p1paper = true;
                vsPlayer();
            }
            else if (playerPick === "p1scissors") {
                p1scissors = true;
                vsPlayer();
            }

            else if (playerPick === "p2rock") {
                p2rock = true;
                compareChoice();

            }

            else if (playerPick === "p2paper") {
                p2paper = true;
                compareChoice();

            }

            else if (playerPick === "p2scissors") {
                p2scissors = true;
                compareChoice();

            }

            $("#start-multi-game").text("PLAY EACH OTHER AGAIN");
            $("#start-multi-game").on("click", function () {
                newGame.set({replay: true})
                multiReplay();

            })

        }
    })

    //chat window functionality
    $("#submit-chat").on("click", function () {
        chatLog.push($("#chat-new").val().trim());
        $("#chat-new").val("");
    })

    chatLog.on("child_added", function (chatSnap) {
        var newMsg = chatSnap.val();
        if (newMsg !== "") {
            var newLine = $("<p>");
            newLine.text(newMsg).attr("class", "chat-log");
            $("#chat1").prepend(newLine);
        }
    })

    $("#clear-chat").on("click", function () {
        chatLog.remove();
    })

    chatLog.on("child_removed", function () {
        $(".chat-log").remove();
    })

    newGame.on("child_added", function(){
        multiReplay();
        newGame.remove();
    })

})

