const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "1234") {

            localStorage.setItem("loggedIn", "true");

            alert("Login Successful!");

            window.location.href = "index.html";

        } else {

            alert("Invalid Username or Password!");

        }

    });

}

if (
    localStorage.getItem("loggedIn") !== "true" &&
    !window.location.pathname.includes("login.html")
) {
    window.location.href = "login.html";
}


function logout() {

    localStorage.removeItem("loggedIn");

    alert("Logged Out Successfully!");

    window.location.href = "login.html";

}