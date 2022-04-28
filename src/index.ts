import { restartButtons } from "./buttons";
import { clickInCell, colCount, resetCounts, rowCount } from "./cellCount";
import { deleteCells, generateCells, getCell, markCurrentCell } from "./cellGeneration";
import { letters } from "./inputs";

export const cells = document.getElementsByClassName("cell") as HTMLCollectionOf<HTMLTableCellElement>;

const easyWordList: string[] =["baum", "bein", "maus", "fein", "frau", "senf", "igel", "hund", "dose"]
const normalWordList: string[] = ["kreuz", /*"feder","mauer", "torte", "wurst", "pappe", "haare", "vater", "regen", "insel", "fisch", "asche", "knopf", "adler", "kelle", "welle", "fluss", "busch", "katze" */]
const hardWordList: string[] = ["banane", "klappe", "jaguar", "becher", "keller", "kuppel", "frisur", "schatz", "mutter"]

export let correctWordLength = 5;
export let correctWord: string;
export let correctWordArray: string[];

export let currentWordArray: string[] = [];

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

export function changeDifficulty(difficulty: number) {
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

export function toggleNavBarElements(isInstructions: boolean) {
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

