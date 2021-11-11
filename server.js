//importing required packages
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//normally, the data about shoes stock would be held in database; as a temporary solution, an object declared below
// will hold some information needed to showcase how the communication server-client could look like
var shoesStock = {
    womenCasualShoes: {
        "Black sneakers": {
            name: "Black sneakers",
            imageReference: "womenblacksneakers.jpg",
            price: "£30.00",
            stock: 10,
        },
        "Pink sneakers": {
            name: "Pink sneakers",
            imageReference: "womenpinksneakers.jpg",
            price: "£35.50",
            stock: 15,
        },
        "White sneakers": {
            name: "White sneakers",
            imageReference: "womenwhitesneakers.jpg",
            price: "£40.00",
            stock: 0,
        },
        "Pale pink trainers ": {
            name: "Pale pink trainers",
            imageReference: "womenpalepinktrainers.jpg",
            price: "£28.00",
            stock:1,
        },
        "Beige shoes": {
            name: "Beige shoes",
            imageReference: "womenbeigeshoes.jpg",
            price: "£49.50",
            stock:40,
        },
    }
}

//sending shoes of selected category to the client side
app.get("/getProducts/:shoesCategory", (req, res) =>{
    let shoesCategory = req.params.shoesCategory;
    let shoesRequired = shoesStock[shoesCategory];
    res.json(shoesRequired);
})


//stock of product added to cart will be subtracted by one so that it is "reserved" for the customer
app.get("/addProductToCart/:selectedShoes", (req, res) =>{
    let selectedShoes = req.params.selectedShoes;
    //checking if there are shoes in stock
    if (shoesStock["womenCasualShoes"][selectedShoes].stock > 0) {
        //deleting from stock
        shoesStock["womenCasualShoes"][selectedShoes].stock -= 1;
        // sending info that shoes are available
        res.json({shoesInStock: true});
    } else {
        res.json({shoesInStock: false});
    }
})

//serving static content
app.use(express.static('content'));
app.use('/images', express.static('images'))

app.listen(3000, () => {
    console.log('Listening for request: http://localhost:3000')
});