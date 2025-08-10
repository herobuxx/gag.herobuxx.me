import { API_HOST, ENDPOINTS } from "./url.js";
import { formatDate, showLoading, hideLoading } from "./utils.js";

async function loadData() {
  try {
    showLoading();
    const res = await fetch(`${API_HOST}${ENDPOINTS.allData}`);
    const data = await res.json();
    hideLoading();
    document.getElementById("content").classList.remove("hidden");

    const weatherContainer = document.getElementById("weather-container");
    const weatherCard = document.createElement("div");
    weatherCard.className = "bg-white bg-opacity-20 backdrop-blur-2xl text-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out w-full";
    weatherCard.innerHTML = `
      <div class="flex items-center mb-4">
        <h2 class="text-3xl font-semibold capitalize">${data.weather.type}</h2>
      </div>
      <p class="mb-1"><strong>Active:</strong> ${data.weather.active ? "Yes ✅" : "No ❌"}</p>
      <p class="mb-3"><strong>Last Updated:</strong> ${formatDate(data.weather.lastUpdated)}</p>
      <div class="flex flex-wrap gap-2 mt-3">
        ${data.weather.effects.map(e => `
          <span class="bg-white bg-opacity-20 backdrop-blur-2xl text-white text-sm px-3 py-1 rounded-full relative before:absolute before:-top-1 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white before:border-b-opacity-20">
            ${e}
          </span>
        `).join("")}
      </div>
    `;
    weatherContainer.appendChild(weatherCard);

    const categories = [
      { key: "seeds", label: "🌱 Seeds" },
      { key: "eggs", label: "🥚 Eggs" },
      { key: "gear", label: "🛠 Gear" },
      { key: "honey", label: "🍯 Honey" },
      { key: "cosmetics", label: "🎨 Cosmetics" }
    ];

    const itemsContainer = document.getElementById("items-container");

    categories.forEach(cat => {
      const title = document.createElement("h3");
      title.className = "text-2xl font-semibold mb-4 mt-6 text-center text-white";
      title.textContent = cat.label;
      itemsContainer.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8";

      data[cat.key].forEach(item => {
        const card = document.createElement("div");
        card.className = "bg-white bg-opacity-20 backdrop-blur-2xl text-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-110 duration-200 ease-in-out w-full";
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
