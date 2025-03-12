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

    // Initialize PayPal Button
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: total }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert(`Payment successful! Thank you, ${details.payer.name.given_name}`);
                localStorage.removeItem("cart"); // Clear cart after payment
                cart = [];
                showCart();
            });
        }
    }).render("#paypal-button-container");

    // Initialize Google Pay
    const googlePayClient = new google.payments.api.PaymentsClient({ environment: "TEST" });

    const paymentDataRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
            type: "CARD",
            parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["VISA", "MASTERCARD"]
            },
            tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                    gateway: "example",
                    gatewayMerchantId: "exampleMerchantId"
                }
            }
        }],
        merchantInfo: {
            merchantId: "12345678901234567890",  // Replace with your actual Google Pay merchant ID
            merchantName: "Fashion Store"
        },
        transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPrice: total.toString(),
            currencyCode: "USD"
        }
    };

    const googlePayButton = document.getElementById("google-pay-button");

    googlePayClient.isReadyToPay({ apiVersion: 2, apiVersionMinor: 0 })
        .then(response => {
            if (response.result) {
                const button = googlePayClient.createButton({
                    onClick: () => {
                        googlePayClient.loadPaymentData(paymentDataRequest)
                            .then(paymentData => {
                                alert("Payment successful via Google Pay!");
                                localStorage.removeItem("cart");
                                cart = [];
                                showCart();
                            })
                            .catch(error => console.error(error));
                    }
                });
                googlePayButton.appendChild(button);
            }
        })
        .catch(error => console.error("Google Pay error:", error));
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
