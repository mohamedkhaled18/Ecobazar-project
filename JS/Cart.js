import { Storage } from "./helpers.js";

export class Cart {

    constructor() {
        this.cartList = this.loadCart();
    }

    loadCart() {
        return Storage.get("cartList") ?? [];
    }

    getTotalQuantity() {
        return this.cartList.length;
    }

    addProduct(product, id) {
        for (let i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].id == id) {
                this.cartList[i]["quantity"]++;
                return;
            }
        }
        product['quantity'] = 1;
        this.cartList.push(product);
        this.totalQuantity++;
    }

    saveCart(product) {
        Storage.set('cartList', this.cartList);
    }

    renderCartHTML(container, cartCounter, currentPage = 'home') {
        if (container) {
            cartCounter.innerText = this.getTotalQuantity();
            container.innerHTML = '';
            if (this.cartList.length === 0) {
                container.innerHTML = "<p class='empty-ptr'>Cart is empty</p>";
                return;
            }

            this.cartList.forEach(product => {
                const imagePath = currentPage === 'home' ? product.image.replace('.', '') : product.image;
                container.innerHTML += `
                <div class="item">
                    <div class="item-image">
                        <img src="${imagePath}" alt="product-image" />
                    </div>
                    <div class="content">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">$${product.price.toFixed(2)} / 1 product</div>
                        <div class="product-total-price">$${product.price.toFixed(2) * product.quantity ?? 1}</div>
                    </div>
                    <div class="quantity">
                        <span onclick="changeQuantity(${product.id}, '-')">-</span>
                        <span class="value">${product.quantity ?? 0}</span>
                        <span onclick="changeQuantity(${product.id}, '+')">+</span>
                    </div>  
                    <button style="cursor:pointer; background: transparent; border: 0;" id="delete">❌</button>
                </div>`
            });
        }
    }
}