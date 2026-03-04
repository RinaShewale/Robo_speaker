const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const firstName = document.getElementById("first-name")?.value.trim();
    const lastName = document.getElementById("last-name")?.value.trim();
    const email = document.getElementById("email").value.trim();

    let messages = [];
    let isValid = true;

    const nameRegex = /^[A-Za-z]{2,30}$/;

    if (firstName && !nameRegex.test(firstName)) {
        isValid = false;
        messages.push("Please enter a valid first name.");
    }

    if (lastName && !nameRegex.test(lastName)) {
        isValid = false;
        messages.push("Please enter a valid last name.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        messages.push("Please enter a valid email address.");
    }

    if (!isValid) {
        alert(messages.join("\n"));
    } else {
        alert("Form submitted successfully!");

        // Redirect after success
        window.location.href = "index.html";
    }
});