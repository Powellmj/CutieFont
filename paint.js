'use strict';

const colors = {
  //blue
  1:'#e6f2ff',
  2:'#cce6ff',
  3:'#b3d9ff',
  4:'#99ccff',
  5:'#80bfff',
  6:'#4da6ff',
  7:'#1a8cff',
  8:'#0080ff',
  9:'#0073e6',
  10:'#0066cc',
  // lightblue
  11:'#e6f9ff',
  12:'#ccf2ff',
  13:'#b3ecff',
  14:'#99e6ff',
  15:'#80dfff',
  16:'#4dd2ff',
  17:'#1ac6ff',
  18:'#00ace6',
  19:'#0099cc',
  20:'#0086b3',
  //green
  21:'#ebfaeb',
  22:'#d6f5d6',
  23:'#c2f0c2',
  24:'#adebad',
  25:'#99e699',
  26:'#85e085',
  27:'#5cd65c',
  28:'#33cc33',
  29:'#2eb82e',
  30:'#29a329',
  //yellow
  31:'#ffffe6',
  32:'#ffffcc',
  33:'#ffffb3',
  34:'#ffff99',
  35:'#ffff80',
  36:'#ffff66',
  37:'#ffff33',
  38:'#ffff00',
  39:'#cccc00',
  40:'#999900',
  //orange
  41:'#fff2e6',
  42:'#ffe6cc',
  43:'#ffd9b3',
  44:'#ffcc99',
  45:'#ffbf80',
  46:'#ffb366',
  47:'#ffa64d',
  48:'#ff9933',
  49:'#ff8c1a',
  50:'#ff8000',
  //red
  51:'#ffe6e6',
  52:'#ffcccc',
  53:'#ffb3b3',
  54:'#ff9999',
  55:'#ff8080',
  56:'#ff6666',
  57:'#ff1a1a',
  58:'#ff0000',
  59:'#e60000',
  60:'#cc0000',
  //purple
  61:'#ffe6f2',
  62:'#ffcce6',
  63:'#ffb3d9',
  64:'#ff99cc',
  65:'#ff80bf',
  66:'#ff66b3',
  67:'#ff4da6',
  68:'#ff3399',
  69:'#ff1a8c',
  70:'#ff0080',
  // deeper purple
  71:'#ffe6ff',
  72:'#ffccff',
  73:'#ffb3ff',
  74:'#ff99ff',
  75:'#ff80ff',
  76:'#ff33ff',
  77:'#ff00ff',
  78:'#e600e6',
  79:'#cc00cc',
  80:'#b300b3',
  "Blocked": 'rgb(0, 0, 0)'
}

// chrome.storage.sync.clear()
let colorIds = {};
loadIds();

let setup = setInterval(function () {
  setupMainObserver();
  paintMessages();
}, 1);

function paintMessages() {
  let userId = null;
  let messages = Array.from(document.querySelectorAll(".c-virtual_list__item"))
    .filter(message => message.innerHTML.includes("c-message_kit__actions"));

  messages.forEach((message, idx) => {
    let messageId = message.getAttribute("id")
    if (messageId in colorIds) {
    } else if (message.innerHTML.includes("c-message__sender_link")) {
      userId = message.querySelector(".c-message__sender_link").getAttribute('data-message-sender') || 'bot'
    } else {
      userId = userId || findUserId(messages, idx);
    }
    tagMessage(message, messageId, userId);
    shapeBubbles(messages, idx);
  });
}

function saveColorIds(colorIds) {
  chrome.storage.sync.set(colorIds, () => {
    if (chrome.runtime.lastError) {
      chrome.storage.sync.remove(Object.keys(colorIds).slice(0, 30), () => {
      })
    }
  });
  console.log('saved')
  }

function loadIds() {
  chrome.storage.sync.get(null, (syncedColorIds) => {
    colorIds = syncedColorIds;
    console.log(colorIds)
  }) 
}

function tagUser(userId, message) {
  colorIds[userId] = Math.ceil(Math.random() * 80)
  saveColorIds(colorIds)
  return colorIds[userId]
}

function findUserId(messages, idx) {
  if (idx === 0) { return null }
  let userId = messages[idx].firstChild.getAttribute("data-user")
  if (userId) {
    return userId;
  } else {
    return findUserId(messages, idx - 1)
  }
}

