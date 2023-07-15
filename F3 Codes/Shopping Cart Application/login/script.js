var shop = document.getElementById("shop");
var cart = document.getElementById("cart");
var profile = document.getElementById("profile");
var home = document.getElementById("home");

if (!localStorage.getItem("currUser")) {
    shop.href = "javascript: void(0)";
    cart.href = "javascript: void(0)";
    profile.href = "javascript: void(0)";
}


var form = document.getElementById("form");

var allCurrUsers = [];

// check for user in currUser Database
// if (localStorage.getItem("currUser")) {

//     var email = document.getElementById("email").value;
//     var password = document.getElementById("password").value;
//     var error = document.getElementById("error");

//     allCurrUsers = JSON.parse(localStorage.getItem("currUser"));

//     allCurrUsers.forEach((user) => {
//         if ((user.email == email) && (user.password == password)) {
//             error.style.display = "inline";
//             error.innerText = "Login Successfull!";
//             // error.style.color= "red";

//             setTimeout(() => {
//                 error.style.display = "none";
//                 location.href = "../Shop/index.html";
//             },2000);

//             form.reset();
//         } 
//         return;
//     })
// }

// if (localStorage.getItem("currUser")) {
//     error.style.display = "inline";
//     error.innerText = "Login Successfull!";
//     // error.style.color= "red";

//     setTimeout(() => {
//         error.style.display = "none";
//         location.href = "../Shop/index.html";
//     },2000);

//     form.reset();
// }

var users = [];

form.addEventListener('submit', (event) => {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var error = document.getElementById("error");

    console.log(email);

    if (!(email || password)) {

        error.style.display = "inline";
        error.innerText = "Error: All Fields are Mandatory!";
        error.style.color = "red";

        setTimeout(() => {
            error.style.display = "none";
        }, 2000);
        return;
    }

    var currUser = {};
    var flag = false;

    if (localStorage.getItem("Users")) {

        users = JSON.parse(localStorage.getItem("Users"));
        console.log(users);

        users.forEach((user) => {
            if (user.email == email) {
                currUser = user;
                currUser.token = generateToken();
                flag = true;
                localStorage.setItem("currUser", JSON.stringify(currUser));
            }
        })
    }

    // Password check
    if (flag == true && currUser.password != password) {
        error.style.display = "inline";
        error.innerText = "Error: Password Incorrect";
        error.style.color = "red";

        setTimeout(() => {
            error.style.display = "none";
        }, 2000);
        return;
    }

    if (flag == false) {
        error.style.display = "inline";
        error.innerText = "Error: User Does Not Exist!";
        error.style.color = "red";

        setTimeout(() => {
            error.style.display = "none";
        }, 2000);
        return;
    }

    // Now Login is Successfull go to Shop
    error.style.display = "inline";
    error.innerText = "Login Successfull!";
    error.style.color = "green";

    setTimeout(() => {
        error.style.display = "none";
    }, 2000);

    location.href = "../shop/index.html";
    form.reset();
    return;
})

function generateToken() {

    var token = "";
    var str = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";

    for (let i = 0; i < 16; i++) {
        token += str.charAt(Math.random() * 44);
    }

    // console.log(token);
    return token;
}

// To Logout
function logoutUser() {
    localStorage.removeItem(currUser);
}