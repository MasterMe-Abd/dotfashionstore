// Redirect to login page if admin is not logged in
if (localStorage.getItem("isAdminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}

// Load products from local storage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Function to display products in admin panel
function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${product.name}</strong> - $${product.price} <br>
            <img src="${product.image}" width="100"> <br>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productList.appendChild(li);
    });
}

// Function to add a new product
document.getElementById("addProductForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const image = document.getElementById("productImage").value;
    const description = document.getElementById("productDescription").value;

    products.push({ name, price, image, description });
    localStorage.setItem("products", JSON.stringify(products));

    displayProducts();
    alert("Product added successfully!");
});

// Function to delete a product
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

// Load orders from local storage
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Function to display orders
function displayOrders() {
    const orderList = document.getElementById("orderList");
    orderList.innerHTML = "";

    orders.forEach((order, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Order #${index + 1}</strong> <br>
            Items: ${order.items.map(item => item.name).join(", ")} <br>
            Total: $${order.total} <br>
            <button onclick="deleteOrder(${index})">Delete Order</button>
        `;
        orderList.appendChild(li);
    });
}

// Function to delete an order
function deleteOrder(index) {
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    displayOrders();
}

// Function for Admin Logout
function adminLogout() {
    localStorage.removeItem("isAdminLoggedIn"); // Remove login status
    window.location.href = "admin-login.html"; // Redirect to login page
}

// Display products and orders on page load
displayProducts();
displayOrders();
