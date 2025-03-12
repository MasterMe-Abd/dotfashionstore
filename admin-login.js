document.getElementById("adminLoginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    const adminUsername = "admin";  // Set your admin username
    const adminPassword = "password123";  // Set a strong password

    if (username === adminUsername && password === adminPassword) {
        localStorage.setItem("isAdminLoggedIn", "true"); // Store login status
        window.location.href = "admin.html"; // Redirect to admin panel
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
});
