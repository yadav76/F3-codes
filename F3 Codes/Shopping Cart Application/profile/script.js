// Write your script here

var logout = document.getElementById("logout");
var form1 = document.getElementById("nameForm");
var form2 = document.getElementById("passwordForm");
var currUser = {};


// If currUser exists in localStorage then do not go to login or signup page
var login = document.getElementById("login");
var signup = document.getElementById("signup");

if (localStorage.getItem("currUser")) {
    login.href = "javascript: void(0)";
    signup.href = "javascript: void(0)";
}

if (localStorage.getItem("currUser")) {
    currUser = JSON.parse(localStorage.getItem("currUser"));
    console.log(currUser);

    document.getElementById("firstName").value = currUser.firstName;
    document.getElementById("lastName").value = currUser.lastName;
} else {
    location.href = "../login/index.html";
}

// Logout
logout.addEventListener("click", (event) => {
    event.preventDefault();

    localStorage.removeItem("currUser");
    location.href = "../login/index.html";

    return;
})

// Now edit the user name in Database
form1.addEventListener("submit", (event) => {
    event.preventDefault();

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;

    if (!(firstName || lastName)) {
        editMessage.style.display = "inline";
        editMessage.innerText = "Error: All Fields are Mandatory.";

        setTimeout(() => {
            editMessage.style.display = "none";
        }, 2000);
        return;
    }

    var user = JSON.parse(localStorage.getItem("currUser"));
    user.firstName = firstName;
    user.lastName = lastName;

    var users = JSON.parse(localStorage.getItem("Users"));

    console.log(users);

    var currEmail = user.email;
    var tempUser = {};
    var ind = 0;

    users.forEach((element, count) => {
        if (element.email == currEmail) {

            tempUser = element;
            ind = count;

        }
        count++;
    })

    tempUser.firstName = firstName;
    tempUser.lastName = lastName;

    users[ind] = tempUser;

    localStorage.setItem("Users", JSON.stringify(users));

    editMessage.style.display = "inline";
    editMessage.innerText = "Profile Updated Successfully!";
    editMessage.style.color = "green";

    setTimeout(() => {
        editMessage.style.display = "none";
    }, 2000);

    form1.reset();
    return;
})


// Time to change the Password
form2.addEventListener("submit", (event) => {
    event.preventDefault();

    var oldPassword = document.getElementById("oldPassword").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (!(oldPassword || password || confirmPassword)) {
        passwordMessage.style.display = "inline";
        passwordMessage.innerText = "Error: All Fields are Mandatory.";

        setTimeout(() => {
            passwordMessage.style.display = "none";
        }, 2000);
        return;
    }

    if (password != confirmPassword) {
        passwordMessage.style.display = "inline";
        passwordMessage.innerText = "Error: New Confirm Password and New Password doesn't Match!";

        setTimeout(() => {
            passwordMessage.style.display = "none";
        }, 2000);
        return;
    }

    var currUser = JSON.parse(localStorage.getItem("currUser"));

    if (oldPassword != currUser.password) {
        passwordMessage.style.display = "inline";
        passwordMessage.innerText = "Error: Wrong Old Password";

        setTimeout(() => {
            passwordMessage.style.display = "none";
        }, 2000);
        return;
    }

    var users = JSON.parse(localStorage.getItem("Users"));
    var currEmail = currUser.email;
    var tempUser = {};
    var ind = 0;

    users.forEach((element, count) => {
        if (element.email == currEmail) {

            tempUser = element;
            ind = count;

        }
        count++;
    })

    tempUser.password = password;

    users[ind] = tempUser;
    localStorage.setItem("Users", JSON.stringify(users));


    // I also Have to update the password in currUser Database
    currUser.password = password;
    localStorage.setItem("currUser", JSON.stringify(currUser));

    passwordMessage.style.display = "inline";
    passwordMessage.innerText = "Password Updated Successfully!";
    passwordMessage.style.color = "green";

    setTimeout(() => {
        passwordMessage.style.display = "none";
    }, 2000);

    form2.reset();
    return;
})

