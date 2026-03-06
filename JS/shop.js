import { addDataToHTML, playAddSound } from "./helpers.js";
// Cart list
const cartList = document.querySelector(".cart-list");
const close = document.querySelector(".cart-list .top-section .close");
const darkBackground = document.querySelector(".dark-background");

let cart = document.querySelector('.cart');
cart.addEventListener("click", () => {
    cartList.style.right = "0";
    darkBackground.style.display = "block";
});

close.addEventListener("click", () => {
    cartList.style.right = "-60%";
    darkBackground.style.display = "none";
});


// Cart Adding
function addCart(btn, idProduct) {
    if (listCart[idProduct] == null) {
        listCart[idProduct] = {
            ...products.find(product => product.id === idProduct),
            quantity: 1
        };
    } else {
        listCart[idProduct].quantity += 1;
    }
    totalQuantity++;
    
    // Added Animation
    const addedSound = document.getElementById("added-sound");
    addedSound.play();
    btn.innerHTML = `<i id="check" class="fa-solid fa-circle-check"></i>`;
    setTimeout(() => btn.innerHTML = `Add To Cart`, 1000);

    saveCart();
    updateCartHTML();
}

function updateCartHTML() {
    let itemsContainer = document.querySelector('.cart-list .items');
    itemsContainer.innerHTML = '';

    Object.values(listCart).forEach(product => {
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = `
            <div class="item-image">
                <img src="${product.image}" alt="">
            </div>
            <div class="content">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)} / 1 product</div>
            </div>
            <div class="quantity">
                <span onclick="changeQuantity(${product.id}, '-')">-</span>
                <span class="value">${product.quantity}</span>
                <span onclick="changeQuantity(${product.id}, '+')">+</span>
            </div>  
        `;
        itemsContainer.appendChild(newItem);
    });

    document.querySelector('.cart span').innerText = totalQuantity;
}

// Quantity Change
function changeQuantity(idProduct, type) {
    if (type === '+') {
        listCart[idProduct].quantity++;
        totalQuantity++;
    } else if (type === '-') {
        listCart[idProduct].quantity--;
        totalQuantity--;
        if (listCart[idProduct].quantity <= 0) {
            delete listCart[idProduct];
        }
    }
    saveCart();
    updateCartHTML();
}



window.addEventListener('load', () => {
    const storedCart = localStorage.getItem('listCart');
    if (storedCart) {
        listCart = JSON.parse(storedCart);
        totalQuantity = Object.values(listCart).reduce((total, product) => total + product.quantity, 0);
        updateCartHTML();
    }
    addDataToHTML('shopping');
});

window.addCart = addCart;
window.changeQuantity = changeQuantity;
function saveCart() {
    localStorage.setItem('listCart', JSON.stringify(listCart));
    document.cookie = `listCart=${JSON.stringify(listCart)}; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/`;
}

// Search
function search() {
    const input = document.querySelector('.search').value.toUpperCase();
    const resultsBox = document.querySelector('.prods-search');
    const products = document.querySelectorAll('.prodsresult');
    let hasResult = false;

    if (input.trim() !== '') {
        products.forEach(product => {
            const title = product.querySelector('h2').innerText.toUpperCase();
            if (title.includes(input)) {
                product.classList.add('show');
                hasResult = true;
            } else {
                product.classList.remove('show');
            }
        });
        if (hasResult) {
            resultsBox.classList.add('active');
        } else {
            resultsBox.classList.remove('active');
        }

    } else {
        resultsBox.classList.remove('active');
        products.forEach(product => product.classList.remove('show'));
    }
}


// Scroll To Up
let scrollIcon = document.querySelector(".scroll-up");
window.addEventListener("scroll", () => {
    // Showing The Icon
    if (window.scrollY >= 1200)
        scrollIcon.classList.add("show")
    else scrollIcon.classList.remove("show");
})

scrollIcon.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
})


