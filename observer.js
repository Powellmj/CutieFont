function setupMainObserver() {
  var target = document.querySelector('body')

  var observer = new MutationObserver(function (mutationList) {
    for (var i = 0; i < mutationList.length; i++) {
      if (mutationList[i].addedNodes.length > 0) {
        if (mutationList[i].target.className.includes('c-virtual_list__scroll_container')) {
          return paintMessages();
        } 
        if (mutationList[i].target.className.includes('p-member_profile_field__value')
          || mutationList[i].target.className.includes('p_member_profile_picture__img')) {
          changeUserColorButtons()
        }
        if (mutationList[i].target.className.includes('p-message_input')) {
          Array.from(document.querySelectorAll('.c-texty_input')).forEach(messageBox => {
            messageBox.style.backgroundColor = `${colors[colorIds[colorIds['currentUser']]]}`
          })
        }
        if (mutationList[i].target.innerHTML.includes('p-member_profile_card')) {
          let userId = document.querySelector('.p-member_profile_card__picture.p-member_profile_picture').style.backgroundImage.split('-')[2]
          document.querySelector('.p-member_profile_card').style.backgroundColor = `${colors[colorIds[userId]]}`
        }
      }
    }
  });
  var config = {
    oldValue: true,
    subtree: true,
    attributes: true,
    childList: true,
    characterData: true
  };

  if (target) {
    observer.observe(target, config);
    clearInterval(setup)
  }

  Array.from(document.querySelectorAll('.c-texty_input')).forEach(messageBox => {
    messageBox.style.backgroundColor = `${colors[colorIds[colorIds['currentUser']]]}`
  })
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.matches("button.colorDown.c-icon.c-icon--arrow-large-right")) {
    if (colorIds[e.target.getAttribute('data-userId')] >= 80) {
      colorIds[e.target.getAttribute('data-userId')] = 1;
    } else {
      colorIds[e.target.getAttribute('data-userId')] += 1
    }
    document.querySelector('.p-flexpane__body.p-flexpane__body--light').style.backgroundColor = `${colors[colorIds[e.target.getAttribute('data-userId')]]}`
    paintMessages();
    saveColorIds(colorIds);
    Array.from(document.querySelectorAll('.c-texty_input')).forEach(messageBox => {
      messageBox.style.backgroundColor = `${colors[colorIds[colorIds['currentUser']]]}`
    })
  }
  if (e.target && e.target.matches("button.colorUp.c-icon.c-icon--arrow-large-left")) {
    if (colorIds[e.target.getAttribute('data-userId')] <= 1) {
      colorIds[e.target.getAttribute('data-userId')] = 80;
    } else {
      colorIds[e.target.getAttribute('data-userId')] -= 1
    }
    document.querySelector('.p-flexpane__body.p-flexpane__body--light').style.backgroundColor = `${colors[colorIds[e.target.getAttribute('data-userId')]]}`
    paintMessages();
    saveColorIds(colorIds);
    Array.from(document.querySelectorAll('.c-texty_input')).forEach(messageBox => {
      messageBox.style.backgroundColor = `${colors[colorIds[colorIds['currentUser']]]}`
    })
  }
  if (!(e.target.matches("div.color-square")) && !(e.target.matches("div.color-container-menu"))) {
    if (document.querySelector('.color-square'))
      document.querySelector('.color-container-menu').style.display = 'none'
  }
  if (!(e.target.matches("div.p-member_profile_name__text"))) {
    setTimeout(() => {changeUserColorButtons()}, 1)
  }
  if (e.target && e.target.matches("div.color-square")) {
    colorIds[e.target.getAttribute('data-userId')] = e.target.getAttribute('data-colorId')
    document.querySelector('.p-flexpane__body.p-flexpane__body--light').style.backgroundColor = `${colors[e.target.getAttribute('data-colorId')]}`
    paintMessages();
    saveColorIds(colorIds);
    changeUserColorSquares()
    Array.from(document.querySelectorAll('.c-texty_input')).forEach(messageBox => {
      messageBox.style.backgroundColor = `${colors[colorIds[colorIds['currentUser']]]}`
    })
  }
  if (e.target && e.target.matches("div.color-container-info")) {
    changeUserColorSquares();
  }
});