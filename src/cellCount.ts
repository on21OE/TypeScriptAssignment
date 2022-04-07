import { fillCellWithLetter, getCurrentWord, compareWords, getCell } from "./index";
import { enter, del, letters, cell00 } from "./inputs";

export let colCount = 0;
export let rowCount = 0;
export let cellCount = colCount.toString() + rowCount.toString();

function updateCellCount() {
    cellCount = rowCount.toString() + colCount.toString();
    // console.log(cellCount);
}

export function updateRowCount() {
    enter.onclick = function() {
      if (colCount === 4) {
        getCurrentWord();
        compareWords();
        rowCount = rowCount < 5 ? rowCount + 1: rowCount;
        colCount = 0;
      }
      // console.log(cellCount);
      updateCellCount();
    }
  }
  
  export function updateColCount() {
    del.onclick = function() {
      if (getCell(rowCount, colCount)!.innerHTML === "") {
        getCell(rowCount, (colCount - 1))!.innerHTML = "";
      } else {
        getCell(rowCount, colCount)!.innerHTML = "";
      }
      colCount = colCount > 0 ? colCount - 1: colCount;
      updateCellCount();
      // console.log("delete", cellCount);
    }
  
    for (let letter of letters) {
      letter.onclick = function() {
        fillCellWithLetter(letter.id, cellCount);
        colCount = colCount < 4 ? colCount + 1: colCount;
        // console.log(letter.id);
        updateCellCount();
      }
    }
  }

