const products = require("./products");

function findProduct(productName) {
    const product = products.find(
        product => product.name.toLowerCase() === productName.toLowerCase()
    );

    if (product) {
        console.log("Product found:");
        console.log(product);
    } else {
        console.log(`Sorry, ${productName} was not found.`);
    }
}

findProduct("Laptop");
findProduct("Phone");
findProduct("Backpack");
findProduct("Tablet");