import fs from 'fs';

function getText(){
    const data = JSON.parse(fs.readFileSync('paragraphs.json', 'utf-8'));
    const randomParagraph = data[Math.floor(Math.random() * data.length)];

    return randomParagraph;
}

function isGameOver(userText, displayText){
    return userText.length == displayText.length;
}

function createTimer(){
    let seconds = 0;
    let interval = null;
    
    const timer = {
        start(){
            if (interval){
                console.log("interval already exists")
                return;
            }
            interval = setInterval(() => {
                seconds++;
            }, 1000);
        },
        stop(){
            clearInterval(interval);
            interval = null;
        },
        reset(){
            seconds = 0;
        },
        getSeconds(){
            return seconds;
        }
    }
    return timer;
}

function isInputCorrect(userText, displayText){
    const idx = userText.length - 1;
    return userText[idx] === displayText[idx];
}   

function calcWpm(words, timer){
    const seconds = timer.getSeconds();
    if (seconds <= 10){ //Too early
        return null;
    }
    const minutes = seconds / 60;
    const wpm = words/minutes;
    return wpm.toFixed(2);
}

function calcAccuracy(inputs, correctInputs){
    return correctInputs/ inputs;
}