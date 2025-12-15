/*
   DESIGN PATTERN: Repository Pattern
   Location: products data management
   Purpose: Centralized data storage simulation
   Source: Martin Fowler - Patterns of Enterprise Application Architecture
*/

// Mock product data (simulating database)
const products = [
    {
        id: 1,
        name: 'Risol Mayo',
        description: 'Risol isi sayuran dengan mayonais premium',
        price: 5000,
        category: 'snack',
        seller: 'Warung Risorisol',
        location: 'Gedung Departemen TC - Lantai 1',
        image: 'css/images/risol-mayo.jpg'
    },
    {
        id: 2,
        name: 'Es Teh Manis',
        description: 'Es teh manis segar ukuran sedang',
        price: 3000,
        category: 'minuman',
        seller: 'Warung Risorisol',
        location: 'Gedung Departemen TC - Lantai 1',
        image: 'css/images/es-teh-manis.jpg'
    },
    {
        id: 3,
        name: 'Martabak Telur',
        description: 'Martabak telur isi daging cincang & sayuran',
        price: 12000,
        category: 'makanan-berat',
        seller: 'Martabaker',
        location: 'Gedung Departemen T. Elektro - Dekat Kantin',
        image: 'css/images/martabak-telur.jpg'
    },
    {
        id: 4,
        name: 'Nasi Goreng',
        description: 'Nasi goreng spesial dengan telur mata sapi',
        price: 15000,
        category: 'makanan-berat',
        seller: 'Martabaker',
        location: 'Gedung Departemen T. Elektro - Dekat Kantin',
        image: 'css/images/nasi-goreng.jpg'
    }
];

/*
    DESIGN PATTERN: MVC (Model-View-Controller)
    Location: renderProducts (View), filterProducts (Controller)
    Purpose: Separation of concerns
    Source: Gang of Four Design Patterns
*/

let currentProduct = null;
let currentQuantity = 1;
let currentPayment = 'cod';
let currentDelivery = 'pickup';

// Render products (VIEW)
function renderProducts(productsToRender) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-header">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-category">${getCategoryLabel(product.category)}</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <div class="meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-home"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z" /></svg>
                        <span>${product.seller}</span>
                    </div>
                    <div class="meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" /></svg>
                        <span>${product.location}</span>
                    </div>
                </div>
                <button class="order-btn" onclick="openOrderModal(${product.id})">Pesan</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

function getCategoryLabel(category) {
    const labels = {
        'snack': 'Snack',
        'minuman': 'Minuman',
        'makanan-berat': 'Makanan Berat'
    };
    return labels[category] || category;
}

// Filter products (CONTROLLER)
function filterProducts(category) {
    if (category === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Search products
function searchProducts(query) {
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filtered);
}

// Open order modal
function openOrderModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    currentQuantity = 1;

    const modal = document.getElementById('orderModal');
    const orderSummary = document.getElementById('orderSummary');

    orderSummary.innerHTML = `
        <img src="${currentProduct.image}" alt="${currentProduct.name}">
        <div class="order-summary-info">
            <h3>${currentProduct.name}</h3>
            <p>${currentProduct.seller}</p>
            <p class="order-summary-price">Rp. ${currentProduct.price.toLocaleString('id-ID')}</p>
        </div>
    `;

    document.getElementById('quantity').value = currentQuantity;
    updateTotalPrice();

    modal.classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('orderModal').classList.remove('active');
}

// Update total price
function updateTotalPrice() {
    const total = currentProduct.price * currentQuantity;
    document.getElementById('totalPrice').textContent = `Rp. ${total.toLocaleString('id-ID')}`; // ✅ DIPERBAIKI
}

// Confirm order
function confirmOrder() {
    const notes = document.getElementById('orderNotes').value;

    alert(`Pesanan berhasil!\n\nProduk: ${currentProduct.name}\nJumlah: ${currentQuantity}\nTotal: Rp. ${(currentProduct.price * currentQuantity).toLocaleString('id-ID')}\nPembayaran: ${currentPayment.toUpperCase()}\nPengiriman: ${currentDelivery === 'pickup' ? 'Pickup' : 'Delivery'}\n\nTerima kasih!`);

    closeModal();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Initial render
    renderProducts(products);

    // Category filter
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProducts(this.dataset.category);
        });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function () {
        searchProducts(this.value);
    });

    // Quantity controls
    document.getElementById('decreaseQty').addEventListener('click', function () {
        if (currentQuantity > 1) {
            currentQuantity--;
            document.getElementById('quantity').value = currentQuantity;
            updateTotalPrice();
        }
    });

    document.getElementById('increaseQty').addEventListener('click', function () {
        currentQuantity++;
        document.getElementById('quantity').value = currentQuantity;
        updateTotalPrice();
    });

    // Payment method
    const paymentBtns = document.querySelectorAll('.payment-btn');
    paymentBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            paymentBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentPayment = this.dataset.payment;
        });
    });

    // Delivery method
    const deliveryBtns = document.querySelectorAll('.delivery-btn');
    deliveryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            deliveryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentDelivery = this.dataset.delivery;

            const pickupLocation = document.getElementById('pickupLocation');
            if (currentDelivery === 'pickup') {
                pickupLocation.style.display = 'block';
                document.getElementById('locationText').textContent =
                    `Lokasi Pickup: ${currentProduct.location}`;
            } else {
                pickupLocation.style.display = 'none';
            }
        });
    });

    // Close modal on outside click
    document.getElementById('orderModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeModal();
        }
    });
});