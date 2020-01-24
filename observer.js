function setupMainObserver() {
  var target = document.querySelector('.c-virtual_list__scroll_container')

  var observer = new MutationObserver(function (mutationList) {
    for (var i = 0; i < mutationList.length; i++) {
      if (mutationList[i].addedNodes.length > 0) {
        return paintMessages();
      }
    }
  });

  var config = {
    attributes: false,
    childList: true,
    characterData: false
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
