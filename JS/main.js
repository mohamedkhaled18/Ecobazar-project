
import { Cart } from './Cart.js';
import { addDataToHTML, checkAdding, loadProductsData } from './helpers.js';

const itemsContainer = document.querySelector('.cart-list .items');
const cartList = document.querySelector(".cart-list");
const darkBackground = document.querySelector(".dark-background");
const listCart = new Cart();

function setupSearchProducts(products) {
    const searchContainer = document.querySelector('.prods-search');
    searchContainer.innerHTML = '';
    products.forEach(product => {
        searchContainer.innerHTML += `
            <div class="prodsresult">
                <a href="${product.linkPage}" class="item">
                    <img src="${product.image}">
                    <div class="prod-details">${product.name}</div>
                </a>
            </div>
        `;
    })
}


document.querySelector('input.search')?.addEventListener("keyup", () => {

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
});


export async function init(page) {
    const products = await loadProductsData(page);
    await addDataToHTML(page);
    setupSearchProducts(products);
    
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

    
    // Cart Section
    itemsContainer.addEventListener('click', (e) => {
        const id = e.target.closest('.item')?.id;
        if (e.target.parentElement.classList.contains('quantity')) {
            listCart.changeCart(id, e.target.dataset.quantityChange);
        }
        else if (e.target.classList.contains('cart-delete-btn')) {
            listCart.removeProduct(id);
        }
        listCart.saveCart();
        listCart.renderCartHTML(itemsContainer, document.querySelector(".cart-length"));
    });
    
    
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
}

