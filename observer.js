function setupMainObserver() {
  var target = document.querySelectorAll('.c-virtual_list__scroll_container')[1]

  var observer = new MutationObserver(function (mutationList) {
    for (var i = 0; i < mutationList.length; i++) {
      if (mutationList[i].addedNodes.length > 0 && 
        mutationList[i].target.className.includes('c-virtual_list__scroll_container')) {
        return paintMessages();
      }
      else if (mutationList[i].addedNodes.length > 0 && mutationList[i].target.className.includes('c-message_kit__actions')) {
        addButtons(mutationList[i].target)
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
}

function setupSecondaryObserver() {
  var target = document.querySelector('.p-workspace__secondary_view')

  var observer = new MutationObserver(function (mutationList) {
    for (var i = 0; i < mutationList.length; i++) {
      if (mutationList[i].addedNodes.length > 0) {
        return paintMessages();
      }
    }
  });

  var config = {
    subtree: true,
    attributes: false,
    childList: true,
    characterData: false
  };

  if (target) {
    observer.observe(target, config);
    clearInterval(setup)
  }
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.matches("button.blockButton")) {
    blockButton(e.target);
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.matches("button.xButton")) {
    xButton(e.target);
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.matches("button.blocked-message-button")) {
    revealTarget(e.target);
  }
});