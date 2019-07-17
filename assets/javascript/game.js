var database = firebase.database();
var amOnline = database.ref(".info/connected");
var numConnections = database.ref("/connected");
var userRef = database.ref("/user");
var userIDnum = 0;

//every time a new username is entered, this variable increases
userRef.on("child_added", function(newUserSnap) {
    userIDnum++;
    var newUser = newUserSnap.val();
    console.log(newUser + userIDnum);
    if (userIDnum === 1) {
        $("p1-title").text(newUser);
    }

    if (userIDnum === 2) {
        $("p2-title").text(newUser);
    }

    else {
        console.log(userIDnum + " is too many")
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

function callComputer() {
    setTimeout(function () { vsComputer(); }, 1000);
}

function singlePlayer(nextStep) {
    $("#player2-buttons").attr("style", "background-color: gray;")
    //player 1 selection
    $("#player1-rock").one("click", function () {

        if (p1paper === false && p1scissors === false) {
            p1rock = true;
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

    else {
        console.log("whoops.. randomNum was " + randomNum);
    }

    compareChoice();

}

function vsPlayer() {
    $("#player2-buttons").removeAttr("style");
    $("#player1-buttons").attr("style", "background-color: gray;")
    //player 2 selection
    $("#player2-rock").one("click", function () {

        if (p2paper === false && p2scissors === false) {
            p2rock = true;
            console.log("player 2 chose rock");
            setTimeout(function () { compareChoice(); }, 1000);

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
            setTimeout(function () { compareChoice(); }, 1000);

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
            setTimeout(function () { compareChoice(); }, 1000);

        }
        else {
            console.log("player 2 already made a choice");
            return;
        }

    })


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
    userIDnum = 0;
    userRef.delete();
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

numConnections.on("value", function (snapshot) {

    if (snapshot.numChildren() <= 1) {
        $("#start-multi-game").attr("style", "color: gray;");
        $("#start-multi-game").off();
        $("#start-game").on("click", function () {
            singlePlayer(callComputer);
            $("#player2-buttons").attr("style", "background-color: gray;")
            $("#p2-title").text("Computer");
            $("#start-game").text("GAME IN PROGRESS...");

        })
    }

    else if (snapshot.numChildren() >= 2) {
        //once 2+ people are online:
        $("#start-multi-game").removeAttr("style");
        $("#start-multi-game").on("click", function () {
            console.log(userIDnum + "is the # of user IDs");
            var userID = prompt("Please enter your name");

            if (userIDnum <= 2) {
                userRef.push(userID);

            }

            else if (userIDnum > 2) {
                alert("two people are already playing");
                $("#start-multi-game").off();
            }

            userRef.on("value", function (usersnap) {
                if (usersnap.numChildren() === 2) {
                    singlePlayer(vsPlayer);
                    console.log(usersnap.val());
                }
            })

        })
    }

    else {
        console.log("how did this happen?");
    }
})


