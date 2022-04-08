//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!

import { cellCount, colCount, rowCount, updateColCount, updateRowCount } from "./cellCount";
import { enter } from "./inputs";

const wordList: string[] = ["apfel"]
const correctWord = wordList[Math.floor(Math.random() * wordList.length)];
const correctWordArray = correctWord.split("");

let currentWordArray: string[] = [];

updateColCount();
updateRowCount();

export function fillCellWithLetter(letter: string, cellCount: string) {
    document.getElementById("cell" + cellCount)!.innerHTML = letter.toLocaleUpperCase();
};

function markCurrentRow() {
    for (let i = 0; i < 5; i++) {
        document.getElementById("cell" + rowCount.toString() + i)!.classList.add("currentRow");
    }
}

export function getCurrentWord() {
    currentWordArray = [];
    for (let i = 0; i < 5; i++) {
        currentWordArray.push(document.getElementById("cell" + rowCount.toString() + i)!.innerHTML.toLocaleLowerCase());
        console.log(currentWordArray);
    }
}

export function compareWords() {
    for (let i = 0; i < 5; i++) {
        if (currentWordArray[i] === correctWordArray[i]) {
            console.log("Dein Buchstabe " + currentWordArray[i] + " kommt genau an der " + (i + 1) + ". Stelle vor!")
            document.getElementById("cell" + rowCount.toString() + i)!.style.backgroundColor = "#C5FFA5";
        } else {
            for (let j = 0; j < 5; j++) {
                if (currentWordArray[i] === correctWordArray[j]) {
                    console.log("Dein Buchstabe " + currentWordArray[i] + " kommt irgendwo im Wort vor!")
                    document.getElementById("cell" + rowCount.toString() + i)!.style.backgroundColor = "#F9F871";
                }
            }
        }
    }
}

export function getCell(pRowCount: number, pColCount: number) {
    return document.getElementById("cell" + pRowCount.toString() + pColCount);
}







