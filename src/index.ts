import { clickInCell, colCount, resetCounts, rowCount } from "./cellCount";
import { letters } from "./inputs";

export const cells = document.getElementsByClassName("cell") as HTMLCollectionOf<HTMLTableCellElement>;

const restartButtons = document.getElementsByClassName("restart") as HTMLCollectionOf<HTMLButtonElement>;
const instructionsOpenButton = document.getElementById("instructions-button") as HTMLButtonElement;
const instructionsCloseButton = document.getElementById("instructions-close") as HTMLButtonElement;
const settingsOpenButton = document.getElementById("settings-button") as HTMLButtonElement;
const settingsCloseButton = document.getElementById("settings-close") as HTMLButtonElement;
const easyModeButton = document.getElementById("easy") as HTMLButtonElement;
const normalModeButton = document.getElementById("normal") as HTMLButtonElement;
const hardModeButton = document.getElementById("hard") as HTMLButtonElement;
const winRestartButton = document.getElementById("winRestart") as HTMLButtonElement;

const easyWordList: string[] =["baum", "bein", "maus", "fein", "frau", "senf", "igel", "hund", "dose"]
const normalWordList: string[] = ["kreuz", "feder","mauer", "torte", "wurst", "pappe", "haare", "vater", "regen", "insel", "fisch", "asche", "knopf", "adler", "kelle", "welle", "fluss", "busch", "katze"]
const hardWordList: string[] = ["banane", "klappe", "jaguar", "becher", "keller", "kuppel", "frisur", "schatz", "mutter"]

export let correctWordLength = 5;
let correctWord: string;
let correctWordArray: string[];

let currentWordArray: string[] = [];

let winStreak = 1;

winRestartButton.addEventListener("click", () => winStreak++);

easyModeButton.addEventListener("click", () => changeDifficulty(4));
normalModeButton.addEventListener("click", () => changeDifficulty(5));
hardModeButton.addEventListener("click", () => changeDifficulty(6));

instructionsOpenButton.addEventListener("click", () => toggleNavBarElements(true));
instructionsCloseButton.addEventListener("click", () => toggleNavBarElements(true));
settingsOpenButton.addEventListener("click", () => toggleNavBarElements(false));
settingsCloseButton.addEventListener("click", () => toggleNavBarElements(false));

startGame();
function startGame() {
    currentWordArray = [];
    generateCells();
    clickInCell();
    markCurrentCell(false);
    getCorrectWord();
}

function restartGame() {
    currentWordArray = [];
    deleteCells();
    generateCells();
    clickInCell();
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

function changeDifficulty(difficulty: number) {
    correctWordLength = difficulty;
    restartGame();
}

function getCorrectWord() {
    switch (correctWordLength) {
        case 4:
            correctWord = easyWordList[Math.floor(Math.random() * easyWordList.length)];
            break;
        case 5:
            correctWord = normalWordList[Math.floor(Math.random() * normalWordList.length)];
            break;
        case 6:
            correctWord = hardWordList[Math.floor(Math.random() * hardWordList.length)];
            break;
    }
    correctWordArray = correctWord.split("");
}

function toggleNavBarElements(isInstructions: boolean) {
    if(isInstructions) {
        if (document.getElementById("settings")!.style.display === "block") {
            document.getElementById("settings")!.style.display = "none";
        } 
        if (document.getElementById("instructions")!.style.display === "block") {
            document.getElementById("instructions")!.style.display = "none";
        } else {
            document.getElementById("instructions")!.style.display = "block";
        }
    } else {
        if (document.getElementById("instructions")!.style.display === "block") {
            document.getElementById("instructions")!.style.display = "none";
        }
        if (document.getElementById("settings")!.style.display === "block") {
            document.getElementById("settings")!.style.display = "none";
        } else {
            document.getElementById("settings")!.style.display = "block";
        }
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
                document.getElementById("attempts")!.innerHTML = "Du hast einen Versuch gebraucht!";
                break;
            case 1:
                document.getElementById("attempts")!.innerHTML = "Du hast zwei Versuche gebraucht!";
                break;
            case 2:
                document.getElementById("attempts")!.innerHTML = "Du hast drei Versuche gebraucht!";
                break;
            case 3:
                document.getElementById("attempts")!.innerHTML = "Du hast vier Versuche gebraucht!";
                break;
            case 4:
                document.getElementById("attempts")!.innerHTML = "Du hast fünf Versuche gebraucht!";
                break;
            case 5:
                document.getElementById("attempts")!.innerHTML = "Du hast sechs Versuche gebraucht!";
                break; 
        }
        document.getElementById("currentWinStreak")!.innerHTML = "Deine Win-Streak: " + winStreak;
        return true;
    }
    return false;
}

export function checkForLoser() {
    if (rowCount === 5) {
        document.getElementById("losingScreen")!.classList.add("show");
        getCell(rowCount, colCount)?.classList.remove("currentCell");
        document.getElementById("lostWinStreak")!.innerHTML = "Deine verlorene Win-Streak: " + (winStreak - 1);
        document.getElementById("correctWord")!.innerHTML = "Das richtige Wort war: " + correctWord.toUpperCase();
        winStreak = 1;
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

function deleteCells() {
    const cellsLength = cells.length;
    for (let i = 0; i < cellsLength; i++) {
         cells[0].remove();
    }
}