// If currUser exists in localStorage then do not go to login or signup page
var login = document.getElementById("login");
var signup = document.getElementById("signup");

if (localStorage.getItem("currUser")) {
    login.href = "javascript: void(0)";
    signup.href = "javascript: void(0)";
}


if (!localStorage.getItem('currUser')) {
    location.href = '../login/index.html';
}
const itemContainer = document.querySelector('.items');
const listContainer = document.querySelector('.list-container');
const totalPrice = document.getElementById('total-price');
var allCartItems = [];

if (localStorage.getItem('Cart')) {
    let cartArr = JSON.parse(localStorage.getItem('Cart'));

    allCartItems = cartArr;

    showItmes(allCartItems);

}
else {
    totalPrice.innerHTML = '0';
}



function showItmes(arr) {
    itemContainer.innerHTML = '';
    listContainer.innerHTML = '';

    if (allCartItems.length == 0) {
        itemContainer.innerHTML = `
        <h3 style='text-align: center;;'>Cart Is Empty</h3>
        `;

        totalPrice.innerHTML = '0';
    }



    arr.forEach((ele, index) => {
        itemContainer.innerHTML += `
        <div class="item">
        <img src="${ele.image}" alt="Item" />
        <div class="info">
          <div style="margin-bottom: 10px; font-weight:600">${ele.title}</div>
          <div style="font-weight:bold" class="row">
            <div class="price">$${ele.price}</div>
          </div>
          <div style='margin-top:10px;' class="row">Rating: ${Math.floor(ele.rating.rate)}</div>
        </div>
        <button id="addBtn" onClick='removeFromCart(${ele.id})'>Remove From Cart</button>
      </div>
        `;

        listContainer.innerHTML += `
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; gap:20px">
         <div><strong>${index + 1}.<strong>  ${ele.title}</div>
         <div>$${ele.price}</div>
        </div>
        `


    })

    totalPrice.innerHTML = totalPriceFunc();


}

function removeFromCart(id) {
    console.log("remove");
    let itemToRemove;
    let indexToRemove;
    allCartItems.forEach((item, index) => {
        if (item.id == id) {
            itemToRemove = item;
            indexToRemove = index;
        }
    })
    console.log(itemToRemove);
    allCartItems.splice(indexToRemove, 1);

    localStorage.setItem('Cart', JSON.stringify(allCartItems));
    showItmes(allCartItems);
}

if (allCartItems.length == 0) {
    itemContainer.innerHTML = `
    <h3 style='text-align: center;;'>No products found in the Cart</h3>
    `;
}

function totalPriceFunc() {
    return allCartItems.reduce((acc, item) => {
        return acc + item.price;
    }, 0)
}

document.getElementById("rzp-button1").onclick = function (e) {
    var options = {
        key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
        amount: totalPriceFunc() * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "MyShop Checkout",
        description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        theme: {
            color: "#000",
        },
        image:
            "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
    };

    var rzpy1 = new Razorpay(options);
    rzpy1.open();

    localStorage.removeItem('Cart');

    allCartItems = [];

    showItmes(allCartItems);
    console.log("finished");
};

// git dummy commit






