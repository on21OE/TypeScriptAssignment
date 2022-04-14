import { fillCellWithLetter, getCurrentWord, compareWords, getCell, checkForWinner, markCurrentCell } from "./index";
import { enter, del, letters } from "./inputs";

export let colCount = 0;
export let rowCount = 0;

enter.onclick = function() {
  console.log(colCount);
  if (colCount === 4) {
    getCurrentWord();
    checkForWinner();
    compareWords();
    getCell(rowCount, 4)!.classList.remove("currentCell");
    rowCount = rowCount < 5 ? rowCount + 1: rowCount;
    colCount = 0;
    markCurrentCell(false);
  }
}


del.onclick = function() {
  if (getCell(rowCount, colCount)!.innerHTML === "" && colCount !== 0) {
    getCell(rowCount, (colCount - 1))!.innerHTML = "";
  } else {
    getCell(rowCount, colCount)!.innerHTML = "";
  }
  colCount = colCount > 0 ? colCount - 1: colCount;
  markCurrentCell(true);
}

for (let letter of letters) {
  letter.onclick = function() {
    fillCellWithLetter(letter.id, rowCount, colCount);
    colCount = colCount < 4 ? colCount + 1: colCount;
    console.log(colCount);
    markCurrentCell(false);
  }
}

