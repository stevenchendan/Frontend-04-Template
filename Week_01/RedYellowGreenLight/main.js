let lights = document.getElementsByTagName("div");
let stopProgram = false;

function green() {
  removeLight()
  document.getElementsByClassName("green")[0].classList.add("light");
}

function red() {
  removeLight()
  document.getElementsByClassName("red")[0].classList.add("light");
}

function yellow() {
  removeLight()
  document.getElementsByClassName("yellow")[0].classList.add("light");
}

function go() {
  if (!!stopProgram) {
    removeLight();
    return;
  }
  green();
  setTimeout(function() {
    yellow();
    setTimeout(function() {
      red();
      setTimeout(function() {
        go();
      }, 5000);
    }, 2000);
  }, 10000);
}

function removeLight() {
  for (var i = 0; i < 3; i++) {
    lights[i].classList.remove("light");
  }
}

function stop() {
  stopProgram = true;
}