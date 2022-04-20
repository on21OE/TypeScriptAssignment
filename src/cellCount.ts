import { fillCellWithLetter, getCurrentWord, compareWords, getCell, checkForWinner, markCurrentCell, checkForLoser, correctWordLength, cells } from "./index";
import { enter, del, letters } from "./inputs";

export let colCount = 0;
export let rowCount = 0;

export function resetCounts() {
  colCount = 0;
  rowCount = 0;
}

function checkIfRowIsFilled() {
  for (let i = 0; i < correctWordLength; i++) {
    if (getCell(rowCount, i)!.innerHTML === "") {
      return false;
    }
  }
  return true;
}

function handleEnter() {
  if (checkIfRowIsFilled()) {
    getCurrentWord();
    compareWords();
    if (checkForWinner()) {
      return;
    }
    if (checkForLoser()) {
      return;
    }
    for (const currentCell of document.getElementsByClassName("currentCell")) {
      currentCell.classList.remove("currentCell");
    }
    getCell(rowCount, (correctWordLength - 1))!.classList.remove("currentCell");
    rowCount = rowCount < 5 ? rowCount + 1: rowCount;
    colCount = 0;
    clickInCell();
    markCurrentCell(false);
  } else {
    alert("Fülle die ganze Zeile aus!")
  }
}

function handleDelete() {
  if (getCell(rowCount, colCount)!.innerHTML === "" && colCount !== 0) {
    getCell(rowCount, (colCount - 1))!.innerHTML = "";
  } else {
    getCell(rowCount, colCount)!.innerHTML = "";
  }
  colCount = colCount > 0 ? colCount - 1: colCount;
  markCurrentCell(true);
}

function handleLetterInput(letter: string) {
  fillCellWithLetter(letter, rowCount, colCount);
  colCount = colCount < (correctWordLength - 1) ? colCount + 1: colCount;
  markCurrentCell(false);
}

enter.onclick = function() {
  handleEnter();
}

del.onclick = function() {
  handleDelete();
}

for (let letter of letters) {
  letter.onclick = function() {
    handleLetterInput(letter.innerHTML);
  }
}

document.addEventListener('keydown', (event) => {
  const validKeys = "ABCDEFGAHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  const keyName = event.key;
  if (document.getElementById("winningScreen")!.classList.contains("show") 
  || document.getElementById("losingScreen")!.classList.contains("show") 
  || document.getElementById("instructions")!.style.display === "block"
  || document.getElementById("settings")!.style.display === "block") {
    return;
  }
  if (keyName === "Enter") {
    handleEnter();
  }
  if (keyName === "Backspace") {
    handleDelete();
  }
  if (validKeys.includes(keyName)) {
    handleLetterInput(keyName.toLowerCase())
  }
});

export function clickInCell() {
  for (const cell of cells) {
    cell.addEventListener("click", 
      () => {
        const cellRowCount = Number.parseInt(cell.id.substring(4, 5));
        const cellColCount = Number.parseInt(cell.id.substring(5));
        if (cellRowCount === rowCount) {
          for (const currentCell of document.getElementsByClassName("currentCell")) {
            currentCell.classList.remove("currentCell");
          }
          cell.classList.add("currentCell");
          colCount = cellColCount;
        }
      }
    )
  }
}
