import { API_HOST, ENDPOINTS } from "./url.js";
import { formatDate } from "./utils.js";

async function loadData() {
  try {
    const res = await fetch(`${API_HOST}${ENDPOINTS.allData}`);
    const data = await res.json();

    // WEATHER
    const weatherContainer = document.getElementById("weather-container");
    const weatherCard = document.createElement("div");
    weatherCard.className = "bg-gradient-to-r from-sky-500 to-cyan-400 text-white p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out w-full";

    weatherCard.innerHTML = `
      <div class="flex items-center mb-4">
        <h2 class="text-3xl font-semibold capitalize">${data.weather.type}</h2>
      </div>
      <p class="mb-1"><strong>Active:</strong> ${data.weather.active ? "Yes ✅" : "No ❌"}</p>
      <p class="mb-3"><strong>Last Updated:</strong> ${formatDate(data.weather.lastUpdated)}</p>
      <ul class="list-disc pl-5 space-y-1">
        ${data.weather.effects.map(e => `<li>${e}</li>`).join("")}
      </ul>
    `;
    weatherContainer.appendChild(weatherCard);

    // CATEGORIES
    const categories = [
      { key: "gear", label: "🛠 Gear" },
      { key: "seeds", label: "🌱 Seeds" },
      { key: "eggs", label: "🥚 Eggs" },
      { key: "honey", label: "🍯 Honey" },
      { key: "cosmetics", label: "🎨 Cosmetics" }
    ];

    const itemsContainer = document.getElementById("items-container");

    categories.forEach(cat => {
      const title = document.createElement("h3");
      title.className = "text-2xl font-semibold mb-4 mt-6 text-center";
      title.textContent = cat.label;
      itemsContainer.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "grid grid-cols-1 gap-4 mb-8";

      data[cat.key].forEach(item => {
        const card = document.createElement("div");
        card.className = "bg-white shadow rounded-lg p-4 text-base sm:text-sm";
        card.innerHTML = `
          <h4 class="font-semibold text-lg sm:text-base">${item.name}</h4>
          <p class="text-gray-600">Quantity: <span class="font-semibold">${item.quantity}</span></p>
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