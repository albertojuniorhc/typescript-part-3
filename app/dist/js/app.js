import { NegotiationController } from "./controllers/negotiationController.js";
const controller = new NegotiationController();
const form = document.querySelector(".form");
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        controller.add();
    });
}
else {
    throw Error("Error on application");
}
const importButton = document.querySelector('#btn-import');
if (importButton) {
    importButton.addEventListener('click', (event) => {
        event.preventDefault();
        controller.importData();
    });
}
else {
    throw Error("Error on application");
}
