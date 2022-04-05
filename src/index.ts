//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!

import { cellCount, colCount, rowCount, updateColCount, updateRowCount } from "./cellCount";
import { enter } from "./inputs";

const correctWord = "apfel";

let currentWord: string[] = [];

updateColCount();
updateRowCount();

export function fillCellWithLetter(letter: string, cellCount: string) {
    document.getElementById("cell" + cellCount)!.innerHTML = letter;
};


export function getCurrentWord() {
    console.log(document.getElementById("cell0" + colCount)!.innerHTML);
    if (rowCount === 0 && currentWord.length < 5) {
       // currentWord.push(document.getElementById("cell0" + (colCount - 1))!.innerHTML);
        console.log(currentWord);
    }
    enter.onclick = function() {
        if (colCount === 4) {
          
        }
        // console.log(cellCount);
      }
}







