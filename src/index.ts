import { cellCount, colCount, rowCount, updateColCount, updateRowCount } from "./cellCount";
import { enter } from "./inputs";

const wordList: string[] = ["mauer"]
const correctWord = wordList[Math.floor(Math.random() * wordList.length)];
const correctWordArray = correctWord.split("");

let currentWordArray: string[] = [];

updateColCount();
updateRowCount();
markCurrentCell();

export function fillCellWithLetter(letter: string, cellCount: string) {
    document.getElementById("cell" + cellCount)!.innerHTML = letter;
};

// function markCurrentRow() {
//     for (let i = 0; i < 5; i++) {
//         document.getElementById("cell" + rowCount.toString() + i)!.classList.add("currentRow");
//     }
// }

export function getCurrentWord() {
    currentWordArray = [];
    for (let i = 0; i < 5; i++) {
        currentWordArray.push(document.getElementById("cell" + rowCount.toString() + i)!.innerHTML.toLocaleLowerCase());
        console.log(currentWordArray);
    }
}

export function compareWords() {
    if (currentWordArray === correctWordArray) {
        checkForWinner();
    }

    // if (currentWordArray.length !== new Set(currentWordArray).size) {
    //   console.log(new Set(currentWordArray).size)
    // }

    // const findDuplicates = (currentWordArray: any[]) => currentWordArray.filter((item, index) => currentWordArray.indexOf(item) !== index)
    // const duplicatesOfCurrentWord = findDuplicates(currentWordArray);
    // console.log(duplicatesOfCurrentWord);




    for (let i = 0; i < 5; i++) {
        if (currentWordArray[i] === correctWordArray[i]) {
            console.log("Dein Buchstabe " + currentWordArray[i] + " kommt genau an der " + (i + 1) + ". Stelle vor!")

            document.getElementById("cell" + rowCount.toString() + i)!.style.backgroundColor = "rgba(75, 87, 62, 0.8)";
            document.getElementById("cell" + rowCount.toString() + i)!.style.color = "#FFFFFF";
        } else {
            for (let j = 0; j < 5; j++) {
                if (currentWordArray[i] === correctWordArray[j]) {
                    console.log("Dein Buchstabe " + currentWordArray[i] + " kommt irgendwo im Wort vor!")
                    document.getElementById("cell" + rowCount.toString() + i)!.style.backgroundColor = "rgba(197, 166, 46, 0.7)";
                    document.getElementById("cell" + rowCount.toString() + i)!.style.color = "#FFFFFF";
                }
            }
        }
    }

    let lettersToCheck: string[] = [];
    for (let i = 0; i < 5; i++) {
        let guessedLetterCount: number = 0;
        if (currentWordArray[i] === correctWordArray[i]) {
            document.getElementById("cell" + rowCount.toString() + i)!.style.backgroundColor = "rgba(75, 87, 62, 0.8)";
            document.getElementById("cell" + rowCount.toString() + i)!.style.color = "#FFFFFF";
            guessedLetterCount++;
        } else {
            lettersToCheck.push(currentWordArray[i])
        }
        console.log(lettersToCheck);
        
    }

    // let currentWord = currentWordArray.join("");
    // let duplicatesOfCurrentWord: string[] = [];
    // let allDuplicatesOfCurrentWord: string[] = [];
    // let duplicatesOfCorrectWord: string[] = [];
    // let allDuplicatesOfCorrectWord: string[] = [];

    // for (const letter of currentWordArray) {
    //     const splittedWord = currentWord.split(letter);
    //     console.log(splittedWord);
    //     if (splittedWord.length === 2) {
    //         console.log("Yeah, kein Duplikat");
    //     }
    //     if (splittedWord.length > 2) {
    //         console.log("Dopplung")
    //         allDuplicatesOfCurrentWord.push(letter);
    //         if (duplicatesOfCurrentWord.indexOf(letter) === -1) {
    //             duplicatesOfCurrentWord.push(letter);
    //         }
    //     }
    // }

    // for (const letter of correctWordArray) {
    //     const splittedWord = correctWord.split(letter);
    //     if (splittedWord.length === 2) {
    //         console.log("Das Lösungswort enthält kein " + letter + " Dublikat");
    //     }
    //     if (splittedWord.length > 2) {
    //         allDuplicatesOfCorrectWord.push(letter);
    //         if (duplicatesOfCorrectWord.indexOf(letter) === -1) {
    //             duplicatesOfCorrectWord.push(letter);
    //         }
    //     }
    // }

    // for (let i = 0; i < duplicatesOfCurrentWord.length; i++) {
    //     for (let j = 0; j < duplicatesOfCorrectWord.length; j++)
    //     if (duplicatesOfCurrentWord[i] === duplicatesOfCorrectWord[j]) {
    //         console.log("Die beiden Arrays enthalten das selbe Duplikat " + duplicatesOfCurrentWord[i])
            
    //     } 
    // }

    

}

export function getCell(pRowCount: number, pColCount: number) {
    return document.getElementById("cell" + pRowCount.toString() + pColCount);
}

export function checkForWinner() {
    if (currentWordArray.toString() === correctWordArray.toString()) {
        document.getElementById("winningScreen")!.classList.add("show");
    }
}

export function markCurrentCell() {
    getCell(rowCount, colCount)!.classList.add("currentCell")
    if (colCount !== 0) {
        getCell(rowCount, (colCount - 1))!.classList.remove("currentCell");
    }
}







