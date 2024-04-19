document.addEventListener("DOMContentLoaded", function() {
    var footer = document.getElementById("footer");
    var closeButton = document.getElementById("closeButton");

    // Show footer
    footer.style.display = "block";

    // Close footer after 10 seconds
    setTimeout(function() {
        footer.style.display = "none";
    }, 10000);

    // Hide footer permanently when close button is clicked
    closeButton.addEventListener("click", function() {
        footer.style.display = "none";
        // Save user preference to localStorage
        localStorage.setItem("hideFooter", "true");
    });

    // Check if footer should be hidden permanently
    if (localStorage.getItem("hideFooter") === "true") {
        footer.style.display = "none";
    }
});
