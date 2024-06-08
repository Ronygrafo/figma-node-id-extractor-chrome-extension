document.getElementById('extractBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractNodeId,
    });
  });
  
  function extractNodeId() {
    const url = window.location.href;
    const nodeIdMatch = url.match(/node-id=([\d%:]+)/);
    if (nodeIdMatch && nodeIdMatch[1]) {
      const nodeId = decodeURIComponent(nodeIdMatch[1]);
      navigator.clipboard.writeText(nodeId).then(() => {
        alert(`Node ID ${nodeId} copied to clipboard`);
      });
    } else {
      alert('No Node ID found in URL');
    }
  }
  