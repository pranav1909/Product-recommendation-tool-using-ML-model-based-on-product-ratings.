// products start
const product = [
    {
        id: 0,
        image: 'Tea-Coffee-Mug-713.jpg',
        title: 'Coffee Mug Red',
        category: 'Cups',
        price: 250,
    },
    {
        id: 1,
        image: 'Extra_Bass_Stereo_Wired_Headphone_01.jpg',
        title: 'Headphone',
        category: 'Audio',
        price: 550,
    },
    {
        id: 2,
        image: 'H2O-Water-Bottle-01.png',
        title: 'Plastic Bottle',
        category: 'Bottles',
        price: 200,
    },
    {
        id: 3,
        image: 'Extra_Bass_Stereo_Wired_Headphone_01.jpg',
        title: 'Headphone',
        category: 'Audio',
        price: 550,
    },
    {
        id: 4,
        image: 'Steel-Hot-and-Cold-Flask-049.jpg',
        title: 'Flask Red',
        category: 'Bottles',
        price: 350,
    },
    {
        id: 5,
        image: 'Extra_Bass_Stereo_Wired_Headphone_01.jpg',
        title: 'Bluetooth Speaker JBL',
        category: 'Audio',
        price: 1000,
    },
];

//display products
let filteredProducts = [...product];

function displayProducts() {
    console.log(product);
    console.log(filteredProducts);
    if (filteredProducts.length < 1) {
        productsContainer.innerHTML = `<h4>Sorry, no products matched your search</h4>`;
        return;
    }
    let i = 0;
    document.getElementById('items').innerHTML = filteredProducts.map((item) => {
        var { image, title, price } = item;
        return (
            `<div class='product'>
              <div class="image_url"><img src=${image}></div>
              <div class="image_caption">${title}</div>
              <div class="price">Rs. ${price}.00</div>
              <button class="cart_button" onclick= 'addToCart(${i++})'>Add to Cart</button>
            </div>`
        )
    }).join('')
}
displayProducts();

//display recommended products
let recommended = [];

function displayRecoProducts(title_arg) {
    console.log(product);
    console.log(recommended);
    let recommendedProducts = [...recommended];
    console.log(recommendedProducts);
    console.log(recommendedProducts.length);
    $('recommended_items').empty();
    if (recommendedProducts.length < 1) {
        productsContainer.innerHTML = `<h4>Sorry, no products matched your search</h4>`;
        return;
    }
    let i = 0;
    document.getElementById('recommended_items').innerHTML = recommendedProducts.map((item) => {
        var { image, title, price } = item;
        return (
            `<div class='recommended_product'>
              <div class="mostly_buyed_text">Mostly buyed along with ${title_arg}</div>
              <div class="image_url"><img src=${image}></div>
              <div class="image_caption">${title}</div>
              <div class="price">Rs. ${price}.00</div>
              <button class="cart_button" onclick= 'addToCart(${i++})'>Add to Cart</button>
            </div>`
        )
    }).join('')
}

function displayRecommendedProducts(title) {
    console.log(title);
    console.log(JSON.stringify({ 'title': title }));
    jsonTitle = JSON.stringify({ 'title': title })

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5000/recommend");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText) {
                console.log(this.responseText);
                var this_result = JSON.parse(this.responseText);
                console.log(this_result.result);
                

                recommended = this_result.result;
                displayRecoProducts(title);
            }
        }
    };
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(jsonTitle);
};

// filter
const categoryList = document.querySelector(".nav>ul");
const productsContainer = document.querySelector("#items");

const displayCategories = () => {
    const buttons = [
        "All",
        ...new Set(product.map((product) => product.category)),
    ];
    categoryList.innerHTML = buttons.map((category) => {
        return `<li data-id="${category}">${category}</li>`;
    }).join("");
};
displayCategories();

categoryList.addEventListener("click", (e) => {
    let btnTarget = e.target.dataset.id;

    if (btnTarget === "All") {
        filteredProducts = [...product];
        displayProducts();
    } else {
        filteredProducts = product.filter((item) => item.category === btnTarget);
        displayProducts();
    }
});

// add to cart feature
var cart = [];
function addToCart(a) {
    var title = filteredProducts[a]["title"];
    // func(title);
    displayRecommendedProducts(title);
    cart.push({ ...filteredProducts[a] });
    displayCart();
}

function delElement(a) {
    cart.splice(a, 1);
    displayCart();
}

function displayCart(a) {
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length == 0) {
        document.getElementById("cartItem").innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "Rs " + 0 + ".00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((items) => {
            var { image, title, price } = items;
            total = total + price;
            document.getElementById("total").innerHTML = "Rs " + total + ".00";
            return (
                `<div class='cart_item'>
                <div class='row_img'>
                  <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:15px;'>${title}</p>
                <h2 style='font-size:12px;'>Rs ${price}.00</h2>` +
                "<i class='fa-solid fa-trash' onclick='delElement(" + (j++) + ")'></i></div>"
            )
        }).join('')
    }
}