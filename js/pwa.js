// js/pwa.js

// 1. Register service worker (global)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(reg => console.log("Service Worker registered", reg))
      .catch(err => console.error("Service Worker registration failed", err));
  });
}

// 2. Global offline/online notification (works on ALL pages)
document.addEventListener("DOMContentLoaded", () => {
  let messageBox = document.getElementById("message-box");

  // If page doesn't have a #message-box, create one
  if (!messageBox) {
    messageBox = document.createElement("div");
    messageBox.id = "message-box";
    messageBox.style.position = "fixed";
    messageBox.style.bottom = "20px";
    messageBox.style.right = "20px";
    messageBox.style.padding = "10px 20px";
    messageBox.style.borderRadius = "8px";
    messageBox.style.backgroundColor = "#38c1c4";
    messageBox.style.color = "white";
    messageBox.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    messageBox.style.display = "none";
    messageBox.style.zIndex = "9999";
    document.body.appendChild(messageBox);
  }

  function showMessage(text) {
    messageBox.textContent = text;
    messageBox.style.display = "block";
    setTimeout(() => {
      messageBox.style.display = "none";
    }, 3000);
  }

  function updateConnectionStatus() {
    if (!navigator.onLine) {
      showMessage("You are offline. Showing saved content.");
    } else {
      // Optional: only show this if you want a "back online" toast
      showMessage("You are online.");
    }
  }

  // Initial state on page load
  updateConnectionStatus();

  // Listen for network changes globally
  window.addEventListener("offline", updateConnectionStatus);
  window.addEventListener("online", updateConnectionStatus);
});
