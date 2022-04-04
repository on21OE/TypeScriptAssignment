//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!

import { cellCount, updateColCount, updateRowCount } from "./cellCount";
import { cell00, del, enter, letters } from "./inputs";

updateColCount();
updateRowCount();
fillCellWithLetter();

console.log(cell00.innerHTML);

function fillCellWithLetter() {
    let currentCell = "cell" + cellCount;
    
}



