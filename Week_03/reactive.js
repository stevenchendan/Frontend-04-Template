let callbacks = new Map();
let reactivities = new Map();
let usedReactivities = [];
let object = {
  a: {b : 3},
  b: 2
}

let po = reactive(object);

effect(() => {
  document.getElementById("r").value = po.r;
})
effect(() => {
  document.getElementById("g").value = po.g;
})
effect(() => {
  document.getElementById("b").value = po.b;
})

document.getElementById("r").addEventListener("input", event => po.r = event.target.value);
document.getElementById("g").addEventListener("input", event => po.g = event.target.value);
document.getElementById("b").addEventListener("input", event => po.b = event.target.value);

effect(() => {
  document.getElementById("color").style.background = `rgb(${po.r}, ${po.g}, ${po.b})`;
})


function effect(callback) {
  // callbacks.push(callback);
  useReactivities = [];
  callback();
  console.log(usedReactivities);

  for (let reactivity of usedReactivities) {
    if (!callbacks.has(reactivity[0])) {
      callbacks.set(reactivity[0], new Map());
    }
    if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
      callbacks.get(reactivity[0]).set(reactivity[1], []);
    }
    callbacks.get(reactivity[0]).get(reactivity[1]).push(callback);
  }
}


function reactive(object) {
  if (reactivities.has(object)) {
    return reactivities.get(object);
  }


  let proxy = new Proxy(object, {
    set(obj, prop, val) {
      obj[prop] = val;
      if (callbacks.get(obj)) {
        if (callbacks.get(obj).get(prop)) {
          for (let callback of callbacks.get(obj).get(prop)) {
            callback();
          }
        }
      }
      return obj[prop];
    },
    get(obj, prop) {
      usedReactivities.push([obj, prop]);
      if (typeof obj[prop] === "object") {
        return reactive(obj[prop]);
      }
      return obj[prop];
    }
  })
  reactivities.set(object, proxy);
  return proxy;
}

po.x = 99


