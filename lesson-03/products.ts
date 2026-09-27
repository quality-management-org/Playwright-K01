class Product {
    public name: string;
    private price: number;
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
    getDisplayPrice(): string {
        return `${this.price} USD`;
    }
}
const product = new Product("Laptop", 29.99);              
console.log(product.getDisplayPrice()); 