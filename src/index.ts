//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!

import { cellCount, updateColCount, updateRowCount } from "./cellCount";


updateColCount();
updateRowCount();

export function fillCellWithLetter(letter: string, cellCount: string) {
    document.getElementById("cell" + cellCount)!.innerHTML = letter;
};



