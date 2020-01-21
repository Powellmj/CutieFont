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


  Array.from(document.querySelectorAll(".c-message_kit__background"))
  .forEach(message => {
    if (message.innerHTML.includes("message_sender_name")) {
      targetStreak = targets[message.querySelector(".c-message__sender_link").innerHTML];
      message.setAttribute("target", `${targetStreak}`);
      message.setAttribute("format", "cutie");
    } else {
      message.setAttribute("target", `${targetStreak}`);
      message.setAttribute("format", "cutie");
    }
  })
}

observePainter()
function observePainter() {
    paintTargets()
    requestAnimationFrame(observePainter);
}

window.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {paintTargets()}
})

//This function loads styles to make everything pretty.
function loadStyles() {
    var link = document.createElement('style')
    var html = "@import url('https://fonts.googleapis.com/css?family=Fascinate+Inline|Indie+Flower|Press+Start+2P|Roboto&display=swap')"
    link.innerHTML = html
    document.getElementsByTagName('head')[0].appendChild(link)

  //these styles bring slack to life!
  var styles = `

[format='cutie'], .c-message_kit__background {
  display: block;
  width: 70%;
  float: left;
  border-radius: 20px;
  margin: 3px 0;
  margin-left: 5px;
  padding: 10px 0;
  font-weight: bold;
}

[target='Tom'] {
  background-color: orange;
}

[target='Joshua'] {
  background-color: #CAEADE;
}

[target='Garon'] {
  background-color: pink;
}

[target='Michael'] {
  background-color: cadetblue;
  float: right;
  margin-right: 5px;
}

[target='BreakBot'] {
  background-color: rgb(90, 199, 0);
  font-size: 11px !important;
  font-family: 'Press Start 2P', cursive;
}

[target='Andy'] {
  background-color: rgb(160, 88, 255);
}

[target='trevoruptain'] {
  background-color: rgb(255, 115, 0);
}

[target='Sammy'] {
  background-color: rgb(0, 255, 157);
  }

.c-virtual_list__scroll_container {
    background-color: rgb(49, 49, 49);
  }

.c-coachmark-anchor, .workspace__primary_view_footer {
  background-color: rgb(29, 29, 29);
  padding-top: 5px;
}

.p-classic_nav__channel_header, .p-workspace__top_nav, .p-classic_nav__model__title__name--dim {
  background-color: rgb(29, 29, 29);
  color: rgb(214, 214, 214);
}

.c-button-unstyled {
  color: rgb(214, 214, 214);
}

.p-context_bar {
  background-color: rgba(29, 29, 29, 0);
}

.p-message_input, .p-message_input_field {
  background-color: cadetblue!important;
  border: none;
  border-radius: 5px;
  top: 1px;
}

.ql-composer-sticky {
  background-color:rgb(85, 124, 126) !important;
  border: none;
  border-radius: 5px;
}

.c-icon--paperclip {
  top: 2px;
}

.p-message_pane__foreword__description {
  color: rgb(214, 214, 214);
}

}

`
//this makes a huuuuge <style> element that has all the styles I added.
  var styleSheet = document.createElement("style")
  styleSheet.type = "text/css"
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)

}


//these invoke all the functions (I probably will just make everything run by default once I'm happy with everything)
paintTargets();
loadStyles();