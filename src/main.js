/*
Used chrome.tabs API to fetch current video url
Send info (input from user) in form of json message
*/
window.onload = function() {
  let quality = document.getElementById('quality');
  let filename = document.getElementById('filename');
  let format = document.getElementById('format');
  let dButton = document.getElementById('download');

  dButton.onclick = function() {
    console.log("Button Clicked");
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true},
  function(tabs) {
    let url = tabs[0].url;
    let message = {
      'url': url,
      'quality': quality.value,
      'filename': filename.value,
      'format': format.value
    };
    chrome.runtime.sendMessage(message);
  });
  }
}
