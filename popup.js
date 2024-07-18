document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('extractButton').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Access storage using chrome.storage.local
    await chrome.storage.local.set({ extractedUrl: tab.url });
    const URL = tab.url

    // Checking captured URL
    console.log(URL);

    // Extracting using REGEX 
    const extractNodeID = () => {
      const REGEX = /(?<=node-id=)\d+-\d+/;
      const match = URL.match(REGEX);
      return match ? match[0] : ''; // Ensure to return a string
    };

    const extractedText = extractNodeID();
    document.getElementById('extractedUrl').value = extractedText;

    // Copy the extracted text to the clipboard
    try {
      await navigator.clipboard.writeText(extractedText);
      console.log('Copied to clipboard:', extractedText);
    } catch (err) {
      console.error('Failed to copy text to clipboard:', err);
    }
  });

});