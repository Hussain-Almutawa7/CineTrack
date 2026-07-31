document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.querySelector(".delete-confirm-dialog");
    const message = document.querySelector(".delete-confirm-message");
    const cancelButton = document.querySelector(".cancel-delete");
    const confirmButton = document.querySelector(".confirm-delete");
    const deleteForms = document.querySelectorAll(".delete-form");

    if (!dialog || !message || !cancelButton || !confirmButton) {
        return;
    }

    let selectedForm = null;

    deleteForms.forEach(form => {
        form.addEventListener("submit", event => {
            event.preventDefault();
            selectedForm = form;
            const itemName = form.dataset.deleteName || "this item";
            message.textContent = `Are you sure you want to delete ${itemName}? This action cannot be undone.`;
            dialog.showModal();
        });
    });

    cancelButton.addEventListener("click", () => {
        selectedForm = null;
        dialog.close();
    });

    confirmButton.addEventListener("click", () => {
        if (!selectedForm) {
            return;
        }

        selectedForm.submit();
    });

    dialog.addEventListener("click", event => {
        if (event.target === dialog) {
            selectedForm = null;
            dialog.close();
        }
    });
});