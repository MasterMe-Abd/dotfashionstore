let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to display cart items
function showCart() {
    const cartList = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - $${item.price} 
                        <button onclick="removeFromCart(${index})">Remove</button>`;
        cartList.appendChild(li);
    });

    totalPriceElement.textContent = `Total: $${total}`;
}

// Function to add items to cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

// Function to remove an item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}
