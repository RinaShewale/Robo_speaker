// form.js

// Select the form
const form = document.querySelector("form");

// Listen for form submission
form.addEventListener("submit", function(e) {
    e.preventDefault(); // prevent default submission

    // Get input values
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();

    let messages = [];
    let isValid = true;

    // ================= Validation =================

    // First name: only letters, 2-30 chars
    const nameRegex = /^[A-Za-z]{2,30}$/;
    if (!nameRegex.test(firstName)) {
        isValid = false;
        messages.push("Please enter a valid first name (letters only, 2-30 chars).");
    }

    // Last name: only letters, 2-30 chars
    if (!nameRegex.test(lastName)) {
        isValid = false;
        messages.push("Please enter a valid last name (letters only, 2-30 chars).");
    }

    // Email: standard email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        messages.push("Please enter a valid email address.");
    }

    // ================= Result =================
    if (!isValid) {
        alert(messages.join("\n"));
    } else {
        alert("Form submitted successfully!");
        form.reset(); // optional
        // Here you could also send data via AJAX
    }
});