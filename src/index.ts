import { colCount, rowCount } from "./cellCount";

const restartButtons = document.getElementsByClassName("restart") as HTMLCollectionOf<HTMLButtonElement>;

const wordList: string[] = ["rasan" /*"kreuz", "feder","mauer", "torte", "wurst", "pappe", "haare", "vater", "regen", "insel", "fisch" */]
const correctWord = wordList[Math.floor(Math.random() * wordList.length)];
const correctWordArray = correctWord.split("");
let correctWordLength = 5;

let currentWordArray: string[] = [];

generateCells();
markCurrentCell(false);

for (const restartButton of restartButtons) {
    restartButton.addEventListener("click", restartGame);
}

function restartGame() {
    document.location.reload();
}

export function fillCellWithLetter(letter: string, rowCount: number, colCount: number) {
    getCell(rowCount, colCount)!.innerHTML = letter;
}

export function getCurrentWord() {
    currentWordArray = [];
    for (let i = 0; i < 5; i++) {
        currentWordArray.push(getCell(rowCount ,i)!.innerHTML);
    }
}

export function compareWords() {
    let lettersToCheck: string[] = [];
    let greenAndYellowLetters: string[] = [];
    for (let i = 0; i < 5; i++) {
        if (currentWordArray[i] === correctWordArray[i]) {
            document.getElementById("cell" + rowCount.toString() + i)!.classList.add("correctLetters");
            document.getElementById(currentWordArray[i])!.classList.add("correctLetters");
            if (document.getElementById(currentWordArray[i])!.classList.contains("existingLetters")) {
                document.getElementById(currentWordArray[i])!.classList.remove("existingLetters");
            }
            lettersToCheck.push("0");
            greenAndYellowLetters.push(currentWordArray[i])
        } else if (correctWordArray.some(x => x === currentWordArray[i])){
            lettersToCheck.push(currentWordArray[i])
        } else {
            lettersToCheck.push("0");
            document.getElementById(currentWordArray[i])!.classList.add("wrongLetters");
        }
    }

    for (let i = 0; i < 5; i++) {
        if (greenAndYellowLetters.filter(x => x === lettersToCheck[i]).length 
        < correctWordArray.filter(x => x === lettersToCheck[i]).length) {
            document.getElementById("cell" + rowCount.toString() + i)!.classList.add("existingLetters");
            if (!document.getElementById(currentWordArray[i])!.classList.contains("correctLetters")) {
                document.getElementById(currentWordArray[i])!.classList.add("existingLetters");
            }
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
        switch (rowCount) {
            case 0:
                document.getElementById("stats")!.innerHTML = "Du hast einen Versuch (" + (rowCount + 1) + ") gebraucht!";
                break;
            case 1:
                document.getElementById("stats")!.innerHTML = "Du hast zwei Versuche (" + (rowCount + 1) + ") gebraucht!";
                break;
            case 2:
                document.getElementById("stats")!.innerHTML = "Du hast drei Versuche (" + (rowCount + 1) + ") gebraucht!";
                break;
            case 3:
                document.getElementById("stats")!.innerHTML = "Du hast vier Versuche (" + (rowCount + 1) + ") gebraucht!";
                break;
            case 4:
                document.getElementById("stats")!.innerHTML = "Du hast fünf Versuche (" + (rowCount + 1) + ") gebraucht!";
                break;
            case 5:
                document.getElementById("stats")!.innerHTML = "Du hast sechs Versuche (" + (rowCount + 1) + ") gebraucht!";
                break; 
        }
        return true;
    }
    return false;
}

export function checkForLoser() {
    if (rowCount === 5) {
        document.getElementById("losingScreen")!.classList.add("show");
        getCell(rowCount, colCount)?.classList.remove("currentCell");
        return true;
    }
    return false;
}

export function markCurrentCell(isLetterDeleted: boolean) {
    getCell(rowCount, colCount)!.classList.add("currentCell")
    if (colCount !== 0) {
        getCell(rowCount, (colCount - 1))!.classList.remove("currentCell");
    }
    if (isLetterDeleted) {
        getCell(rowCount, (colCount + 1))!.classList.remove("currentCell");
    }
}

function generateCells() {
    for (let i = 0; i < 6; i++) {
        for (let  j = 0; j < correctWordLength; j++) {
            let newCell = document.createElement("td");
            newCell.setAttribute("id", "cell" + i + j);
            document.getElementById("row" + i)?.appendChild(newCell);
        }
    }   
}