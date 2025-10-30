import prompts from "prompts";
import chalk from "chalk";
import fs from 'fs';

// Loading paragraphs
const paragraphs = JSON.parse(fs.readFileSync('../paragraphs.json', 'utf8'));
const original = paragraphs[Math.floor(Math.random() * paragraphs.length)];

const shouldEnd = false;

console.log(chalk.blue("Welcome to the Speed Typing Test!"));
await prompts({ type: 'text', name: 'ready', message: chalk.blue('Press Enter when ready...') });

console.log(chalk.blue("\n Type the following paragraph:\n"));
console.log(chalk.yellow(`"${original}"\n`));

// Gameloop
while (shouldEnd) {
  
}