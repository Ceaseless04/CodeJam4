//COMMENT: This is an awesome implementation of type racer using javascript
//  well done
//The car is super cute and a great addition to the game

import chalk from "chalk";
import readline from 'readline';
import {
  getText,
  isGameOver,
  createTimer,
  calcWpm,
  calcAccuracy,
  calcCompletion,
  printCar
} from './utils.js';
//COMMENT: Nice and clean addition of utils.js and importing modules

// Loading paragraphs
const displayText = getText();

let userText = [];
let correctInputs = 0;
let totalInputs = 0;
let wpm = 0;
let accuracy = 0;
let completion = 0;

const timer = createTimer();


console.clear();
console.log(chalk.blue("╔═════════════════════════════╗"));
console.log(chalk.blue("║      Speed Typing Test      ║"));
console.log(chalk.blue("╚═════════════════════════════╝"));
console.log("\n");
console.log(chalk.blue("Type the following paragraph:\n"));
console.log(chalk.yellow(`${displayText}\n`));
console.log(chalk.blue("Begin typing when ready:\n"));

readline.emitKeypressEvents(process.stdin); 
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdout.write('\x1b[?25l'); //hides the cursor tingy


process.stdin.on('keypress', (str, key) => {    
    if (!timer.getStarted()) timer.start(); // start timer on first keypress

    if (key.name === "backspace"){
        userText = userText.slice(0, -1);
        
    }
    else if (!str) {
        return;
    }
    //COMMENT: Nice addition of ctrl + c to exit in case you wanna ragequit
    else if (key.ctrl && key.name === 'c'){
        process.exit();
    }
    else if (key.name === "return" || key.name === "enter") {
        return;
    }
    else{
        userText.push({ char: str, correct: false });
        let currentIndex = userText.length - 1;

        let isCorrect = (str === displayText[currentIndex]);
        userText[currentIndex].correct = isCorrect;

        totalInputs++;
        if (isCorrect) correctInputs++;

        completion = calcCompletion(userText, displayText);
        wpm = calcWpm(userText, timer);
        accuracy = calcAccuracy(totalInputs, correctInputs);
    }

    console.clear();
    console.log(chalk.blue("\n Type the following paragraph:\n"));
    console.log(chalk.yellow(displayText));
     
    for (const { char, correct } of userText){
        process.stdout.write(correct ? chalk.green(char) : chalk.red(char));
    }
    process.stdout.write("_");

    //COMMENT: love the constantly updating typing stats
    console.log("\n");
    printCar(completion);
    console.log("WPM: " + wpm);
    console.log("Accuracy: " + accuracy + "%");

    if(isGameOver(userText, displayText)){
        timer.stop();
        console.clear();
        console.log("\n");
        console.log(chalk.yellow(displayText));
        for (const { char, correct } of userText){
            process.stdout.write(correct ? chalk.green(char) : chalk.red(char));
        }
        console.log("\n");
        printCar(completion);
        console.log("\n");
        console.log("Game Over")
        console.log("WPM: " + wpm);
        console.log("Accuracy: " + accuracy + "%");
        process.exit();
    }
});



