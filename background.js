chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchInChatGPT",
    title: "Search in ChatGPT",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchInChatGPT" && info.selectionText) {
    chrome.tabs.create({ url: "https://chatgpt.com/" }, (newTab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (tabId === newTab.id && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            files: ["content.js"]
          }, () => {
            chrome.tabs.sendMessage(newTab.id, {
              action: "pasteToChatGPT",
              text: info.selectionText
            });
          });
          chrome.tabs.onUpdated.removeListener(listener);
        }
      });
    });
  }
});
