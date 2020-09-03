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

async function go() {
  if (!!stopProgram) {
    removeLight();
    return;
  }
  while (true) {
    green();
    await sleep(1000);
    yellow();
    await sleep(200);
    red();
    await sleep(500);
  }
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