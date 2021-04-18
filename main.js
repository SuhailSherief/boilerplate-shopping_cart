let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Grey Tshirt',
        tag: 'greytshirt',
        price: 15,
        inCart: 0
    },
    {
        name: 'Grey Hoddie',
        tag: 'greyhoddie',
        price: 20,
        inCart: 0
    },
    {
        name: 'Black Tshirt',
        tag: 'blacktshirt',
        price: 10,
        inCart: 0
    },
    {
        name: 'Black Hoddie',
        tag: 'blackhoddie',
        price: 25,
        inCart: 0
    },
    {
        name: 'Green Tshirt',
        tag: 'blackhoddie',
        price: 35,
        inCart: 0
    },
    {
        name: 'Mag Tshirt',
        tag: 'magtshirt',
        price: 5,
        inCart: 0
    },
    {
        name: 'Black Designer Tshirt',
        tag: 'blackdesigtshirt',
        price: 30,
        inCart: 0
    },
    {
        name: 'White Designer Tshirt',
        tag: 'whitedesigtshirt',
        price: 50,
        inCart: 0
    }

]
for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click',() => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers); 
    if( productNumbers ) {
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems={
                ...cartItems,
                [product.tag] : product
            }
        }
        cartItems[product.tag].inCart += 1;
    }   else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    console.log("mc is ", cartCost)
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost", product.price);
    }
}
function displayCart(){
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');
    if( cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}.00</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            </div>
            `;
        });
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                <h4>
                <h4 class="basketTotal">
                    $${cartCost}.00
                </h4>
            </div>
        `;
    }
}
onLoadCartNumbers();
displayCart();