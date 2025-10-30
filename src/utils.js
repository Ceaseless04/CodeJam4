import fs from 'fs';

export function getText(){
    const data = JSON.parse(fs.readFileSync('../paragraphs.json', 'utf-8'));
    const randomParagraph = data[Math.floor(Math.random() * data.length)];

    return randomParagraph;
}

export function isGameOver(userText, displayText){
    return userText.length == displayText.length;
}

export function createTimer(){
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

export function isInputCorrect(userText, displayText){
    const idx = userText.length - 1;
    return userText[idx] === displayText[idx];
}   

export function calcWpm(words, timer){
    const seconds = timer.getSeconds();
    if (seconds <= 10){ //Too early
        return null;
    }
    const minutes = seconds / 60;
    const wpm = words/minutes;
    return wpm.toFixed(2);
}

export function calcAccuracy(inputs, correctInputs){
    return correctInputs/ inputs;
}

export function acceptInput(){

}

// dummy functionality for car movement
export function overlayCarOnRoad(road, car, position) {
  // clone road
  let result = road.map(line => line.split(''));

  // overlay car on the road
  for (let i = 0; i < result.length; i++) {
    if (!car[i] || car[i].length === 0) continue;
    for (let j = 0; j < result[i].length; j++) {
      let roadRow = i + 6;
      let roadCol = position + j;

      if (roadRow < result.length && 
        roadCol < result[roadRow].length && 
        car[i][j] !== ' ') {
          result[roadRow][roadCol] = car[i][j];
      }
    }
  }

  // convert back to string
  return result.map(lineArr => lineArr.join('')).join('\n');
}

// dummy car test
export const road = fs.readFileSync('../ascii/road.txt', 'utf8').split('\n');


export const car = fs.readFileSync('../ascii/car.txt', 'utf8').split('\n')