var AmountMissed = 0;
var usedLetters = "";
var gamesLost = 0;
var gamesWon = 0;
var HangmanPictures = ["HangmanPictures/Image0.png", "HangmanPictures/Image1.png", "HangmanPictures/Image2.png", "HangmanPictures/Image3.png", "HangmanPictures/Image4.png", "HangmanPictures/Image5.png", "HangmanPictures/Image7.png"];
var PositionDisplayed = -1;
var Categories;
var randNum2;
var randNum1;
var randCat;
var words;
var level;
var length;
var guess;
var isOneLetter;
var isLetter;
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var gameLost;
var guessAtWord;
var HintCat;
var randHintCat;
var hints;
var hint;
function OnePlayer(){
    document.getElementById("buttonStart").style.visibility = 'visible';
    document.getElementById("buttonReset").style.visibility = 'visible';
    document.getElementById("GuessEntireWord").style.visibility = 'visible';
    document.getElementById("Hint").style.visibility='visible';
    OnePlayer=true;
    decideSetup();
    document.getElementById("TypeGame1").style.visibility = "hidden";
    document.getElementById("TypeGame2").style.visibility = "hidden";
}
function TwoPlayer() {
    document.getElementById("buttonStart").style.visibility = 'visible';
    document.getElementById("buttonReset").style.visibility = 'visible';
    document.getElementById("GuessEntireWord").style.visibility = 'visible';
    TwoPlayer=true;
    OnePlayer=false;
    decideSetup();
    document.getElementById("TypeGame1").style.visibility = "hidden";
    document.getElementById("TypeGame2").style.visibility = "hidden";
}
function decideSetup(){
    if (TwoPlayer==true && OnePlayer==false){
        word = prompt("Player 1, type in a word that you want Player 2 to guess");
        length = word.length;
        length = parseInt(length);
    }
    if (OnePlayer==true){
        Categories = ["Food", "Cities", "Objects"];
        HintCat = ["Eating this","Famous Places","Everyday things you use"];
        randNum2 = Math.floor(Math.random() * Categories.length);
        randCat = Categories[randNum2];
        randHintCat = HintCat[randNum2];
        if (randCat == "Food" && randHintCat=="Eating this") {
            words = ["pizza", "apple", "grapes", "orange", "banana", "strawberry", "pickles", "sandwich", "cucumber", "spinach", "peach", "watermelon", "pear", "pasta", "bread"];
            hints = ["triangle shaped yellow unhealthy food","red round fruit","small purple stuff you eat","color is similar to its name","yellow fruit that every American eats","small red fruit"];
        }
        if (randCat == "Cities") {
            words = ["chicago", "paris", "toronto", "dubai", "istanbul", "houston", "dallas", "washington", "tokyo", "ontario", "denver", "seattle", "boston", "portland", "oklahoma"];
            hints = ["you live in this","effle tower","major city in Canada","best city ever near Persian Gulf","major tourist attraction in turkey","major city in Texas"];
        }
        if (randCat == "Objects") {
            words = ["pencil", "computer", "bed", "chair", "floor", "printer", "desk", "table", "oven", "microwave", "eraser", "cable", "wire", "folder", "binder"];
            hints = ["you write with this","you type on this","you sleep on this","you walk on this","somewhat important supply of school"];
        }
        level=prompt("pick a difficulty. write exactly easy, medium, or hard");
        if (level=="easy") {
            randNum1 = Math.floor(Math.random() * 5);
            hint = hints[randNum1];
            word = words[randNum1];
            //note: hints is only for the easy level, plus doing hints for all of them is a bit tedious
        }
        if (level=="medium") {
            randNum1 = Math.floor(Math.random() * (5) + 6);
            word = words[randNum1];
            document.getElementById("Hint").style.visibility='hidden';
        }
        if (level=="hard") {
            randNum1 = Math.floor(Math.random() * (5) + 11);
            word = words[randNum1];
            document.getElementById("Hint").style.visibility='hidden';
        }

        length = word.length;
        length = parseInt(length);
    }
}
function start() {
    showUnderlines();
    if (OnePlayer==true) {
        guess = prompt("guess a letter");
        guess = guess.toLowerCase();
    }
    if (TwoPlayer==true && OnePlayer==false){
        guess = prompt("player 2, give me a letter to guess");
        guess=guess.toLowerCase();
    }
    checkInput();
    var display3 = "";
    var temp = "";
    if (isLetter==true) {
        usedLetters = usedLetters + guess;
        document.getElementById("output").innerHTML = "Used Letters are " + usedLetters;
    }
    if (OnePlayer==true) {
        document.getElementById("output343").innerHTML = "Random Category is " + randCat;
    }
    for (k = 0; k < word.length; k++) {
        var match = false;
        for (i = 0; i < usedLetters.length; i++) {
            if (usedLetters.substring(i, i + 1) == word.substring(k, k + 1)) {
                match = true;
                temp = usedLetters.substring(i, i + 1);
            }
        }
        if (match == true) {
            display3 = display3 + " " + temp
        }
        if (match == false) {
            display3 = display3 + " " + "_";
        }
    }
    document.getElementById("display3").innerHTML = display3;
//lines 110 to 125 compares usedLetters to the actual word and displays blanks or the correct letter depending on if the guess is correct or incorrect
    var inWord=false;
    for (x=0;x<word.length;x++){
        if (guess==word.substring(x,x+1)){
            inWord=true;
        }
    }
    if (inWord==false){
        if (isLetter==true) {
            AmountMissed = AmountMissed + 1;
            PositionDisplayed = PositionDisplayed + 1;
            document.getElementById("output2").innerHTML = AmountMissed + " missed guesses";
            document.getElementById("Hangman").src = HangmanPictures[PositionDisplayed];
        }
    }
//line 127 up to line 140 are displaying/calculating missed guesses and pictures
    gameWon=true;
    for (q=0;q<display3.length;q++){
        if (display3.substring(q,q+1)=="_"){
            gameWon=false;
        }
    }
    displayWins();
    if (AmountMissed==7) {
        GamesLost();
    }
    //the called function GamesLost displays amount of games lost and everything related to it. I called this function because I needed to reuse it and it improves the readability of this program.
}
//note: for the previous function above, I abstracted out 3 core ideas into their own functions and left out 3 as they were, so it would be more even, so it wouldn't be "too abstracted"
function reset() {
    if (gameLost == true || gameWon == true) {
        randCat = "";
        decideSetup();
        usedLetters = "";
        document.getElementById("output").innerHTML = usedLetters;
        AmountMissed = 0;
        document.getElementById("output2").innerHTML = "";
        display = "";
        display3 = "";
        document.getElementById("display3").innerHTML = display;
        document.getElementById("display3").innerHTML = display3;
        PositionDisplayed = -1;
        document.getElementById("Hangman").src = "";
        document.getElementById("output343").innerHTML = "";
        document.getElementById("output47").innerHTML = "";
        document.getElementById("id9").innerHTML="";
    }
}
function checkInput(){
    if (guess.length=!1){
        isOneLetter=false;
    }
    isLetter=false;
    for (w=0;w<alphabet.length;w++){
        if (alphabet[w]==guess){
            isLetter=true;
        }
    }
    if (isOneLetter==false || isLetter==false){
        alert("type again, but this time follow the rules and only put in ONE LETTER");
    }
}
function showUnderlines(){
    var display ="";
    var i =0;
    while (i<length){
        display = display + " " + "_";
        i++;
    }
    document.getElementById("display3").innerHTML = display;
}
function GamesLost(){

        document.getElementById("Hangman").src = "HangmanPictures/GameOver.png";
        document.getElementById("display3").innerHTML=word;
        document.getElementById("output2").innerHTML="Game Over."
        gamesLost=gamesLost+1;
        gameLost=true;
        if (OnePlayer==true) {
            document.getElementById("output45").innerHTML = gamesLost + " games lost"
        }
        if (TwoPlayer==true && OnePlayer==false){
            document.getElementById("output47").innerHTML= "Player 2 Games Lost: " + gamesLost;
            document.getElementById("id1").innerHTML = "Player 1 Games Won: " + gamesLost;
        }

}
function GuessEntireWord(){
    guessAtWord = prompt("guess the entire word");
    if (guessAtWord==word) {

        gameWon = true;
        displayWins();
        document.getElementById("display3").innerHTML=guessAtWord;
    }
    else {
        GamesLost();
    }

}
function displayWins(){

  if (gameWon==true) {
        document.getElementById("Hangman").src="HangmanPictures/YouWin.gif";
        gamesWon = gamesWon + 1;
        if (OnePlayer == true) {
            document.getElementById("output46").innerHTML = gamesWon + " games won"
        }
        if (TwoPlayer == true && OnePlayer == false) {
            document.getElementById("output46").innerHTML = "Player 2 Games Won" + gamesWon;
            document.getElementById("id2").innerHTML = "Player 1 Games Lost " + gamesWon;
        }
    }

}
function Hint(){
    document.getElementById("id9").innerHTML = hint;
}


