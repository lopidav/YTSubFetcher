chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    chrome.storage.session.set({ [`yt_sub_${details.tabId}`]: details.url });
  },
  { urls: ["*://*.youtube.com/api/timedtext*"] }
);

chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.storage.session.remove(`yt_sub_${tabId}`);
});