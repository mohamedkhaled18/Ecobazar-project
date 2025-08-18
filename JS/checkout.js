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

