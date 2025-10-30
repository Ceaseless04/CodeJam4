import prompts from "prompts";
import chalk from "chalk";
import readline from 'readline';
import {
  getText,
  isGameOver,
  createTimer,
  isInputCorrect,
  calcWpm,
  calcAccuracy,
} from './utils.js';

// Loading paragraphs
const displayText = getText();

let userText = "";
let correctInputs = 0;
let totalInputs = 0;
let wpm = 0;
let accuracy = 0;

const timer = createTimer();



console.log(chalk.blue("Welcome to the Speed Typing Test!"));

console.log(chalk.blue("\n Type the following paragraph:\n"));
console.log(chalk.yellow(`"${displayText}"\n`));
console.log(chalk.blue("\n Begin typing when ready\n"));

readline.emitKeypressEvents(process.stdin); 
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdout.write('\x1b[?25l'); //hides the cursor tingy


process.stdin.on('keypress', (str, key) => {    
    if (!timer.getSeconds()) timer.start(); // start timer on first keypress

    if (key.name == "backspace"){
        userText = userText.slice(0, -1);
    }
    else if (key.ctrl && key.name === 'c'){
        process.exit();
    }
    else{
        userText += str;
        totalInputs++;
        correctInputs += isInputCorrect(userText, displayText);
        wpm = calcWpm(userText.split(" ").length, timer);
        accuracy = calcAccuracy(totalInputs, correctInputs);
        console.log(userText);
    }

    console.clear();
    console.log(chalk.blue("\n Type the following paragraph:\n"));
    console.log(chalk.yellow(displayText));
     
    process.stdout.write(userText + '_');

    if(isGameOver(userText, displayText)){
        timer.stop();
        console.log("Game Over")
        console.log(wpm);
        console.log(accuracy);
        process.exit();
    }
});



