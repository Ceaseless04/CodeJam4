import prompts from "prompts";
import chalk from "chalk";
import readline from 'readline';
import {
  getText,
  isGameOver,
  createTimer,
  calcWpm,
  calcAccuracy,
} from './utils.js';

// Loading paragraphs
const displayText = getText();

let userText = [];
let correctInputs = 0;
let totalInputs = 0;
let wpm = 0;
let accuracy = 0;

const timer = createTimer();



console.log(chalk.blue("╔══════════════════════════╗"));
console.log(chalk.blue("║      Speed Typing Test   ║"));
console.log(chalk.blue("╚══════════════════════════╝"));

console.log(chalk.blue("\n Type the following paragraph:\n"));
console.log(chalk.yellow(`"${displayText}"\n`));
console.log(chalk.blue("\n Begin typing when ready\n"));

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

    console.log("\n");
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
        console.log("Game Over")
        console.log("WPM: " + wpm);
        console.log("Accuracy: " + accuracy + "%");
        process.exit();
    }
});



