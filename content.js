function waitForInputBox(callback, retries = 20, interval = 300) {
  let count = 0;
  const timer = setInterval(() => {
    const inputBox =
      document.querySelector("#prompt-textarea.ProseMirror") ||
      document.querySelector("#prompt-textarea") ||
      document.querySelector("div[role='textbox']");

    if (inputBox) {
      clearInterval(timer);
      callback(inputBox);
    } else if (++count >= retries) {
      clearInterval(timer);
      console.error("❌ ChatGPT input box not found after retries.");
    }
  }, interval);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "pasteToChatGPT") {
    waitForInputBox((inputBox) => {
      inputBox.focus();

      // Clear old text
      inputBox.innerHTML = "";

      // Insert new text
      const p = document.createElement("p");
      p.textContent = request.text;
      inputBox.appendChild(p);

      // Fire input event so ProseMirror/React detects change
      inputBox.dispatchEvent(new InputEvent("input", { bubbles: true }));

      // Auto-submit if mode is direct
      chrome.storage.sync.get(["mode"], ({ mode }) => {
        if (mode === "direct") {
          const sendBtn = document.querySelector("button[data-testid='send-button']");
          if (sendBtn) sendBtn.click();
        }
      });

      console.log("✅ Pasted into ChatGPT:", request.text);
    });
  }
});
