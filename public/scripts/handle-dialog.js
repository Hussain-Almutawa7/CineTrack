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
    setupDialogue(".add-user", ".open-add-user", ".close-add-user", ".cancel-user");
    setupDialogue(".edit-profile", ".open-edit-profile", ".close-edit-profile", ".cancel-edit-profile");

    const setupEditUserDialogues = () => {
        const openButtons = document.querySelectorAll(".open-edit-user");

        openButtons.forEach(openButton => {
            const userActions = openButton.closest(".user-actions");
            const dialogue = userActions.querySelector(".edit-user-pop");

            if (!dialogue) {
                return;
            }

            const closeButton = dialogue.querySelector(".close-edit-user");
            const cancelButton = dialogue.querySelector(".cancel-edit-user");

            if (!closeButton || !cancelButton) {
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
        });
    };

    setupEditUserDialogues()
});