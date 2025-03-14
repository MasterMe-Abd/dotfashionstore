<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel | Manage Store</title>
    <link rel="stylesheet" href="style.css">
    <script defer src="admin.js"></script>
</head>
<body>
    <header>
        <h1>Admin Panel</h1>
        <nav>
            <a href="index.html">Go to Store</a>
            <button onclick="adminLogout()">Logout</button>
        </nav>
    </header>

    <section class="admin-section">
        <h2>Manage Products</h2>
        <form id="addProductForm">
            <input type="text" id="productName" placeholder="Product Name" required>
            <input type="number" id="productPrice" placeholder="Price" required>
            <input type="text" id="productImage" placeholder="Image URL" required>
            <button type="submit">Add Product</button>
        </form>

        <h2>Product List</h2>
        <ul id="productList"></ul>
    </section>
</body>
</html>
