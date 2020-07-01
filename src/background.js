/*
Event Handlers
1. Verifies that host url is in Youtube.
2. Creates request query where we add all parameters.
Used the chrome.downloads API to send GET request to server.
Index.js has a get request ('download'). When the server receives
this GET request, use package downloaded ytdl-core module to generate
readable stream, then write to a writable stream (response).
Response received back in the extension and a file gets downloaded
within a folder "YoutubeDownloader" with the filename and format
specified by user in defaults downloaded directory.
*/
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined,
  function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostContains: 'youtube' }
        })
      ],
      actions: [
        new chrome.declarativeContent.ShowPageAction()
      ]
    }]);
  });
});

chrome.runtime.onMessage.addListener(function(message) {
  let url = 'http://localhost:4000/download?';
  let queryString = Object.keys(message).map(key => key
    + '=' + message[key]).join('&');
  url += queryString;
  console.log(url);
  chrome.downloads.download({url: url,
    filename: "YoutubeDownloader/" + message.filename + '.' +
    message.format},
    function(downID) {
      chrome.downloads.show(downID);
    });
});
