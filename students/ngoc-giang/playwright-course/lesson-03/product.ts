class Product{
    public productName: string;
    private price: number;
    private currency: string;
    constructor (productName: string, price:number, currency: string){
        this.productName= productName;
        this.price= price;
        this.currency= currency;
    }
    get displaytPrice(): string{
        return `${this.price.toFixed(2)} ${this.currency}`
    }
}
    const product= new Product("ao Tshirt", 22.986, "USD");
    console.log(product.productName, product.displaytPrice);
   
