// js/pwa.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")   // 👈 NOTE: "./", not "/"
      .then(reg => console.log("SW registered", reg))
      .catch(err => console.error("SW registration failed", err));
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const messageBox = document.getElementById("message-box");

  function showMessage(text) {
    if (!messageBox) return;
    messageBox.textContent = text;
    messageBox.style.display = "block";
    // hide after 3 seconds
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 3000);
  }

  function handleConnectionChange() {
    if (!navigator.onLine) {
      showMessage("You are offline. Some features may not work.");
    } else {
      showMessage("You are back online.");
    }
  }

  // Initial check on page load
  handleConnectionChange();

  // Listen for online/offline events
  window.addEventListener("offline", handleConnectionChange);
  window.addEventListener("online", handleConnectionChange);
});
