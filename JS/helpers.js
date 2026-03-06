export function togglePass(element) {
    let input = element.previousElementSibling, type;
    if (input.type === "text")
        type = "password";
    else type = "text";
    input.setAttribute("type", type);
}

export function checkpassword(element) {
    const lengthAlert = document.querySelector(".invalid-length");
    if (element.type === "password" && element.value.length < 12)
        lengthAlert.classList.add("show");
    else lengthAlert.classList.remove("show");
}

export function validateEmail() {
    const emailAlert = document.querySelector(".invalid-email");
    let email = emailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = emailRegex.test(email);
    if (valid)
        emailAlert.classList.remove("show");
    else emailAlert.classList.add("show")
}

export function checkBlank() {
    const conditionsCheck = document.getElementById("confirm");
    const blankAlert = document.querySelector(".blank-error");
    let isBlank = false;

    inputs.forEach(input => {
        if (input.value.trim() === "")
            isBlank = true;
    });

    if (isBlank)
        blankAlert.classList.add("show");
    else
        blankAlert.classList.remove("show");

    if (!conditionsCheck.checked)
        conditionsAlert.classList.add("show");
    else
        conditionsAlert.classList.remove("show");
}

export function headToPage() {
    const role = document.getElementById("role").value;
    window.location.href = role + ".html";
}

export async function loadProductsData() {
    try {
        const response = await fetch('../products.json');
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
}

export async function addDataToHTML(currentPage = 'home') {
    const products = await loadProductsData();
    let listProductHTML = document.querySelector('.prodfield');
    let Products = currentPage === "home" ? Object.values(products).slice(0, 8) : products;
    listProductHTML.innerHTML = '';

    Products.forEach(product => {
        const oldPrice = (product.price / (1 - product.discount)).toFixed(2);
        const discountPercentage = Math.round(product.discount * 100);
        let newProduct = document.createElement('div');


        newProduct.classList.add('prod');
        newProduct.innerHTML = `
            <img src="${currentPage === "index.html" ? product.image.replace(".", "")
                : product.image
            }">
        <div class="decsription">
            <a href="${currentPage === "index.html" ? "./Pages/" + product.linkPage
                : product.linkPage
            }">${product.name}</a>
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

export function playAddSound(addBtn) {
    const addedSound = document.getElementById("added-sound");
    addedSound.play();
    btn.innerHTML = `<i id="check" class="fa-solid fa-circle-check"></i>`;
    setTimeout(() => btn.innerHTML = `Add To Cart`, 1000);
}

export const Storage = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        const data = localStorage.getItem(key);
        return JSON.parse(data);
    }
}