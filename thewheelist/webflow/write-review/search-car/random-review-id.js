let inputReviewId = document.getElementById("js-random-review-id");
// Generate random number
function getRandomString(length) {
  var randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}
// Call generate 30 characters random string and store it into variable
const reviewId = getRandomString(30);
// Set generated random string into the session ID
sessionStorage.setItem("Review ID", reviewId);
// Insert the Review ID into the input
inputReviewId.value = reviewId;


