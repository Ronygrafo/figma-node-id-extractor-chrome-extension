document.addEventListener('DOMContentLoaded', function() {
  console.log(chrome.storage);
  document.getElementById('extractButton').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // Access storage using chrome.storage.local
    await chrome.storage.local.set({ extractedUrl: tab.url });
    document.getElementById('extractedUrl').value = tab.url;
    console.log(tab.url);
  });
  
});