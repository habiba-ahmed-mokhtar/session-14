const products = [
  {
    id: 1,
    name: "Product A",
    type: "Type 1",
    price: 100,
    details: "Details of Product A",
  },
  {
    id: 2,
    name: "Product B",
    type: "Type 2",
    price: 200,
    details: "Details of Product B",
  },
  // Add more products as needed
];

let cart = [];

function displayProducts(products) {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = ""; // Clear previous content
  products.forEach((product) => {
    productContainer.innerHTML += `
              <div class="product">
                  <h3>${product.name}</h3>
                  <p>${product.type}</p>
                  <p>$${product.price}</p>
                  <button onclick="viewDetails(${product.id})">View Details</button>
                  <button onclick="addToCart(${product.id})">Add to Cart</button>
              </div>
          `;
  });
}

function viewDetails(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    alert(`Details of ${product.name}: ${product.details}`);
  }
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingProduct = cart.find((p) => p.id === productId);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
}

function updateCart(productId, action) {
  const product = cart.find((p) => p.id === productId);
  if (product) {
    if (action === "increase") {
      product.quantity++;
    } else if (action === "decrease") {
      product.quantity--;
      if (product.quantity <= 0) {
        cart = cart.filter((p) => p.id !== productId);
      }
    } else if (action === "delete") {
      cart = cart.filter((p) => p.id !== productId);
    }
    saveCart();
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function searchProductByName(name) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(name.toLowerCase())
  );
  displayProducts(filteredProducts);
}

function filterByProductType(type) {
  const filteredProducts = products.filter((product) => product.type === type);
  displayProducts(filteredProducts);
}

function sortProductsByPrice(order = "asc") {
  const sortedProducts = products.sort((a, b) => {
    return order === "asc" ? a.price - b.price : b.price - a.price;
  });
  displayProducts(sortedProducts);
}

window.onload = function () {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  displayProducts(products);
};
