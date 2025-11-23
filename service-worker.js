// js/pwa.js

// 1. Register service worker (keep this)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(reg => console.log("Service Worker registered", reg))
      .catch(err => console.error("Service Worker registration failed", err));
  });
}

// 2. Global offline/online notification (ONLY on change)
document.addEventListener("DOMContentLoaded", () => {
  let messageBox = document.getElementById("message-box");

  // Create one if this page doesn't have it
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

  // Track last known status per tab
  let lastStatus = sessionStorage.getItem("lastConnectionStatus");
  if (!lastStatus) {
    lastStatus = navigator.onLine ? "online" : "offline";
    sessionStorage.setItem("lastConnectionStatus", lastStatus);
  }

  function handleOffline() {
    const previous = sessionStorage.getItem("lastConnectionStatus");
    if (previous === "offline") return; // already offline, don't spam
    sessionStorage.setItem("lastConnectionStatus", "offline");
    showMessage("You are offline. Showing saved content.");
  }

  function handleOnline() {
    const previous = sessionStorage.getItem("lastConnectionStatus");
    if (previous === "online") return; // already online, don't spam
    sessionStorage.setItem("lastConnectionStatus", "online");
    showMessage("You are back online.");
  }

  // 🔹 Only react to actual changes
  window.addEventListener("offline", handleOffline);
  window.addEventListener("online", handleOnline);
});
