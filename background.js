'use strict';

paintTargets();
loadStyles();

window.addEventListener("keypress", function(e) {
  if (e.key === 'Enter') {
    paintTargets()
  }
})

function paintTargets() {

  messageIds = chrome.storage.sync.get({['messageIds']: messageIds}, function () {
   return 'messageIds'[messageIds];
  }) || {};

  let targets = {
    "Tom Betthauser": "Tom",
    "Joshua Graham": "Joshua",
    "Garon Hock": "Garon",
    "Michael Powell": "Michael",
    "BreakBot": "BreakBot",
    "Andy Wynkoop": "Andy",
    "trevoruptain": "trevoruptain",
    "Sammy Gutierrez": "Sammy"
  }

  let targetStreak = null;
  let messages = document.querySelectorAll(".c-virtual_list__item")
  messages.forEach((message, idx) => {
    if (!(message.getAttribute("id") in messageIds)) {
      if (message.innerHTML.includes("message_sender_name")) {
        targetStreak = targets[message.querySelector(".c-message__sender_link").innerHTML];
        applyTag(message, targetStreak);
      } else {
        targetStreak = targetStreak || findTag(messages, idx);
        applyTag(message, targetStreak);
      }
    } else {
      message.firstChild.setAttribute("target", `${messageIds[message.getAttribute("id")]}`);
    }
  });
  chrome.storage.sync.set({['messageIds']: messageIds}, function() {
    console.log({ ['messageIds']: messageIds });
  })
}

function findTag(messages, idx) {
  if (idx === 0) { return null }
  let targ = messages[(idx - 1)].firstChild.getAttribute("target")
  if (targ) {
    return targ
  } else {
    return findTag(messages, idx-1)
  }
}

function applyTag(message, target) {
  if (target) {
  message.firstChild.setAttribute("target", `${target}`);
  messageIds[message.getAttribute("id")] = `${target}`
  }
}

//This function loads styles to make everything pretty.
function loadStyles() {
    let link = document.createElement('style')
    let html = "@import url('https://fonts.googleapis.com/css?family=Fascinate+Inline|Indie+Flower|Press+Start+2P|Roboto&display=swap')"
    link.innerHTML = html
    document.getElementsByTagName('head')[0].appendChild(link)
}