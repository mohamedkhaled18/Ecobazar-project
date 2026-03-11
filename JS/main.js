
import { Cart } from './Cart.js';
import { addDataToHTML, playAddSound, loadProductsData } from './helpers.js';

const currentPage = location.href.match(/\w+.html/).toString().replace(".html", "");

addDataToHTML(currentPage);


// window.addEventListener('load', insertData);
// window.addEventListener('storage', insertData);

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


// Search
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



// Cart Section
const listCart = new Cart();

const cartList = document.querySelector(".cart-list");
// const close = document.querySelector(".cart-list .top-section .close");
const darkBackground = document.querySelector(".dark-background");


const products = await loadProductsData();
const itemsContainer = document.querySelector('.cart-list .items');

document.querySelectorAll("#add-btn").forEach(addBtn => {
    addBtn.addEventListener("click", (e) => {

        const btnElement = e.target;
        const id = btnElement.parentElement.id

        products.forEach(product => {
            if (product.id == id) {
                listCart.addProduct(product, id);
                listCart.saveCart(product);
            }
        })
        // playAddSound(pr)
        listCart.renderCartHTML(itemsContainer, document.querySelector(".cart-length"));
    });
})


listCart.renderCartHTML(itemsContainer, document.querySelector(".cart-length"));



// Window EventListeners Section

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
    document.querySelector(".menu-bar").style.width = "0%";
})

window.addEventListener('resize', (e) => {
    if (window.innerWidth <= 900) {
        pagesSection.classList.add("menu-bar");
    }
    else
        pagesSection.classList.remove("menu-bar");
}
)