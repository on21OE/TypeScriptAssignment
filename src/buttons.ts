import { countWinStreak } from "./checkForEnding";
import { changeDifficulty, toggleNavBarElements } from "./index";

export const restartButtons = document.getElementsByClassName("restart") as HTMLCollectionOf<HTMLButtonElement>;
export const instructionsOpenButton = document.getElementById("instructions-button") as HTMLButtonElement;
export const instructionsCloseButton = document.getElementById("instructions-close") as HTMLButtonElement;
export const settingsOpenButton = document.getElementById("settings-button") as HTMLButtonElement;
export const settingsCloseButton = document.getElementById("settings-close") as HTMLButtonElement;
export const easyModeButton = document.getElementById("easy") as HTMLButtonElement;
export const normalModeButton = document.getElementById("normal") as HTMLButtonElement;
export const hardModeButton = document.getElementById("hard") as HTMLButtonElement;
export const winRestartButton = document.getElementById("winRestart") as HTMLButtonElement;

winRestartButton.addEventListener("click", () => countWinStreak());

easyModeButton.addEventListener("click", () => changeDifficulty(4));
normalModeButton.addEventListener("click", () => changeDifficulty(5));
hardModeButton.addEventListener("click", () => changeDifficulty(6));

instructionsOpenButton.addEventListener("click", () => toggleNavBarElements(true));
instructionsCloseButton.addEventListener("click", () => toggleNavBarElements(true));
settingsOpenButton.addEventListener("click", () => toggleNavBarElements(false));
settingsCloseButton.addEventListener("click", () => toggleNavBarElements(false));
