import { collapseTextChangeRangesAcrossMultipleVersions } from "../node_modules/typescript/lib/typescript";
import { colCount, resetCounts, rowCount } from "./cellCount";
import { letters, i } from "./inputs";

const restartButtons = document.getElementsByClassName("restart") as HTMLCollectionOf<HTMLButtonElement>;
const instructionsOpenButton = document.getElementById("instructions-button") as HTMLButtonElement;
const instructionsCloseButton = document.getElementById("instructions-close") as HTMLButtonElement;
const settingsOpenButton = document.getElementById("settings-button") as HTMLButtonElement;
const settingsCloseButton = document.getElementById("settings-close") as HTMLButtonElement;
const easyModeButton = document.getElementById("easy") as HTMLButtonElement;
const normalModeButton = document.getElementById("normal") as HTMLButtonElement;
const hardModeButton = document.getElementById("hard") as HTMLButtonElement;

const easyWordList: string[] =["baum", "bein", "maus", "fein", "frau", "senf", "igel", "hund"]
const normalWordList: string[] = ["kreuz", "feder","mauer", "torte", "wurst", "pappe", "haare", "vater", "regen", "insel", "fisch", "asche", "knopf", "adler", "kelle", "welle", "fluss", "busch", "katze"]
const hardWordList: string[] = ["banane", "klappe", "jaguar", "becher", "keller", "kuppel", "frisur", "schatz"]

export let correctWordLength = 5;
let correctWord: string;
let correctWordArray: string[];

let currentWordArray: string[] = [];

startGame();
function startGame() {
    currentWordArray = [];
    generateCells();
    markCurrentCell(false);
    getCorrectWord();
}

function restartGame() {
    currentWordArray = [];
    clearCells();
    generateCells();
    resetCounts();
    markCurrentCell(false);
    getCorrectWord();
    for (let letter of letters) {
        letter.classList.remove("correctLetters");
        letter.classList.remove("existingLetters");
        letter.classList.remove("wrongLetters");
    }
    document.getElementById("settings")!.style.display = "none";
    document.getElementById("winningScreen")!.classList.remove("show");
    document.getElementById("losingScreen")!.classList.remove("show");
;}

easyModeButton.addEventListener("click", changeToEasy);
normalModeButton.addEventListener("click", changeToNormal);
hardModeButton.addEventListener("click", changeToHard);

function changeToEasy() {
    correctWordLength = 4;
    restartGame();
}

function changeToNormal() {
    correctWordLength = 5;
    restartGame();
}

function changeToHard() {
    correctWordLength = 6;
    restartGame();
}

function getCorrectWord() {
    switch (correctWordLength) {
        case 4:
            correctWord = easyWordList[Math.floor(Math.random() * easyWordList.length)];
            correctWordLength = 4;
            break;
        case 5:
            correctWord = normalWordList[Math.floor(Math.random() * normalWordList.length)];
            correctWordLength = 5;
            break;
        case 6:
            correctWord = hardWordList[Math.floor(Math.random() * hardWordList.length)];
            correctWordLength = 6;
            break;
    }
    correctWordArray = correctWord.split("");
}

instructionsOpenButton.addEventListener("click", toggleInstructions);
instructionsCloseButton.addEventListener("click", toggleInstructions);

function toggleInstructions() {
    if (document.getElementById("settings")!.style.display === "block") {
        document.getElementById("settings")!.style.display = "none";
    } 
    if (document.getElementById("instructions")!.style.display === "block") {
        document.getElementById("instructions")!.style.display = "none";
    } else {
        document.getElementById("instructions")!.style.display = "block";
    }
}

settingsOpenButton.addEventListener("click", toggleSettings);
settingsCloseButton.addEventListener("click", toggleSettings);

function toggleSettings() {
    if (document.getElementById("instructions")!.style.display === "block") {
        document.getElementById("instructions")!.style.display = "none";
    }
    if (document.getElementById("settings")!.style.display === "block") {
        document.getElementById("settings")!.style.display = "none";
    } else {
        document.getElementById("settings")!.style.display = "block";
    }
}



for (const restartButton of restartButtons) {
    restartButton.addEventListener("click", restartGame);
}

export function fillCellWithLetter(letter: string, rowCount: number, colCount: number) {
    getCell(rowCount, colCount)!.innerHTML = letter;
}

export function getCurrentWord() {
    currentWordArray = [];
    for (let i = 0; i < correctWordLength; i++) {
        currentWordArray.push(getCell(rowCount ,i)!.innerHTML);
    }
}

export function compareWords() {
    let lettersToCheck: string[] = [];
    let greenAndYellowLetters: string[] = [];
    for (let i = 0; i < correctWordLength; i++) {
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

    for (let i = 0; i < correctWordLength; i++) {
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
            newCell.setAttribute("class", "cell");
            document.getElementById("row" + i)?.appendChild(newCell);
        }
    }   
}

function clearCells() {
    const cells = document.getElementsByClassName("cell") as HTMLCollectionOf<HTMLTableCellElement>;
    console.log(cells)
    const cellsLength = cells.length;
    for (let i = 0; i < cellsLength; i++) {
         cells[0].remove();
    }
}