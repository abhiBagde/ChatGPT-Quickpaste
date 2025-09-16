document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("save");

  // Load saved settings
  chrome.storage.sync.get(["mode"], ({ mode }) => {
    if (mode) {
      document.querySelector(`input[value="${mode}"]`).checked = true;
    }
  });

  // Save selected mode
  saveBtn.addEventListener("click", () => {
    const selected = document.querySelector("input[name='mode']:checked").value;
    chrome.storage.sync.set({ mode: selected }, () => {
      alert("Settings saved!");
    });
  });
});
