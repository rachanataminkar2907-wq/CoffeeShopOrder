const order = {
  drink: "espresso",
  size: "medium",
  milk: "regular",
  extras: [],
};

const prices = {
  espresso: 100,
  latte: 280,
  cappuccino: 260,
  matcha: 200,
  chai: 100,
  small: 0,
  medium: 50,
  large: 100,
  extrashot: 75,
  vanilla: 60,
  caramel: 60,
  whipped: 50,
};

const drinkColours = {
  espresso: "#1e0c04",
  latte: "#7b4f2e",
  cappuccino: "#b07442",
  matcha: "#4a7c3f",
  chai: "#b5812a",
};

const sizeHeight = {
  small: "40%",
  medium: "65%",
  large: "90%",
};

const extraLabels = {
  extrashot: "Extra Shot",
  vanilla: "Vanilla Syrup",
  caramel: "Caramel Syrup",
  whipped: "Whipped Cream",
};

const cup = document.getElementById("cup");
const summary = document.getElementById("summary");

function updateCup() {
  cup.style.setProperty("--fill-colour", drinkColours[order.drink]);
  cup.style.setProperty("--fill-height", sizeHeight[order.size]);

  ["extrashot", "vanilla", "caramel", "whipped"].forEach((extra) => {
    document
      .getElementById("badge-" + extra)
      .classList.toggle("visible", order.extras.includes(extra));
  });
}

function updateSummary() {
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  const milkLabel =
    order.milk === "none" ? "No Milk" : cap(order.milk) + " Milk";

  let total = prices[order.drink] + prices[order.size];
  order.extras.forEach((e) => {
    total += prices[e];
  });

  const extraRows = order.extras
    .map(
      (e) => `
      <div class="summary-row">
        <span>${extraLabels[e]}</span>
        <span>+₹${prices[e].toFixed(2)}</span>
      </div>`,
    )
    .join("");

  summary.innerHTML = `
    <h3>Your Order</h3>
    <div class="summary-row">
      <span>${cap(order.drink)}</span>
      <span>₹${prices[order.drink].toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>${cap(order.size)}</span>
      <span>${prices[order.size] > 0 ? "₹" + prices[order.size].toFixed(2) : "—"}</span>
    </div>
    <div class="summary-row">
      <span>${milkLabel}</span>
      <span>—</span>
    </div>
    ${extraRows}
    <hr class="summary-divider" />
    <div class="summary-total">
      <span>Total</span>
      <span>₹${total.toFixed(2)}</span>
    </div>
  `;
}

document.querySelectorAll('input[name="drink"]').forEach((input) => {
  input.addEventListener("change", function () {
    order.drink = this.value;
    console.log(order);
    updateCup();
    updateSummary();
  });
});

document.querySelectorAll('input[name="size"]').forEach((input) => {
  input.addEventListener("change", function () {
    order.size = this.value;
    console.log(order);
    updateCup();
    updateSummary();
  });
});

document.querySelectorAll('input[name="milk"]').forEach((input) => {
  input.addEventListener("change", function () {
    order.milk = this.value;
    updateCup();
    updateSummary();
  });
});

document.querySelectorAll('input[name="extras"]').forEach((input) => {
  input.addEventListener("change", function () {
    if (this.checked) {
      order.extras.push(this.value);
    } else {
      const i = order.extras.indexOf(this.value);
      order.extras.splice(i, 1);
    }
    console.log(order);
    updateCup();
    updateSummary();
  });
});

// document.querySelectorAll('input[name="drink"]').forEach((i) => i.checked = i.value === order.drink);
// document.querySelectorAll('input[name="size"]').forEach((i) => i.checked = i.value === order.size);
// document.querySelectorAll('input[name="milk"]').forEach((i) => i.checked = i.value === order.milk);
// document.querySelectorAll('input[name="extras"]').forEach((i) => i.checked = false);

updateCup();
updateSummary();