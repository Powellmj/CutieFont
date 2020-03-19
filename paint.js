'use strict';

const colors = {
  0:'cadetblue',
  1:'rgb(255, 153, 153)',
  2:'rgb(255, 179, 153)',
  3:'rgb(255, 204, 153)',
  4:'rgb(255, 230, 153)',
  5:'rgb(255, 255, 153)',
  6:'rgb(230, 255, 153)',
  7:'rgb(204, 255, 153)',
  8:'rgb(179, 255, 153)',
  9:'rgb(153, 255, 153)',
  10:'rgb(153, 255, 179)',
  11:'rgb(153, 255, 204)',
  12:'rgb(153, 255, 230)',
  13:'rgb(153, 255, 255)',
  14:'rgb(153, 230, 255)',
  15:'rgb(153, 204, 255)',
  16:'rgb(153, 179, 255)',
  17:'rgb(153, 153, 255)',
  18:'rgb(179, 153, 255)',
  19:'rgb(204, 153, 255)',
  20:'rgb(230, 153, 255)',
  21:'rgb(255, 153, 255)',
  22:'rgb(255, 153, 230)',
  23:'rgb(255, 153, 204)',
  24:'rgb(255, 153, 179)',
  25:'rgb(255, 153, 153)',
  26:'rgb(255, 102, 102)',
  27:'rgb(255, 140, 102)',
  28:'rgb(255, 179, 102)',
  29:'rgb(255, 217, 102)',
  30:'rgb(255, 255, 102)',
  31:'rgb(217, 255, 102)',
  32:'rgb(179, 255, 102)',
  33:'rgb(153, 255, 102)',
  34:'rgb(140, 255, 102)',
  35:'rgb(102, 255, 102)',
  36:'rgb(102, 255, 140)',
  37:'rgb(102, 255, 179)',
  38:'rgb(102, 255, 217)',
  39:'rgb(102, 255, 255)',
  40:'rgb(102, 217, 255)',
  41:'rgb(102, 179, 255)',
  42:'rgb(102, 140, 255)',
  43:'rgb(102, 102, 255)',
  44:'rgb(140, 102, 255)',
  45:'rgb(179, 102, 255)',
  46:'rgb(217, 102, 255)',
  47:'rgb(255, 102, 255)',
  48:'rgb(255, 102, 217)',
  49:'rgb(255, 102, 179)',
  50:'rgb(255, 102, 140)',
  51:'rgb(255, 102, 102)',
  52:'rgb(255, 64, 0)',
  53:'rgb(255, 128, 0)',
  54:'rgb(255, 191, 0)',
  55:'rgb(255, 255, 0)',
  56:'rgb(191, 255, 0)',
  57:'rgb(128, 255, 0)',
  58:'rgb(64, 255, 0)',
  59:'rgb(0, 255, 0)',
  60:'rgb(0, 255, 64)',
  61:'rgb(0, 255, 128)',
  62:'rgb(0, 255, 191)',
  63:'rgb(0, 255, 255)',
  64:'rgb(0, 191, 255)',
  65:'rgb(0, 128, 255)',
  66:'rgb(0, 64, 255)',
  67:'rgb(66, 66, 255)',
  68:'rgb(204, 255, 255)',
  69:'rgb(128, 0, 255)',
  70:'rgb(191, 0, 255)',
  71:'rgb(255, 0, 255)',
  72:'rgb(255, 0, 191)',
  73:'rgb(255, 0, 128)',
  74:'rgb(255, 0, 64)',
  75:'rgb(255, 0, 0)',
  76:'rgb(153, 102, 102)',
  77:'rgb(153, 115, 102)',
  78:'rgb(153, 128, 102)',
  79:'rgb(153, 140, 102)',
  80:'rgb(153, 153, 102)',
  81:'rgb(140, 153, 102)',
  82:'rgb(128, 153, 102)',
  83:'rgb(115, 153, 102)',
  84:'rgb(102, 153, 102)',
  85:'rgb(102, 153, 115)',
  86:'rgb(102, 153, 128)',
  87:'rgb(102, 153, 140)',
  88:'rgb(102, 153, 153)',
  89:'rgb(102, 140, 153)',
  90:'rgb(102, 128, 153)',
  91:'rgb(102, 115, 153)',
  92:'rgb(102, 102, 153)',
  93:'rgb(115, 102, 153)',
  94:'rgb(128, 102, 153)',
  95:'rgb(140, 102, 153)',
  96:'rgb(153, 102, 153)',
  97:'rgb(153, 102, 140)',
  98:'rgb(153, 102, 128)',
  99:'rgb(153, 102, 115)',
  100:'rgb(153, 102, 102)'
}

