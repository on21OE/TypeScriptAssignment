import { cellCount, colCount, rowCount, updateColCount, updateRowCount } from "./cellCount";
import { enter } from "./inputs";

const wordList: string[] = ["feder"]
const correctWord = wordList[Math.floor(Math.random() * wordList.length)];
const correctWordArray = correctWord.split("");

let currentWordArray: string[] = [];

updateColCount();
updateRowCount();
markCurrentCell();

export function fillCellWithLetter(letter: string, cellCount: string) {
    document.getElementById("cell" + cellCount)!.innerHTML = letter;
};

// function markCurrentRow() {
//     for (let i = 0; i < 5; i++) {
//         document.getElementById("cell" + rowCount.toString() + i)!.classList.add("currentRow");
//     }
// }

export function getCurrentWord() {
    currentWordArray = [];
    for (let i = 0; i < 5; i++) {
        currentWordArray.push(document.getElementById("cell" + rowCount.toString() + i)!.innerHTML.toLocaleLowerCase());
        console.log(currentWordArray);
    }
}

export function compareWords() {
    if (currentWordArray === correctWordArray) {
        checkForWinner();
    }

    let lettersToCheck: string[] = [];
    let greenAndYellowLetters: string[] = [];
    for (let i = 0; i < 5; i++) {
        let guessedLetterCount: number = 0;
        if (currentWordArray[i] === correctWordArray[i]) {
            document.getElementById("cell" + rowCount.toString() + i)!.style.backgroundColor = "rgba(75, 87, 62, 0.8)";
            document.getElementById("cell" + rowCount.toString() + i)!.style.color = "#FFFFFF";
            lettersToCheck.push("0");
            greenAndYellowLetters.push(currentWordArray[i])
            guessedLetterCount++;
        } else if (correctWordArray.some(x => x === currentWordArray[i])){
            lettersToCheck.push(currentWordArray[i])
        } else {
            lettersToCheck.push("0");
        }
    }

    for (let i = 0; i < 5; i++) {
        if (greenAndYellowLetters.filter(x => x === lettersToCheck[i]).length 
        < correctWordArray.filter(x => x === lettersToCheck[i]).length) {
            document.getElementById("cell" + rowCount.toString() + i)!.style.backgroundColor = "rgba(197, 166, 46, 0.7)";
            document.getElementById("cell" + rowCount.toString() + i)!.style.color = "#FFFFFF";
            greenAndYellowLetters.push(lettersToCheck[i]);
        }
    }
}

export function getCell(pRowCount: number, pColCount: number) {
    return document.getElementById("cell" + pRowCount.toString() + pColCount);
}

export function checkForWinner() {
    if (currentWordArray.toString() === correctWordArray.toString()) {
        document.getElementById("winningScreen")!.classList.add("show");
    }
}

export function markCurrentCell() {
    getCell(rowCount, colCount)!.classList.add("currentCell")
    if (colCount !== 0) {
        getCell(rowCount, (colCount - 1))!.classList.remove("currentCell");
    }
}







