export function formatDate(isoString) {
  return new Date(isoString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}

export function showLoading() {
  const loading = document.getElementById("loading");
  loading.innerHTML = `
    <div class="flex flex-col items-center">
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="mt-3 text-gray-600">Loading</p>
    </div>
  `;
}

export function hideLoading() {
  const loading = document.getElementById("loading");
  loading.classList.add("hidden");
}
