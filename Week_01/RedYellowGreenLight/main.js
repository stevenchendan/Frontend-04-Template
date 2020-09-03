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

function sleep(milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  })
}

function go() {
  if (!!stopProgram) {
    removeLight();
    return;
  }
  green();
  sleep(1000).then(() => {
    yellow();
    return sleep(200);
  }).then(() => {
    red();
    return sleep(500);
  }).then(go);
}

function removeLight() {
  for (var i = 0; i < 3; i++) {
    lights[i].classList.remove("light");
  }
}

function stop() {
  stopProgram = true;
}
function start() {
  stopProgram = false;
  go();
}