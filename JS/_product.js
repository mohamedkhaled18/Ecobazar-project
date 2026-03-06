class Product {
    constructor({id, name, price, image, numrevs, discount, linkPage}) {
        this.totalQuantity = 0;
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.numrevs = numrevs;
        this.discount = discount;
        this.linkPage = linkPage;
    }

    getTotalQuantity() {
        return this.totalQuantity;
    }

    getTotalPrice() {
        return this.totalQuantity * this.price;
    }
}