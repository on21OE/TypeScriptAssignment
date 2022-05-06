import { rowCount } from "./cellCount";
import { getCell } from "./cellGeneration";
import { restartGame } from "./index";

const easyWordList: string[] =["baum", "bein", "maus", "fein", "frau", "senf", "igel", "hund", "dose"]
const normalWordList: string[] = ["kreuz", /*"feder","mauer", "torte", "wurst", "pappe", "haare", "vater", "regen", "insel", "fisch", "asche", "knopf", "adler", "kelle", "welle", "fluss", "busch", "katze" */]
const hardWordList: string[] = ["banane", "klappe", "jaguar", "becher", "keller", "kuppel", "frisur", "schatz", "mutter"]

export let correctWordLength = 5;
export let correctWord: string;
export let correctWordArray: string[];

export let currentWordArray: string[] = [];

export function getCorrectWord() {
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

export function resetCurrentWordArray() {
    currentWordArray = [];
}

export function changeDifficulty(difficulty: number) {
    correctWordLength = difficulty;
    restartGame();
}