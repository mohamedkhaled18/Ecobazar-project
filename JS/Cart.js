import { Storage } from "./helpers.js";

export class Cart {

    constructor() {
        this.cartList = this.loadCart();
        this.totalQuantity = this.cartList ?? 0;
    }

    loadCart() {
        this.cartList = [];
        if (!Storage.get('cartList')) {
            Storage.set('cartList', this.cartList);
            return this.cartList;
        }
        else return this.cartList = Storage.get('cartList');
    }

    getTotalQuantity() {
        return this.cartList.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
    }

    getCartProducts() {
        return this.cartList;
    }

    changeCart(id, changeType) {
        this.cartList.forEach(product => {
            if (product.id == id) {
                product.quantity = Math.max(1, product.quantity + (changeType == '+' ? 1 : -1));
            }
        });
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
    }

    removeProduct(id) {
        this.cartList.forEach(product => {
            if (product.id == id) {
                this.cartList.splice(this.cartList.indexOf(product), 1);
            }
        });
    }

    saveCart() {
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
                container.innerHTML += `
                <div class="item" id="${product.id}">
                    <div class="item-image">
                        <img src="${product.image}" alt="product-image" />
                    </div>
                    <div class="content">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">$${product.price.toFixed(2)} / 1 product</div>
                        <div class="product-total-price">$${(product.price * product.quantity ?? 1).toFixed(2)}</div>
                    </div>
                    <div class="quantity">
                        <span data-quantity-change='-'>-</span>
                        <span class="value">${product.quantity ?? 0}</span>
                        <span data-quantity-change='+'>+</span>
                    </div>  
                    <button style="cursor:pointer; background: transparent; border: 0;" class="cart-delete-btn">❌</button>
                </div>`
            });
        }
    }
}