// chrome.storage.sync.clear()
let colorIds = {
};
loadIds();

var setup = setInterval(function () {
  setupMainObserver();
  setupSecondaryObserver();
  paintMessages();
}, 1);

function paintMessages(block = false) {
  var colorId = null;
  var userId = null;
  var stateChange = false;
  var messages = Array.from(document.querySelectorAll(".c-virtual_list__item"))
    .filter(message => message.innerHTML.includes("c-message_kit__background"))

  messages.forEach((message, idx) => {
    var messageId = message.getAttribute("id").split('.')[0]
    if (message.firstChild.getAttribute("data-user") && !block) {
    } else if (messageId in colorIds) {
      tagMessage(message, colorIds[messageId] === 0 ? colorIds[messageId] : colorId, colorIds[messageId]);
    } else {
      if (message.innerHTML.includes("message_sender_name")) {
        userId = message.querySelector(".c-message__sender_link").getAttribute('data-message-sender') || 'bot'

        colorId = colorIds[userId] || tagUser(userId, message)
        stateChange = tagMessage(message, colorId, userId);
      } else {
        userId = userId || findUserId(messages, idx);
        stateChange = tagMessage(message, colorId, userId);
      }
    }
  });
  if (stateChange) { 
    saveColorIds(colorIds) 
  }
}

function saveColorIds(colorIds) {
  chrome.storage.sync.set(colorIds, function() {
    if (chrome.runtime.lastError) {
      chrome.storage.sync.remove(Object.keys(colorIds).slice(0, 30), function() {
      })
    }
  });
  console.log('saved')
  }

function loadIds() {
  chrome.storage.sync.get(null, function (syncedColorIds) {
    colorIds = syncedColorIds;
    console.log(colorIds)
  }) 
}

function tagUser(userId, message) {
  if (message.querySelector(".c-message__sender_link").innerHTML === document.querySelector('.p-classic_nav__team_header__user__name__truncate').innerHTML) {
    return colorIds[userId] = '101'
  }
  if (colorIds[userId] === 0) {
    return colorIds[userId]
  }
  return colorIds[userId] = Math.ceil(Math.random() * 100)
}

function findUserId(messages, idx) {
  if (idx === 0) { return null }
  let userId = messages[idx].firstChild.getAttribute("data-user")
  if (userId) {
    return userId
  } else {
    return findUserId(messages, idx - 1)
  }
}

function tagMessage(message, colorNumber = null, userId = null) {
  var messageId = message.getAttribute("id").split('.')[0]
  if (colorNumber && userId) {
    message.firstChild.setAttribute("data-user", userId);
    message.firstChild.setAttribute("style", `background-color: ${colors[colorNumber]};`);
    colorIds[messageId] = userId
  } else if (userId && colorNumber !== 0 && colorIds[userId] !== 0) {
    message.firstChild.setAttribute("data-user", userId);
    message.firstChild.setAttribute("style", `background-color: ${colors[colorIds[userId]]};`);
    colorIds[messageId] = userId
  } else if (colorIds[userId] === 0 || colorNumber === 0) {
    message.firstChild.setAttribute("data-user", 'xMessage');
    message.setAttribute("style", 'display: none !important;');
  }
  return true;
}

function addButtons(node) {
  if (document.querySelector('.c-message_actions__container')) {
    var node1 = document.createElement("Button");
    node1.setAttribute('x-message-id', `${node.parentNode.parentNode.parentNode.getAttribute("id").split('.')[0]}`)
    node1.className = "xButton c-icon c-icon--times c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium p-flexpane_header__control"
    document.querySelector('.c-message_actions__container').appendChild(node1)

    var node2 = document.createElement("Button");
    node2.setAttribute('block-message-id', `${node.parentNode.parentNode.getAttribute("data-user")}`)
    node2.innerHTML = "Block"
    node2.className = "blockButton c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium p-flexpane_header__control"
    document.querySelector('.c-message_actions__container').appendChild(node2)
  }
}

function xButton(button) {
  let ignoredMessageId = button.getAttribute('x-message-id')
  colorIds[ignoredMessageId] = 0
  saveColorIds(colorIds)
  paintMessages(true);
}

function blockButton(button) {
  var parent = button.getAttribute('block-message-id')
  colorIds[parent] = 0
  saveColorIds(colorIds)
  paintMessages(true);
}