document.addEventListener("DOMContentLoaded", () => {
    const dialogue = document.querySelector(".add-review");
    const openReview = document.querySelector(".open-add-review");
    const closeReview = document.querySelector(".close-review");
    const cancelReview = document.querySelector(".cancel-review");

    const editDialogue = document.querySelector(".edit-review");
    const openEditReview = document.querySelector(".open-edit-review");
    const closeEditReview = document.querySelector(".close-edit-review");
    const cancelEditReview = document.querySelector(".cancel-edit-review");

    if (dialogue && openReview && closeReview && cancelReview) {
        openReview.addEventListener("click", () => {
            dialogue.showModal();

        });

        closeReview.addEventListener("click", () => {
            dialogue.close();
        });

        cancelReview.addEventListener("click", () => {
            dialogue.close();
        });
    }

    if (editDialogue && openEditReview && closeEditReview && cancelEditReview) {
        openEditReview.addEventListener("click", () => {
            editDialogue.showModal();

        });

        closeEditReview.addEventListener("click", () => {
            editDialogue.close();
        });

        cancelEditReview.addEventListener("click", () => {
            editDialogue.close();
        });
    }

});