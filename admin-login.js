document.getElementById("adminLoginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    const adminUsername = "admin";
    const adminPassword = "password123";

    if (username === adminUsername && password === adminPassword) {
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "admin.html";
    } else {
        document.getElementById("errorMessage").style.display = "block";
    }
});
