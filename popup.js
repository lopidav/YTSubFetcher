
const formats = ['srv3', 'json3', 'srt', 'vtt', 'srv1', 'srv2', 'ttml'];
const container = document.getElementById('container');

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;
  const storageKey = `yt_sub_${tabId}`;

  chrome.storage.session.get([storageKey], (result) => {
    const url = result[storageKey];

    if (!url) {
      container.innerHTML = '<div id="msg">No subtitles caught yet. Play video & enable CC.</div>';
      return;
    }

    container.innerHTML = ''; 
    const urlObj = new URL(url);

    formats.forEach(fmt => {
      const btn = document.createElement('button');
      btn.textContent = fmt;
      btn.onclick = () => {
        urlObj.searchParams.set('fmt', fmt);
        
        const videoId = urlObj.searchParams.get('v') || 'video';
        
        let extension = fmt;
        if (fmt === 'json3') extension = 'json';
        if (fmt === 'srv3' || fmt === 'srv2' || fmt === 'srv1') extension = 'xml';

        chrome.downloads.download({
          url: urlObj.toString(),
          filename: `subtitles_${videoId}_${fmt}.${extension}`
        });
      };
      container.appendChild(btn);
    });
  });
});