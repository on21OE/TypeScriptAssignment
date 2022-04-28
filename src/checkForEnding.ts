import { rowCount, colCount } from "./cellCount";
import { correctWord, correctWordArray, currentWordArray, getCell, winRestartButton } from "./index";

export let winStreak = 1;

export function checkForWinner() {
    if (currentWordArray.toString() === correctWordArray.toString()) {
        document.getElementById("winningScreen")!.classList.add("show");
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
        getCell(rowCount, colCount)?.classList.remove("currentCell");
        document.getElementById("lostWinStreak")!.innerHTML = "Deine verlorene Win-Streak: " + (winStreak - 1);
        document.getElementById("correctWord")!.innerHTML = "Das richtige Wort war: " + correctWord.toUpperCase();
        winStreak = 1;
        return true;
    }
    return false;
}

export function countWinStreak() {
    winStreak++;
}