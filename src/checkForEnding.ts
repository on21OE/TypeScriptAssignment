import { rowCount, colCount } from "./userInput";
import { getCell } from "./cellGeneration";
import { currentWordArray, correctWordArray, correctWord } from "./words";

export let winStreak = 1;

export function checkForWinner() {
    if (currentWordArray.toString() === correctWordArray.toString()) {
        document.getElementById("winningScreen")!.classList.add("show");
        document.getElementById("settings")!.style.display = "none";
        document.getElementById("instructions")!.style.display = "none";
        switch (rowCount) {
            case 0:
                document.getElementById("attempts")!.innerHTML = "Du hast einen Versuch gebraucht!";
                break;
            case 1:
                document.getElementById("attempts")!.innerHTML = "Du hast zwei Versuche gebraucht!";
                break;
            case 2:
                document.getElementById("attempts")!.innerHTML = "Du hast drei Versuche gebraucht!";
                break;
            case 3:
                document.getElementById("attempts")!.innerHTML = "Du hast vier Versuche gebraucht!";
                break;
            case 4:
                document.getElementById("attempts")!.innerHTML = "Du hast fünf Versuche gebraucht!";
                break;
            case 5:
                document.getElementById("attempts")!.innerHTML = "Du hast sechs Versuche gebraucht!";
                break; 
        }
        document.getElementById("currentWinStreak")!.innerHTML = "Deine Win-Streak: " + winStreak;
        return true;
    }
    return false;
}

export function checkForLoser() {
    if (rowCount === 5) {
        document.getElementById("losingScreen")!.classList.add("show");
        document.getElementById("settings")!.style.display = "none";
        document.getElementById("instructions")!.style.display = "none";
        getCell(rowCount, colCount)?.classList.remove("currentCell");
        document.getElementById("lostWinStreak")!.innerHTML = "Deine verlorene Win-Streak: " + (winStreak - 1);
        document.getElementById("correctWord")!.innerHTML = "Das richtige Wort war: " + correctWordArray[0].toUpperCase() + correctWord.slice(1);
        winStreak = 1;
        return true;
    }
    return false;
}

export function countWinStreak() {
    winStreak++;
}