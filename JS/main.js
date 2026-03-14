
import { Cart } from './Cart.js';
import { addDataToHTML, checkAdding, loadProductsData } from './helpers.js';

const cartList = document.querySelector(".cart-list");
const darkBackground = document.querySelector(".dark-background");
const itemsContainer = document.querySelector('.cart-list .items');

export const listCart = new Cart();
const products = await loadProductsData('index');

await addDataToHTML('index');

function addProducts() {
    const addBtns = document.querySelectorAll("#add-btn");
    addBtns.forEach(addBtn => {

        addBtn.addEventListener("click", (e) => {
            const btnElement = e.target;
            const id = btnElement.parentElement.id;

            products.forEach(product => {
                if (product.id == id) {
                    listCart.addProduct(product, id);
                    listCart.saveCart();
                }
            });
            checkAdding(btnElement);
            listCart.renderCartHTML(itemsContainer, document.querySelector(".cart-length"));
        });
    })
    listCart.renderCartHTML(itemsContainer, document.querySelector(".cart-length"));
}

itemsContainer.addEventListener('click', (e) => {
    const id = e.target.closest('.item')?.id;
    if (e.target.parentElement.classList.contains('quantity')) {
        listCart.changeCart(id, e.target.dataset.quantityChange);
    } else if (e.target.classList.contains('cart-delete-btn')) {
        listCart.removeProduct(id);
    }
    listCart.saveCart();
    listCart.renderCartHTML(itemsContainer, document.querySelector(".cart-length"));
});

addProducts();
window.addEventListener('storage', addProducts);


const searchInput = document.querySelector(".search");
searchInput?.addEventListener("keyup", search);

function search() {
    const input = document.querySelector('.search').value.toUpperCase();
    const resultsBox = document.querySelector('.prods-search');
    const products = document.querySelectorAll('.prodsresult');
    let hasResult = false;
    if (input.trim() !== '') {
        products.forEach(product => {
            const title = product.querySelector('a').innerText.toUpperCase();
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


// EventListeners Section

let scrollIcon = document.querySelector(".scroll-up");
window.addEventListener("scroll", () => {
    if (window.scrollY >= 1200)
        scrollIcon.classList.add("show")
    else scrollIcon.classList.remove("show");
})

scrollIcon.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
});


const pagesSection = document.querySelector(".Pages-section");

document.querySelector("#open-menu-bar")?.addEventListener("click", () => {
    document.querySelector(".menu-bar").style.width = "100%";
})

document.querySelector(".close-menu-bar-btn")?.addEventListener("click", () => {
    document.querySelector(".menu-bar").style.width = "0";
    // pagesSection.style.width = "auto";
})

window.addEventListener('resize', (e) => {
    if (window.innerWidth <= 900) pagesSection.classList.add("menu-bar");
    else pagesSection.classList.remove("menu-bar");
});

const cart = document.querySelector('.cart');
const close = document.querySelector('#close-cart-btn');

cart?.addEventListener("click", () => {
    cartList.classList.add("show-cart");
    darkBackground.style.display = "block";
});

close?.addEventListener("click", () => {
    cartList.classList.remove("show-cart");
    darkBackground.style.display = "none";
});


