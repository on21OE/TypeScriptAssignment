import { restartButtons } from "./buttons";
import { clickInCell, resetCounts } from "./cellCount";
import { deleteCells, generateCells, markCurrentCell } from "./cellGeneration";
import { letters } from "./inputs";
import { getCorrectWord, resetCurrentWordArray } from "./words";

export const cells = document.getElementsByClassName("cell") as HTMLCollectionOf<HTMLTableCellElement>;



for (const restartButton of restartButtons) {
    restartButton.addEventListener("click", restartGame);
}

startGame();
function startGame() {
    resetCurrentWordArray();
    generateCells();
    clickInCell();
    markCurrentCell(false);
    getCorrectWord();
}

export function restartGame() {
    resetCurrentWordArray();
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



