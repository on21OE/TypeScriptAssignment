export function toggleNavBarElements(isInstructions: boolean) {
    if(isInstructions) {
        if (document.getElementById("settings")!.style.display === "block") {
            document.getElementById("settings")!.style.display = "none";
        } 
        if (document.getElementById("instructions")!.style.display === "block") {
            document.getElementById("instructions")!.style.display = "none";
        } else {
            document.getElementById("instructions")!.style.display = "block";
        }
    } else {
        if (document.getElementById("instructions")!.style.display === "block") {
            document.getElementById("instructions")!.style.display = "none";
        }
        if (document.getElementById("settings")!.style.display === "block") {
            document.getElementById("settings")!.style.display = "none";
        } else {
            document.getElementById("settings")!.style.display = "block";
        }
    }
}