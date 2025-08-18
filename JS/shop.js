let products = [
    {
        "id": 1, "name": "Fresh Banana", "price": 3.60, "image": "../materials/Yellow-Banana-1-Kg.jpg", "numrevs": "1025", "discount": 0.10,
        "linkPage": "banana.html"
    },
    {
        "id": 2, "name": "Fresh Strawberry", "price": 4.00, "image": "../materials/straww.png", "numrevs": "734", "discount": 0.20,
        "linkPage": "straw.html"
    },
    {
        "id": 3, "name": "Fresh Tomato", "price": 1.80, "image": "../materials/tomato.jpg", "numrevs": "206", "discount": 0.10,
        "linkPage": "tomato.html"
    },
    {
        "id": 4, "name": "Fresh Orange", "price": 2.25, "image": "../materials/Orange-Valencia-1-Kg.jpg", "numrevs": "389", "discount": 0.25,
        "linkPage": "orange.html"
    },
    {
        "id": 5, "name": "Canned Pineapple", "price": 9.00, "image": "../materials/cannedpineapple.jpg", "numrevs": "805", "discount": 0.10,
        "linkPage": "cannedpineapple.html"
    },
    {
        "id": 6, "name": "Frozen Berries", "price": 4.80, "image": "../materials/frozenberries.jpg", "numrevs": "2465", "discount": 0.40,
        "linkPage": "frozenberries.html"
    },
    {
        "id": 7, "name": "Fresh Cucumber", "price": 2.00, "image": "../materials/cucmber.jpg", "numrevs": "346", "discount": 0.50,
        "linkPage": "cucmber.html"
    },
    {
        "id": 8, "name": "Mixed Fruits", "price": 10.80, "image": "../materials/mixedfruits.jpg", "numrevs": "1548", "discount": 0.10,
        "linkPage": "mixedfruits.html"
    },
    {
        "id": 9, "name": "Fresh Onions", "price": 2.25, "image": "../materials/onions.jpg", "numrevs": "108", "discount": 0.10,
        "linkPage": "onions.html"
    },
    {
        "id": 10, "name": "Fresh Lettuce", "price": 2.25, "image": "../materials/lettuce.jpg", "numrevs": "798", "discount": 0.75,
        "linkPage": "lettuce.html"
    },
    {
        "id": 11, "name": "Dried Fruits", "price": 15.00, "image": "../materials/dried fruits.jpg", "numrevs": "128", "discount": 0.75,
        "linkPage": "driedfruits.html"
    },
    {
        "id": 12, "name": "Fresh Pepper", "price": 1.50, "image": "../materials/pepper.jpeg", "numrevs": "158", "discount": 0.75,
        "linkPage": "papper.html"
    },
];
let totalQuantity = 0;
let listCart = {};

function addDataToHTML() {
    let listProductHTML = document.querySelector('.prodfield');
    // let currentPage = String(location.href.split("/").slice(-1)).replace("#", "");
    // let Products = currentPage === "index.html" ? Object.values(products).slice(0, 8) : Object.values(products).slice(0, 12);
    listProductHTML.innerHTML = '';

    products.forEach(product => {
        const oldPrice = (product.price / (1 - product.discount)).toFixed(2);
        const discountPercentage = Math.round(product.discount * 100);
        let newProduct = document.createElement('div');
        

        newProduct.classList.add('prod');
        newProduct.innerHTML = `
            <img src="${product.image}">
        <div class="decsription">
            <a class="single-product" href="${product.linkPage}">${product.name}</a>
            <div class="stars">
                <span>★★★★★</span>
                <span class="numrevs">(${product.numrevs})</span>
            </div>
            <div class="price">
                <span class="old">$${oldPrice}</span>
                <span class="new">$${product.price.toFixed(2)}</span>
                <span class="discount">${discountPercentage}% OFF</span>
            </div>
            <div class="addcart">
                <button id="add-btn" onclick="addCart(this,${product.id})">Add To Cart</button>
            </div>
        </div>
                `;
        listProductHTML.appendChild(newProduct);
    });
}

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


function addDataToHTML() {
    let listProductHTML = document.querySelector('.prodfield');
    listProductHTML.innerHTML = '';

    products.forEach(product => {
        const oldPrice = (product.price / (1 - product.discount)).toFixed(2);
        const discountPercentage = Math.round(product.discount * 100);

        let newProduct = document.createElement('div');
        newProduct.classList.add('prod');
        newProduct.innerHTML = `
            <img src="${product.image}">
            <div class="decsription">
                <h2>${product.name}</h2>
                <div class="stars">
                    <span>★★★★★</span>
                    <span class="numrevs">(${product.numrevs})</span>
                </div>
                <div class="price">
                    <span class="old">$${oldPrice}</span>
                    <span class="new">$${product.price.toFixed(2)}</span>
                    <span class="discount">${discountPercentage}% OFF</span>
                </div>
                <div class="addcart">
                    <button id="add-btn" onclick="addCart(this,${product.id})">Add To Cart</button>
                </div>
            </div>
        `;
        listProductHTML.appendChild(newProduct);
    });
}


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
    addDataToHTML();
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


