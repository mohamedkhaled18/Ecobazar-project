import { Storage } from "./helpers.js";

export class Cart {

    constructor() {
        this.totalQuantity = 0;
        this.cartList = this.loadCart();
    }

    loadCart() {
        return Storage.get("cartList") ?? [];
    }

    getTotalQuantity() {
        return this.totalQuantity;
    }

    addProduct(addedProduct) {
        const storedProduct = this.cartList.find(product => addedProduct.id === product.id);
        if (addedProduct === undefined)
            return;
        console.log(storedProduct);

        this.totalQuantity++;
    }

    saveCart() {
        Storage.set('cartList', cartList);
    }

    updateCartHTML() {

    }

    renderCartHTML(container) {
        if (container) {
            container.innerHTML = '';
            if (this.cartList.length === 0) {
                container.innerHTML = "<p class='empty-ptr'>Cart is empty</p>";
                return;
            }
            this.cartList.forEach(product => {
                container.innerHTML += `
                <div class="item">
                <div class="item-image">
                <img src="${product.image}" alt="product-image" />
                </div>
                <div class="content">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)} / 1 product</div>
                </div>
                <div class="quantity">
                <span onclick="changeQuantity(${product.id}, '-')">-</span>
                <span class="value">${0}</span>
                <span onclick="changeQuantity(${product.id}, '+')">+</span>
                </div>  
                <button style="cursor:pointer; background: transparent; border: 0;" id="delete">❌</button>
                </div>`
            });
        }
    }
}