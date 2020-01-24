'use strict';

const colors = [
  'rgb(255, 153, 153)',
  'rgb(255, 179, 153)',
  'rgb(255, 204, 153)',
  'rgb(255, 230, 153)',
  'rgb(255, 255, 153)',
  'rgb(230, 255, 153)',
  'rgb(204, 255, 153)',
  'rgb(179, 255, 153)',
  'rgb(153, 255, 153)',
  'rgb(153, 255, 179)',
  'rgb(153, 255, 204)',
  'rgb(153, 255, 230)',
  'rgb(153, 255, 255)',
  'rgb(153, 230, 255)',
  'rgb(153, 204, 255)',
  'rgb(153, 179, 255)',
  'rgb(153, 153, 255)',
  'rgb(179, 153, 255)',
  'rgb(204, 153, 255)',
  'rgb(230, 153, 255)',
  'rgb(255, 153, 255)',
  'rgb(255, 153, 230)',
  'rgb(255, 153, 204)',
  'rgb(255, 153, 179)',
  'rgb(255, 153, 153)',
  'rgb(255, 102, 102)',
  'rgb(255, 140, 102)',
  'rgb(255, 179, 102)',
  'rgb(255, 217, 102)',
  'rgb(255, 255, 102)',
  'rgb(217, 255, 102)',
  'rgb(179, 255, 102)',
  'rgb(153, 255, 102)',
  'rgb(140, 255, 102)',
  'rgb(102, 255, 102)',
  'rgb(102, 255, 140)',
  'rgb(102, 255, 179)',
  'rgb(102, 255, 217)',
  'rgb(102, 255, 255)',
  'rgb(102, 217, 255)',
  'rgb(102, 179, 255)',
  'rgb(102, 140, 255)',
  'rgb(102, 102, 255)',
  'rgb(140, 102, 255)',
  'rgb(179, 102, 255)',
  'rgb(217, 102, 255)',
  'rgb(255, 102, 255)',
  'rgb(255, 102, 217)',
  'rgb(255, 102, 179)',
  'rgb(255, 102, 140)',
  'rgb(255, 102, 102)',
  'rgb(255, 64, 0)',
  'rgb(255, 128, 0)',
  'rgb(255, 191, 0)',
  'rgb(255, 255, 0)',
  'rgb(191, 255, 0)',
  'rgb(128, 255, 0)',
  'rgb(64, 255, 0)',
  'rgb(0, 255, 0)',
  'rgb(0, 255, 64)',
  'rgb(0, 255, 128)',
  'rgb(0, 255, 191)',
  'rgb(0, 255, 255)',
  'rgb(0, 191, 255)',
  'rgb(0, 128, 255)',
  'rgb(0, 64, 255)',
  'rgb(0, 0, 255)',
  'rgb(64, 0, 255)',
  'rgb(128, 0, 255)',
  'rgb(191, 0, 255)',
  'rgb(255, 0, 255)',
  'rgb(255, 0, 191)',
  'rgb(255, 0, 128)',
  'rgb(255, 0, 64)',
  'rgb(255, 0, 0)',
  'rgb(153, 102, 102)',
  'rgb(153, 115, 102)',
  'rgb(153, 128, 102)',
  'rgb(153, 140, 102)',
  'rgb(153, 153, 102)',
  'rgb(140, 153, 102)',
  'rgb(128, 153, 102)',
  'rgb(115, 153, 102)',
  'rgb(102, 153, 102)',
  'rgb(102, 153, 115)',
  'rgb(102, 153, 128)',
  'rgb(102, 153, 140)',
  'rgb(102, 153, 153)',
  'rgb(102, 140, 153)',
  'rgb(102, 128, 153)',
  'rgb(102, 115, 153)',
  'rgb(102, 102, 153)',
  'rgb(115, 102, 153)',
  'rgb(128, 102, 153)',
  'rgb(140, 102, 153)',
  'rgb(153, 102, 153)',
  'rgb(153, 102, 140)',
  'rgb(153, 102, 128)',
  'rgb(153, 102, 115)',
  'rgb(153, 102, 102)'
]

// chrome.storage.sync.clear()
let colorIds = {
  'UN65PKSPR': 'cadetblue'
};
loadIds();

var setup = setInterval(function () {
  setupMainObserver();
  setupSecondaryObserver();
  paintMessages();
}, 1);

function paintMessages() {
  var colorId = null;
  var stateChange = false;
  var messages = Array.from(document.querySelectorAll(".c-virtual_list__item"))
    .filter(message => message.innerHTML.includes("c-message_kit__background"))

  messages.forEach((message, idx) => {
    var messageId = message.getAttribute("id")
    if (!(messageId in colorIds)) {
      if (message.innerHTML.includes("message_sender_name")) {
        var userId = message.querySelector(".c-message__sender_link").getAttribute('data-message-sender')
        colorId = colorIds[userId] || tagUser(userId)
        stateChange = tagMessage(message, colorId);
      } else {
        colorId = colorId || findColorId(messages, idx);
        stateChange = tagMessage(message, colorId);
      }
    } else {
      tagMessage(message, colorIds[messageId]);
    }
  });
  if (stateChange) {saveColorIds(colorIds)}
}

function saveColorIds(colorIds) {
  chrome.storage.sync.set(colorIds);
  }

function loadIds() {
  chrome.storage.sync.get(null, function (syncedColorIds) {
    colorIds = syncedColorIds;
  }) 
}

function tagUser(userId) {
  return colorIds[userId] = colors[Math.floor(Math.random() * Math.floor(100))]
}

function findColorId(messages, idx) {
  if (idx === 0) { return null }
  let colorId = messages[(idx - 1)].firstChild.getAttribute("color")
  if (colorId) {
    return colorId
  } else {
    return findColorId(messages, idx-1)
  }
}

function tagMessage(message, target = null) {
  if (target) {
    message.firstChild.setAttribute("color", `${target}`);
    message.firstChild.setAttribute("style", `background-color: ${target};`);
    colorIds[message.getAttribute("id")] = `${target}`
    return true;
  }
  return false;
}
