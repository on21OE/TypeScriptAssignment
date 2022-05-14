import { rowCount, colCount } from "./userInput";
import { cells } from "./index";
import { correctWordLength } from "./words";

const rows = document.getElementsByClassName("row") as HTMLCollectionOf<HTMLTableRowElement>;

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
    for (const row of rows) {
        for (let  j = 0; j < correctWordLength; j++) {
            let newCell = document.createElement("td");
            newCell.setAttribute("id", "cell" + row.id.slice(3) + j);
            newCell.setAttribute("class", "cell");
            document.getElementById("row" + row.id.slice(3))?.appendChild(newCell);
        }
    }   
}

export function deleteCells() {
    const cellsLength = cells.length;
    for (let i = 0; i < cellsLength; i++) {
         cells[0].remove();
    }
}