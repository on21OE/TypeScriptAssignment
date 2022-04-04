//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!

import { del, enter, letters } from "./inputs";

let cellCount = 0;
let rowCount = 0;


updateCellCount();
updateRowCount();
console.log(letters);
function updateRowCount() {
  enter.onclick = function() {
    if (cellCount === 4) {
      rowCount = rowCount > 5 ? rowCount - 1: rowCount;
      cellCount = 0;
    }
    console.log(rowCount);
  }
}

function updateCellCount() {
  del.onclick = function() {
    cellCount = cellCount > 0 ? cellCount - 1: cellCount;
    console.log("delete");
    console.log(cellCount);
  }

  for (let letter of letters) {
    letter.onclick = function() {
      cellCount = cellCount < 4 ? cellCount + 1: cellCount;
      console.log(letter.id);
      console.log(cellCount);
    }
  }
}


