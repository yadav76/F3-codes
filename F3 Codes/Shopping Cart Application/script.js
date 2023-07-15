// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))

// The reason you’d want to do this with the href of a link is that normally, a javascript: URL will redirect the browser to a plain text version of the result of evaluating that JavaScript. But if the result is undefined, then the browser stays on the same page. void(0) is just a short and simple script that evaluates to undefined.

var shop = document.getElementById("shop");
var cart = document.getElementById("cart");
var profile = document.getElementById("profile");
var home = document.getElementById("home");

if (!localStorage.getItem("currUser")) {
    shop.href = "javascript: void(0)";
    cart.href = "javascript: void(0)";
    profile.href = "javascript: void(0)";
}

var login = document.getElementById("login");
var signup = document.getElementById("signup");

login.addEventListener('click', () => {
    console.log("login");
    location.href = './login/index.html';
})

signup.addEventListener('click', () => {
    location.href = './signup/index.html';
})