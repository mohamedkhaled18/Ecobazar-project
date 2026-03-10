import { addDataToHTML, playAddSound, loadProductsData } from "./helpers.js";
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

try {
    document.querySelector(".spinner").style.display = "block"
    let data = await loadProductsData();
}catch(e) {
    
} finally{
    document.querySelector(".spinner").style.display = "none"

}

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
    addDataToHTML('shop');
});

window.addCart = addCart;
window.changeQuantity = changeQuantity;

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


