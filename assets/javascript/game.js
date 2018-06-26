$(document).ready(function() {
  var wordList = [
    "eminem",
    "big sean",
    "drake",
    "kendrick",
    "kanye",
    "logic",
    "migos",
    "post malone",
    "jay z",
    "future"
  ];

  // pick random word from list
  var draftWord = wordList[Math.floor(Math.random() * wordList.length)];

  // divide word into an array of its characters
  var currentWord = draftWord.split("");

  // initial global variable settings
  var winCounter = 0;
  var guessCounter = draftWord.length + 5;
  $("#guessnumber").html(guessCounter);
  var allGuess = [];
  var guessList = [];

  // hiding word from player
  for (var i = 0; i < currentWord.length; i++) {
    currentWord[i] = " _ ";
  }
  $("#word").html(currentWord);

  // ensure no word is repeated
  function remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  // display all instances of a letter within a word
  function getAllIndexes(arr, val) {
    var indexes = [],
      i;
    for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
    return indexes;
  }

  // player can guess letter only once
  function removeDuplicates(arr) {
    var unique_array = [];
    for (var i = 0; i < arr.length; i++) {
      if (unique_array.indexOf(arr[i]) == -1) {
        unique_array.push(arr[i]);
      }
    }
    return unique_array;
  }

  // activated when player wins
  function imageSound() {
    if (draftWord === "logic") {
      $("#winimg").attr("src", "assets/images/logic.jpeg");

      $("#winaudio").attr("src", "assets/audio/logic.mp3");
    }
    if (draftWord === "migos") {
      $("#winimg").attr("src", "assets/images/migos.jpeg");

      $("#winaudio").attr("src", "assets/audio/migos.mp3");
    }
    if (draftWord === "post malone") {
      $("#winimg").attr("src", "assets/images/postmalone.jpeg");

      $("#winaudio").attr("src", "assets/audio/postmalone.mp3");
    }
    if (draftWord === "jay z") {
      $("#winimg").attr("src", "assets/images/jayz.jpeg");

      $("#winaudio").attr("src", "assets/audio/jayz.mp3");
    }
    if (draftWord === "future") {
      $("#winimg").attr("src", "assets/images/future.jpeg");

      $("#winaudio").attr("src", "assets/audio/future.mp3");
    }

    if (draftWord === "kanye") {
      $("#winimg").attr("src", "assets/images/kanye.jpeg");

      $("#winaudio").attr("src", "assets/audio/kanye.mp3");
    }

    if (draftWord === "kendrick") {
      $("#winimg").attr("src", "assets/images/kendrick.jpeg");

      $("#winaudio").attr("src", "assets/audio/kendrick.mp3");
    }
    if (draftWord === "big sean") {
      $("#winimg").attr("src", "assets/images/bigsean.jpeg");

      $("#winaudio").attr("src", "assets/audio/bigsean.mp3");
    }

    if (draftWord === "drake") {
      $("#winimg").attr("src", "assets/images/drake.jpeg");

      $("#winaudio").attr("src", "assets/audio/drake.mp3");
    }
    if (draftWord === "eminem") {
      $("#winimg").attr("src", "assets/images/eminem.jpeg");

      $("#winaudio").attr("src", "assets/audio/eminem.mp3");
    }
    restartGame();
  }

  // alerts player that they lost that round
  function lossGame() {
    alert("You ran out of guesses! Hint(first letter): " + draftWord[0]);
    restartGame();
  }

  // activated after player wins/loses a round to reset
  function restartGame() {
    allGuess = [];
    guessList = [];
    $("#userguess").html(guessList + " ");

    // alerts player when they have won all rounds of the game
    if (wordList.length == 0) {
      alert("Congratulations you have guessed all the options correctly!");
    }

    draftWord = wordList[Math.floor(Math.random() * wordList.length)];

    currentWord = draftWord.split("");
    for (var i = 0; i < currentWord.length; i++) {
      currentWord[i] = " _ ";
    }
    guessCounter = draftWord.length + 5;
    $("#guessnumber").html(guessCounter);

    $("#word").html(currentWord);
  }

  document.onkeyup = function(event) {
    userGuess = event.key.toLowerCase();

    // function and for loop to display all instances of one letter
    var indexArray = getAllIndexes(draftWord, userGuess);

    for (var i = 0; i < draftWord.length; i++) {
      if (indexArray.length > 1) {
        currentWord[indexArray[i]] = userGuess;
      }
    }
    if (draftWord.indexOf(userGuess) > -1) {
      currentWord[draftWord.indexOf(userGuess)] = userGuess;
    } //ensures that a letter can only be guessed once
    else if (
      draftWord.indexOf(userGuess) == -1 &&
      guessList.indexOf(userGuess) == -1
    ) {
      allGuess.push(userGuess);

      guessList = removeDuplicates(allGuess);
      $("#userguess").html(guessList + " ");

      guessCounter--;
      $("#guessnumber").html(guessCounter);
    }

    $("#word").html(currentWord);

    // player wins
    if (currentWord.indexOf(" _ ") === -1) {
      winCounter++;
      $("#wins").html(winCounter);
      remove(wordList, draftWord);

      imageSound();
    }
    // player loses
    if (guessCounter == 0) {
      lossGame();
    }
  };
});
