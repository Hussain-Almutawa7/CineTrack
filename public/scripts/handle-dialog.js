document.addEventListener("DOMContentLoaded", () => {
    const setupDialogue = (dialogueSelector, openSelector, closeSelector, cancelSelector) => {
        const dialogue = document.querySelector(dialogueSelector);
        const openButton = document.querySelector(openSelector);
        const closeButton = document.querySelector(closeSelector);
        const cancelButton = document.querySelector(cancelSelector);

        if (!dialogue || !openButton || !closeButton || !cancelButton) {
            return;
        }

        const closeDialogue = () => {
            dialogue.close();
        };

        openButton.addEventListener("click", () => {
            dialogue.showModal();
        });

        closeButton.addEventListener("click", closeDialogue);
        cancelButton.addEventListener("click", closeDialogue);
    };

    setupDialogue(".add-review", ".open-add-review", ".close-review", ".cancel-review");
    setupDialogue(".edit-review", ".open-edit-review", ".close-edit-review", ".cancel-edit-review");
    setupDialogue(".add-rate", ".open-add-rating", ".close-rate", ".cancel-rate");
});