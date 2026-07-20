document.addEventListener("DOMContentLoaded", () => {
    const dialogue = document.querySelector(".add-review");
    const openReview = document.querySelector(".open-add-review");
    const closeReview = document.querySelector(".close-review");
    const cancelReview = document.querySelector(".cancel-review");

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
});
