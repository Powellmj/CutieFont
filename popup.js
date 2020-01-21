'use strict';


//I use this to turn on the extension. Eventually I wont use this and itll just be on by default.
// the control is nice for now because I tend to break everything regularly
function injectTheScript(toggle = 0) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, { file: "background.js" });
  });
}

document.getElementById('clickactivity').addEventListener('click', injectTheScript);