function shapeBubbles(messages, idx) {
  let prevMessage = messages[idx - 1];
  let prevMessageUserId = prevMessage ? prevMessage.firstChild.getAttribute("data-user") : null;
  let message = messages[idx];
  let messageUserId = message.firstChild.getAttribute("data-user");
  let nextMessage = messages[idx + 1];
  let nextMessageUserId = nextMessage ? nextMessage.firstChild.getAttribute("data-user") : null;

  if (messageUserId) {
    if (nextMessageUserId === messageUserId && prevMessageUserId === messageUserId
      && !(nextMessage.innerHTML.includes("message_sender_name")) && !(message.innerHTML.includes("message_sender_name"))) {
        message.firstChild.setAttribute("data-bubble", "2")
      if (prevMessage.firstChild.getAttribute("data-bubble") !== "1") { 
        shapeBubbles(messages, idx - 1)
      }
    } else if (prevMessageUserId === messageUserId && !(message.innerHTML.includes("message_sender_name"))) {
      message.firstChild.setAttribute("data-bubble", "3")
      shapeBubbles(messages, idx - 1)
    } else if (nextMessageUserId === messageUserId && !(nextMessage.innerHTML.includes("message_sender_name"))) {
      message.firstChild.setAttribute("data-bubble", "1")
    }
  }
}

let currentUserId = null;
function tagMessage(message, messageId = null, userId = null) {
  messageId = message.getAttribute("id");
  let currentUserUsername = document.querySelector('.p-ia__sidebar_header__user__name').innerHTML
  let messageUsername = message.querySelector(".c-message__sender_link") ? message.querySelector(".c-message__sender_link").innerHTML : null
  let userColor = null;


  if (messageId in colorIds) {
    userId = colorIds[messageId]
    userColor = colorIds[userId]
  } else if (userId) {
    colorIds[messageId] = userId
    userColor = colorIds[userId] || tagUser(userId, message)
    saveColorIds(colorIds)
  } else if (!userId) {
    return null
  }
  let messageBody;
  if (Array.from(message.firstChild.classList).includes('p-threads_view__default_background')) {
    messageBody = message.firstChild.firstChild
  } else if (Array.from(message.firstChild.classList).includes('c-message_kit__hover')) {
    messageBody = message.firstChild.firstChild.firstChild
  } else {
    messageBody = message.firstChild
  }

  messageBody.setAttribute("style", 'display: inline-block !important');
  if (messageUsername === currentUserUsername) {
    currentUserId = userId
    colorIds['currentUser'] = userId
    messageBody.setAttribute("data-current-user", 'true');
  }
  if (`${colorIds[userId]}`.split('~')[1] || colorIds[messageId].split('~')[1]) {
    messageBody.setAttribute("data-user", userId);
    messageBody.setAttribute("style", 'display: none !important');
    blockedMessage(message)
  }
  messageBody.setAttribute("data-user", userId);
  messageBody.style.backgroundColor = `${colors[userColor]}`;
  if (currentUserId === userId) {
    messageBody.setAttribute("data-current-user", 'true'); 
  }
}

function changeUserColorButtons() {
  if (document.querySelector('.p-member_profile_flexpane--ia')) {
    let menu;
    if (document.querySelector('.colorButtons')) {
      document.querySelector('.colorButtons').remove()
      menu = document.querySelector('.p-member_profile_flexpane--ia').childNodes[1].firstChild.firstChild
    } else {
      menu = document.querySelector('.p-member_profile_flexpane--ia').childNodes[1].childNodes[1].firstChild
    }
    let list = menu.firstChild.firstChild
    let user = document.querySelector(".p-ia_member_profile__avatar__img").src.split('-')[2]
    document.querySelector('.p-flexpane__body.p-flexpane__body--light').style.backgroundColor = `${colors[colorIds[user]]}`

    let buttonUp = document.createElement("button");
    buttonUp.className = 'colorUp c-icon c-icon--arrow-large-left'
    buttonUp.setAttribute('data-userId', `${user}`)

    let buttonDown = document.createElement("button");
    buttonDown.className = 'colorDown c-icon c-icon--arrow-large-right'
    buttonDown.setAttribute('data-userId', `${user}`)

    let colorButtonContainer = document.createElement("Div");
    colorButtonContainer.className = 'colorButtons'

    let containerInfo = document.createElement("Div");
    containerInfo.className = 'color-container-info'
    containerInfo.innerHTML = 'Select Color'

    list.prepend(colorButtonContainer)
    colorButtonContainer.appendChild(buttonUp)
    colorButtonContainer.appendChild(containerInfo)
    colorButtonContainer.appendChild(buttonDown)
  }
}

function changeUserColorSquares() {
  if (document.querySelector('.color-container-menu')) {
    document.querySelector('body').removeChild(document.querySelector('.color-container-menu'))
  }
  let user = document.querySelector(".p-ia_member_profile__avatar__img").src.split('-')[2]
  let containerColorMenu = document.createElement("Div");
  containerColorMenu.className = 'color-container-menu'
  Object.values(colors).forEach((color, idx) => {
    if (idx < 80) {
      let colorSquare = document.createElement("Div");
      colorSquare.className = 'color-square'
      colorSquare.setAttribute('data-userId', `${user}`)
      colorSquare.setAttribute('data-colorId', `${idx + 1}`)
      colorSquare.style.backgroundColor = `${color}`
      containerColorMenu.append(colorSquare)

      if (colors[colorIds[user]] === color) {
        colorSquare.style.border = '3px solid white'
      }
    }
  })
  document.querySelector('body').append(containerColorMenu)
}
