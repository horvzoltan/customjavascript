// Find Review ID in Session storage
const reviewId = sessionStorage.getItem("Review ID");
let inputReviewId = document.getElementById("js-random-review-id");
// Insert the Review ID into the input
inputReviewId.value = reviewId;

// Insert Name into the header
const headerName = sessionStorage.getItem("Listing Name");
document.getElementById("js-header").innerHTML = headerName;

// Delete session data
document.getElementById(
  "js-publish-button"
).onclick = function deleteSessionStorage() {
  sessionStorage.clear();
};