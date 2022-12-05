document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("#main-canvas");

    let pet = new Pet(canvas, localStorage.getItem("character") || "default");

    const characterList = document.querySelector("#characters-list");

    for (let character of Object.values(Characters)) {
        let characterIcon = document.createElement("img");
        characterIcon.className = "character-icon";
        characterIcon.src = `static/characters/${character}/icon.png`;
        characterIcon.width = "96";
        characterIcon.height = "96";
        characterIcon.addEventListener("click", () => {
            pet.goodbye();
            localStorage.setItem("character", character);
            pet = new Pet(canvas, character);
        });
        characterList.appendChild(characterIcon);
    }

    document.querySelector("#say-hello").addEventListener("click", () => {
        pet.playSound(pet.greetings);
    });

    document.querySelector("#pet").addEventListener("click", () => {
        pet.changeState(States.HAPPY);
    });
});