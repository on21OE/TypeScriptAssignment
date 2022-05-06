import { rowCount, colCount } from "./cellCount";
import { cells } from "./index";
import { correctWordLength } from "./words";

export function getCell(pRowCount: number, pColCount: number) {
    return document.getElementById("cell" + pRowCount.toString() + pColCount);
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

export function generateCells() {
    for (let i = 0; i < 6; i++) {
        for (let  j = 0; j < correctWordLength; j++) {
            let newCell = document.createElement("td");
            newCell.setAttribute("id", "cell" + i + j);
            newCell.setAttribute("class", "cell");
            document.getElementById("row" + i)?.appendChild(newCell);
        }
    }   
}

export function deleteCells() {
    const cellsLength = cells.length;
    for (let i = 0; i < cellsLength; i++) {
         cells[0].remove();
    }
}