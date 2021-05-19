// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let word = "";
function initialPrompt() {
  console.log("Let's play some scrabble!\n");
  word = (input.question("Enter a word to score: "));
  return word;
}

let simpleScore = function(){
  let score = 0;
  word.toUpperCase();
  for (i in word){
      score++;
    }
  }
  return score;
}

function vowelBonusScore(){
  word = word.toUpperCase();
  let score = 0;
  let vowels = ['A', 'E', 'I', 'O', 'U'];
  for (let i = 0; i < word.length; i++){
    if (vowels.includes(word[i])){
      score += 3;
    } else {
      score++;
    }
  }
  return score;
}

let scrabbleScore = function(){
  word = word.toLowerCase();
	score = 0;
	for (let i = 0; i < word.length; i++) {
    for (const pointValue in newPointStructure) {
		 if (pointValue.includes(word[i])) {
			score += Number(newPointStructure[pointValue]);
		 }
	  }
	}
  return score;
};

const scoringAlgorithms = [{
  name: "Simple",
  description: "One point per character",
  scoringFunction: simpleScore
}, 
{ name: "Vowel Bonus",
  description: "Vowels are worth 3 points",
  scoringFunction: vowelBonusScore
}, 
{ name: "Scrabble",
  description: "Uses scrabble point system",
  scoringFunction: scrabbleScore
}];

function scorerPrompt() {
  let userSelect;
  console.log("Which scoring algorithm would you like to use?\n");
  while (userSelect < 0 || userSelect > 2 || isNaN(userSelect)){
    for(i in scoringAlgorithms){
      console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
    }
    userSelect = Number(input.question("Enter 0, 1, or 2: "));
  }
  console.log(`Score for ${word}: ${scoringAlgorithms[userSelect].scoringFunction()}`)
  return scoringAlgorithms[userSelect].scoringFunction();
}

function transform() {
  let newScore = {};
  let values = "";
  let keys = "";
  let valuesArray = [];
  let lettersArray = [];

  for (k in oldPointStructure){
    values += k + ',';
    for (i in oldPointStructure[k]){
      keys += oldPointStructure[k][i];
    }
    keys += ',';
  }
  valuesArray = values.split(',')
  lettersArray = keys.split(',')
  for (i in lettersArray){
    for (item in lettersArray[i]){
      newScore[lettersArray[i][item].toLowerCase()] = Number(valuesArray[i]);
    }
  }
  return newScore;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  console.clear();
  initialPrompt();
  scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

