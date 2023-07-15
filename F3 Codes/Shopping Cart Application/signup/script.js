var shop = document.getElementById("shop");
var cart = document.getElementById("cart");
var profile = document.getElementById("profile");
var home = document.getElementById("home");
var login = document.getElementById("login");

if (!localStorage.getItem("currUser")) {
    shop.href = "javascript: void(0)";
    cart.href = "javascript: void(0)";
    profile.href = "javascript: void(0)";
}


var form = document.getElementById("form");

var Users = [];

form.addEventListener('submit', (event) => {

    event.preventDefault();

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var error = document.getElementById("error");

    // console.log(firstName, lastName, email, password, confirmPassword);

    if (!(firstName || lastName || email || password || confirmPassword)) {
        error.style.display = "inline";
        error.innerText = "Error: All Fields are Mandatory.";
        error.style.color = "red";

        setTimeout(() => {
            error.style.display = "none";
        }, 2000);
        return;
    }

    // Password check
    if (password != confirmPassword) {
        error.innerText = "Error: Passwrod and Confirm Password Not Matched";
        error.style.display = "inline";
        error.style.color = "red";

        setTimeout(() => {
            error.style.display = "none";
        }, 2000);
        return;
    }

    var user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };


    var flag = false;
    // user already exist return
    if (localStorage.getItem("Users")) {

        console.log("userExist");
        Users = JSON.parse(localStorage.getItem("Users"));

        Users.forEach((element) => {
            if (element.email === email) {
                flag = true;

                console.log("true");
                error.innerText = "Error: User Already Exist";
                error.style.display = "inline";
                error.style.color = "green";

                setTimeout(() => {
                    error.style.display = "none";
                    location.href = '../login/index.html';
                }, 1000);
                return;
            }
        })
    }

    if (flag == true) return;

    // if user doesn't exist then save to localStorage
    Users.push(user);
    console.log(Users);

    localStorage.setItem('Users', JSON.stringify(Users));

    error.innerText = "User Added Successfully";
    error.style.display = "inline";
    error.style.color = "green";

    setTimeout(() => {
        error.style.display = "none";
        location.href = '../login/index.html';
        form.reset();
    }, 2000);
    return;


})
