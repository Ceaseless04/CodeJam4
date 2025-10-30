import prompts from "prompts";
import chalk from "chalk";
import fs from 'fs';
import {overlayCarOnRoad} from "./utils.js";

// Loading paragraphs
const paragraphs = JSON.parse(fs.readFileSync('../paragraphs.json', 'utf8'));
const original = paragraphs[Math.floor(Math.random() * paragraphs.length)];

const shouldEnd = false;

console.log(chalk.blue("Welcome to the Speed Typing Test!"));
await prompts({ type: 'text', name: 'ready', message: chalk.blue('Press Enter when ready...') });

console.log(chalk.blue("\n Type the following paragraph:\n"));
console.log(chalk.yellow(`"${original}"\n`));

// dummy car test
const road = fs.readFileSync('../ascii/road.txt', 'utf8').split('\n');


const car = fs.readFileSync('../ascii/car.txt', 'utf8').split('\n')

let carPosition = 0; // Initial position

function gameStep(correct) {
    if (correct) carPosition += 1;
    console.clear();
    console.log(overlayCarOnRoad(road, car, carPosition));
}

// Simulate game steps
gameStep(true);  // Car moves
gameStep(false); // Car stays
gameStep(true);  // Car moves
gameStep(true);  // Car moves