//declaring array that will hold shoes added to cart;
var shoesInCart = [];

// Open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}


// displaying types of shoes
function showShoeTypes(category) {
    var category = document.getElementById(category);
    if (category.className.indexOf("w3-show") == -1) {
        category.className += " w3-show";
    } else {
        category.className = category.className.replace(" w3-show", "");
    }
}

/*fetching selected types of shoes and displaying them on the page -
NOTE: as there is no database, an object has been created on the server side to holds some information needed to populate
Women-Casual category - therefore, the fetchShoes() function is currently only applied to Women-Casual category*/
function fetchShoes(shoesCategory) {
    console.log("Gonna try fetching now")
    fetch("/getProducts/" + shoesCategory)
        .then(res => res.json())
        .then(shoes => {
            document.getElementById("productGrid").innerHTML = "";
            console.log(shoes);
            var numberOfShoes = Object.keys(shoes).length;
            console.log(numberOfShoes);
            for (const shoesPair in shoes) {
                console.log(shoesPair);
                console.log(shoes[shoesPair].imageReference);
                $("#productGrid").append(
                    `<div style="margin: 10px" class="grid-item w3-display-container">
                     <img src="../images/${shoes[shoesPair].imageReference}" style="width:80%">
                     <p>${shoes[shoesPair].name}<br><b>${shoes[shoesPair].price}</b></p>
                     <div class="w3-display-topleft w3-display-hover">
                     <button id="${shoesPair}" class="w3-button w3-black" onclick="addToCart(this.id)">Buy now 
                     <i class="fa fa-shopping-cart"></i></button></div>`
            );
            }
            }
        )
}

//adding selected shoes to cart
function addToCart(shoePair) {
    console.log("button ADD TO CART CLICKED")
    fetch("/addProductToCart/" + shoePair)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.shoesInStock){
                shoesInCart.push(shoePair);
                document.getElementById('addToCartInfo').style.display='block';
            } else {
                document.getElementById('notInStockInfo').style.display='block';
            }
        })
}

//showing what is in the cart
function showShoppingCart() {
    document.getElementById("cartContentParagraph").innerHTML = `Items in your cart: ${shoesInCart}`;
        document.getElementById('cartContentInfo').style.display='block';
}



