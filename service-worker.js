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

// 2. Global offline/online notification
document.addEventListener("DOMContentLoaded", () => {
  let messageBox = document.getElementById("message-box");

  // Create one if the page doesn't have it
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

  // 🔹 Show “online” only once per session
  if (navigator.onLine) {
    const alreadyShown = sessionStorage.getItem("onlineStatusShown");
    if (!alreadyShown) {
      showMessage("You are online.");
      sessionStorage.setItem("onlineStatusShown", "1");
    }
  } else {
    // If user opens the app while offline, tell them
    showMessage("You are offline. Showing saved content.");
  }

  // 🔹 Only fire when the connection actually changes
  window.addEventListener("offline", () => {
    showMessage("You are offline. Showing saved content.");
  });

  window.addEventListener("online", () => {
    showMessage("You are back online.");
  });
});
