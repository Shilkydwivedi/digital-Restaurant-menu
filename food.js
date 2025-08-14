// --- Menu data (names + prices) ---
const MENU = {
  breakfast: {
    veg: [
      { name: "Dosa", price: 60 },
      { name: "Idli (3 pcs)", price: 40 },
      { name: "Pav Bhaji", price: 80 },
      { name: "Upma", price: 50 },
      { name: "Dahi Vada (1 plate)", price: 54 }
    ],
    nonveg: [
      { name: "Egg Omelette", price: 55 },
      { name: "Egg Bhurji", price: 70 },
      { name: "Chicken Sandwich", price: 110 }
    ]
  },
  lunch: {
    veg: [
      { name: "Vegetable Pulao", price: 120 },
      { name: "Paneer Curry", price: 150 },
      { name: "Dal Tadka", price: 90 },
      { name: "Palak Paratha", price: 60 },
      { name: "Sambar Rice", price: 100 }
    ],
    nonveg: [
      { name: "Chicken Curry", price: 180 },
      { name: "Mutton Biryani", price: 350 },
      { name: "Fish Fry", price: 190 }
    ]
  },
  dinner: {
    veg: [
      { name: "Paneer Butter Masala + Butter Naan", price: 280 },
      { name: "Dal Makhani + Steamed Rice", price: 220 },
      { name: "Vegetable Biryani", price: 200 },
      { name: "Chole Bhature", price: 160 }
    ],
    nonveg: [
      { name: "Chicken Tikka Masala + Naan", price: 320 },
      { name: "Mutton Biryani", price: 450 },
      { name: "Chicken Curry + Rice", price: 260 },
      { name: "Tandoori Chicken (half)", price: 280 }
    ]
  },
  fastfood: {
    veg: [
      { name: "Veg Burger", price: 80 },
      { name: "Paneer Roll", price: 120 },
      { name: "French Fries", price: 60 },
      { name: "Dhokla (4 pcs)", price: 54 }
    ],
    nonveg: [
      { name: "Chicken Burger", price: 100 },
      { name: "Chicken Nuggets", price: 120 },
      { name: "Egg Roll", price: 80 },
      { name: "Pepperoni Pizza (slice)", price: 220 }
    ]
  }
};

// --- Render a list into a specific category box ---
function renderList(sectionId, type) {
  const box = document.getElementById(sectionId);
  const listEl = box.querySelector(".list");

  // Highlight the active button for this box only
  box.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
  const activeBtn = Array.from(box.querySelectorAll(".type-btn"))
    .find(b => b.dataset.type === type);
  if (activeBtn) activeBtn.classList.add("active");

  // Build rows
  const items = MENU[sectionId][type];
  listEl.innerHTML = items.map((it, i) => `
    <div class="food-row">
      <div class="food-info">
        <span class="food-name">${it.name}</span>
        <span class="food-price">₹${it.price}</span>
      </div>
      <button class="add-btn" data-name="${it.name}" data-price="${it.price}">Add to Cart</button>
    </div>
  `).join("");
}

// --- Event delegation for buttons inside the page ---
document.addEventListener("click", (e) => {
  // Veg / Non-Veg buttons inside each category box
  if (e.target.classList.contains("type-btn")) {
    const sectionId = e.target.closest(".menu-box").id;
    const type = e.target.dataset.type; // "veg" or "nonveg"
    renderList(sectionId, type);
  }

  // Add-to-cart buttons
  if (e.target.classList.contains("add-btn")) {
    const { name, price } = e.target.dataset;
    addToCart(name, Number(price));
  }

  // Remove buttons in cart
  if (e.target.classList.contains("remove-btn")) {
    const index = Number(e.target.dataset.index);
    removeFromCart(index);
  }
});

// --- Cart state & helpers ---
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

function renderCart() {
  const ul = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  ul.innerHTML = cart.map((item, idx) => `
    <li class="cart-item">
      <span>${item.name}</span>
      <span>₹${item.price}</span>
      <button class="remove-btn" title="Remove" data-index="${idx}">×</button>
    </li>
  `).join("");

  totalEl.textContent = cartTotal();
}

function checkout() {
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }
  const summary = cart.map(i => `${i.name} (₹${i.price})`).join(", ");
  const total = cartTotal();
  alert(`Order placed!\n\nItems: ${summary}\nTotal: ₹${total}`);
  cart = [];
  renderCart();
}

// (Optional) Default: show Breakfast Veg list on load
window.addEventListener("DOMContentLoaded", () => {
  renderList("breakfast", "veg");
});
