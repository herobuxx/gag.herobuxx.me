import { API_HOST, ENDPOINTS } from "./url.js";
import { formatDate, showLoading, hideLoading } from "./utils.js";

function getWeatherIcon(type) {
  const t = type.toLowerCase();
  if (t.includes("rain")) return "rainy";
  if (t.includes("thunder")) return "bolt";
  if (t.includes("tornado")) return "cyclone";
  if (t.includes("normal")) return "sunny";
  return "cloud";
}

async function loadData() {
  try {
    showLoading();
    const res = await fetch(`${API_HOST}${ENDPOINTS.allData}`);
    const data = await res.json();
    hideLoading();

    const contentEl = document.getElementById("content");
    contentEl.classList.remove("hidden");

    const weatherContainer = document.getElementById("weather-container");
    const weatherCard = document.createElement("div");
    weatherCard.className =
      "bg-white bg-opacity-20 backdrop-blur-sm text-white p-4 rounded-xl shadow-md transition-transform transform hover:scale-105 duration-150 ease-in-out w-full";
    const iconName = getWeatherIcon(data.weather.type);

    weatherCard.innerHTML = `
      <div class="flex flex-col items-center text-center mb-4 space-y-2">
        <span class="material-symbols-outlined text-8xl select-none">
          ${iconName}
        </span>
        <h2 class="text-3xl font-semibold capitalize">${data.weather.type}</h2>
        <p class="text-sm text-white/80">${formatDate(data.weather.lastUpdated)}</p>
      </div>
      <div class="flex flex-wrap gap-2 mt-3 justify-center">
        ${data.weather.effects
          .map(
            (e) => `
        <span class="bg-white bg-opacity-10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
          ${e}
        </span>
        `
          )
          .join("")}
      </div>
    `;

    weatherContainer.appendChild(weatherCard);

    const categories = [
      { key: "seeds", label: "🌱 Seeds" },
      { key: "eggs", label: "🥚 Eggs" },
      { key: "gear", label: "🛠 Gear" },
      { key: "honey", label: "🍯 Honey" },
      { key: "cosmetics", label: "🎨 Cosmetics" },
    ];

    const itemsContainer = document.getElementById("items-container");

    categories.forEach((cat) => {
      const title = document.createElement("h3");
      title.className = "text-2xl font-semibold mb-4 mt-6 text-white";
      title.textContent = cat.label;
      itemsContainer.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8";

      data[cat.key].forEach((item) => {
        const card = document.createElement("div");
        card.className =
          "bg-white bg-opacity-20 backdrop-blur-sm text-white p-4 rounded-xl shadow-md transition-transform transform hover:scale-105 duration-150 ease-in-out w-full";
        card.innerHTML = `
          <h4 class="font-semibold text-lg sm:text-base">${item.name}</h4>
          <p class="text-white/80">Quantity: <span class="font-semibold">${item.quantity}</span></p>
        `;
        grid.appendChild(card);
      });

      itemsContainer.appendChild(grid);
    });
  } catch (err) {
    console.error("Error loading data:", err);
  }
}

loadData();

// Popup close logic
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("dev-popup");
  const closeBtn = document.getElementById("close-popup");

  // Prevent scrolling while popup is visible
  document.body.classList.add("overflow-hidden");

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    document.body.classList.remove("overflow-hidden");
  });
});
