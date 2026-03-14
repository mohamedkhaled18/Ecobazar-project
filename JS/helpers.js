export function togglePass(element) {
    let input = element.previousElementSibling, type;
    if (input.type === "text")
        type = "password";
    else type = "text";
    input.setAttribute("type", type);
}


export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

export async function loadProductsData() {
    try {
        const response = await fetch(`http://localhost/Ecobazar-project/products.json`);
        const data = await response.json();
        return data;
    } catch (e) {
        throw new Error("Failed")
    }
}

export async function addDataToHTML(currentPage = "index") {
    const spinner = document.getElementById('loading');
    spinner.style.display = "block";
    try {
        const products = await loadProductsData(currentPage);
        let listProductHTML = document.querySelector('.prodfield');
        if (!listProductHTML)
            return;

        let Products = currentPage === "index" ? Object.values(products).slice(0, 8) : products;
        listProductHTML.innerHTML = '';

        Products.forEach(product => {
            const oldPrice = (product.price / (1 - product.discount)).toFixed(2);
            const discountPercentage = Math.round(product.discount * 100);
            let newProduct = document.createElement('div');

            newProduct.classList.add('prod');
            newProduct.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}">
            <div class="decsription">
                <a href="${(currentPage === "index") ? ("./Pages/" + product.linkPage)
                    : (product.linkPage)
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
                <div class="addcart" id="${product.id}">
                    <button id="add-btn">Add To Cart</button>
                </div>
            </div>
                    `;
            listProductHTML.appendChild(newProduct);
        });
        return products;
    } catch (e) {
        console.error(e);
    } finally {
        spinner.style.display = "none";
    }
}

export function checkAdding(addBtn) {
    const addedSound = document.getElementById("added-sound");
    // addedSound.play();
    addBtn.innerHTML = `Product Added`;
    setTimeout(() => addBtn.innerHTML = `Add To Cart`, 1000);
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

