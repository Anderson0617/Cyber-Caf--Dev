const initCartInteractions = () => {
  const cart = [];
  const buttons = document.querySelectorAll('.add-to-cart');
  const cartCount = document.querySelector('.cart-count');
  const cartItems = document.querySelector('.cart-items');
  const cartEmpty = document.querySelector('.cart-empty');
  const cartTotalValue = document.querySelector('.cart-total-value');
  const cartToggle = document.querySelector('.cart-toggle');
  const cartSection = document.getElementById('cart');
  const clearButton = document.querySelector('.cart-clear');

  if (!cartCount || !cartItems || !cartEmpty || !cartTotalValue) {
    return;
  }

  const formatCurrency = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const updateCartUI = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    cartItems.innerHTML = '';

    if (cart.length === 0) {
      cartEmpty.style.display = 'block';
    } else {
      cartEmpty.style.display = 'none';
      cart.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'cart-item';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'cart-item-name';
        nameSpan.textContent = `${item.name} x${item.quantity}`;

        const priceSpan = document.createElement('span');
        priceSpan.className = 'cart-item-price';
        priceSpan.textContent = formatCurrency(item.price * item.quantity);

        li.appendChild(nameSpan);
        li.appendChild(priceSpan);
        cartItems.appendChild(li);
      });
    }

    const totalValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalValue.textContent = formatCurrency(totalValue);
  };

  const addToCart = (name, price) => {
    const normalizedName = name.trim().toLowerCase();
    const existing = cart.find((item) => item.id === normalizedName);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: normalizedName,
        name,
        price,
        quantity: 1,
      });
    }

    updateCartUI();
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.name || '';
      const price = Number(button.dataset.price || 0);
      addToCart(name, price);
    });
  });

  if (cartToggle && cartSection) {
    cartToggle.addEventListener('click', () => {
      cartSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      cart.length = 0;
      updateCartUI();
    });
  }

  updateCartUI();
};

const init = () => {
  initCartInteractions();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
/*pra baixo*/
const header = document.querySelector(".site-header");
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.remove("hidden", "is-hidden", "header--up", "--hidden", "hide");
    header.style.transform = "none";
    header.style.opacity = "1";
    header.style.display = "flex";
  });
}
