'use strict';

// This function targets people and gives messages associated with them a class that I can style.
function paintTargets() {
  var targets = {
    "Tom Betthauser": "Tom",
    "Joshua Graham": "Joshua",
    "Garon Hock": "Garon",
    "Michael Powell": "Michael",
    "BreakBot": "BreakBot",
    "Andy Wynkoop": "Andy",
    "trevoruptain": "trevoruptain",
    "Sammy Gutierrez": "Sammy"}
    
  var targetStreak = '';

  // chrome.storage.sync.set({ key: value }, function () {
  //   console.log('Value is set to ' + value);
  // });

  // chrome.storage.sync.get(['key'], function (result) {
  //   console.log('Value currently is ' + result.key);
  // });


  document.querySelectorAll(".c-message_kit__background").forEach(message => {
    if (message.innerHTML.includes("message_sender_name")) {
      targetStreak = targets[message.querySelector(".c-message__sender_link").innerHTML];
    }
      message.setAttribute("target", `${targetStreak}`);
      message.setAttribute("format", "cutie");
  })
}

observePainter()
function observePainter() {
    paintTargets()
    requestAnimationFrame(observePainter);
}

//This function loads styles to make everything pretty.
function loadStyles() {
    var link = document.createElement('style')
    var html = "@import url('https://fonts.googleapis.com/css?family=Fascinate+Inline|Indie+Flower|Press+Start+2P|Roboto&display=swap')"
    link.innerHTML = html
    document.getElementsByTagName('head')[0].appendChild(link)
}


//these invoke all the functions (I probably will just make everything run by default once I'm happy with everything)
paintTargets();
loadStyles();