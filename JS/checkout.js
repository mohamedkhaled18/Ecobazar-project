let listCart = [];

function loadCart() {
    const localCart = localStorage.getItem('listCart');
    if (localCart) {
        listCart = Object.values(JSON.parse(localCart));
        return;
    }

    const cookieValue = document.cookie;

    if (cookieValue) {
        listCart = Object.values(JSON.parse(cookieValue.split('=')[1]));
    }
}

function displayCartItems() {
    const listCartHTML = document.querySelector('.leftCart .list');
    const cartTotalQuantityHTML = document.querySelector('.leftCart .totalQuantity');
    const cartTotalPriceHTML = document.querySelector('.leftCart .totalPrice');
    const checkoutTotalQuantityHTML = document.querySelector('.right .totalQuantity');
    const checkoutTotalPriceHTML = document.querySelector('.right .totalPrice');

    if (!listCartHTML || !cartTotalQuantityHTML || !cartTotalPriceHTML || !checkoutTotalQuantityHTML || !checkoutTotalPriceHTML) {
        return;
    }

    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;

    if (listCart && listCart.length > 0) {
        listCart.forEach(product => {
            if (product) {
                const newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = `
                    <img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price.toFixed(2)}/each</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${(product.price * product.quantity).toFixed(2)}</div>
                `;
                listCartHTML.appendChild(newCart);
                totalQuantity += product.quantity;
                totalPrice += product.price * product.quantity;
            }
        });
    } else {
        listCartHTML.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    }

    cartTotalQuantityHTML.innerText = totalQuantity;
    cartTotalPriceHTML.innerText = `$${totalPrice.toFixed(2)}`;
    checkoutTotalQuantityHTML.innerText = totalQuantity;
    checkoutTotalPriceHTML.innerText = `$${totalPrice.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    displayCartItems();
});

window.addEventListener('storage', function (event) {
    if (event.key === 'listCart') {
        loadCart();
        displayCartItems();
    }
});

// Payment
const cardNumberInput = document.getElementById("card-number");
cardNumberInput.addEventListener("keyup", (e) => {
    let input = e.currentTarget.value;
    let numbers = input.replace(/\s/g, "");
    let isValidLength = numbers.length < 16 && numbers.length > 0;
    if (numbers.length % 4 == 0 && isValidLength) {
        e.currentTarget.value += " ";
    }
})

document.querySelector(".buttonCheckout").addEventListener("click", (e) => {
    if (!checkCard()) {
        e.preventDefault();
    } else 
        alert("Order Confirmed");
});

function checkCard() {
    const cardNumber = document.getElementById("card-number").value.replace(/\s/g, "");
    const cvcNumber = document.getElementById("cvc-number").value.trim();
    const expireYearInput = parseInt(document.getElementById("expirey-year-date").value, 10);
    const expireMonthInput = parseInt(document.getElementById("expirey-month-date").value, 10);

    let valid = true;

    if (cardNumber.length != 16) {
        document.getElementById("card-number").classList.add("error-input");
        valid = false;
    } else
        document.getElementById("card-number").classList.remove("error-input");

    if (cvcNumber.length != 3) {
        document.getElementById("cvc-number").classList.add("error-input");
        valid = false;
    } else
        document.getElementById("cvc-number").classList.remove("error-input");


    if (expireMonthInput < 1 || expireMonthInput > 12) {
        document.getElementById("expirey-month-date").classList.add("error-input");
        valid = false;
    } else
        document.getElementById("expirey-month-date").classList.remove("error-input");
    
    const currentYear = new Date().getFullYear();
    if (expireYearInput < currentYear || expireYearInput > currentYear + 10) {
        document.getElementById("expirey-year-date").classList.add("error-input");
        valid = false;
    } else
        document.getElementById("expirey-year-date").classList.remove("error-input");

    return valid;
}

// Select Payment Method
const methods = document.querySelectorAll("input[type='radio']");
const cardPaymentMenu = document.querySelector(".card-payment-menu");
const confirmBtn = document.querySelector(".cash-payment-btn");

confirmBtn.addEventListener("click", () =>  {
    alert("Order Confirmed");
    window.location.reload();
});

methods.forEach(method => {
    method.addEventListener("change", (e) => {
        let paymentMethod = e.currentTarget.id;
        if (paymentMethod === "pay-card") {
            cardPaymentMenu.style.display = "block";
            confirmBtn.style.display = "none";
        }
        else  {
            cardPaymentMenu.style.display = "none";
            confirmBtn.style.display = "block";
        }
    })
});