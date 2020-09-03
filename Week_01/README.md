# Week 1 前端训练营

### Date: Aug 30, 2020

### Topic:

1. 编程练习tictactoe
2. 红绿灯问题练习

### Motivation:

- 通过实现tictactoe来锻炼编程能力
- 通过
- 提高抽象的能力

---

![Javascript book](https://i.ibb.co/5xrVNs4/javascript.jpg)

如果我来写一本javascript书我会这么设计目录。

---



### Cues

项目结构:

- tictactoe1.html(required)
- main.js(Optional)
- style.css(Optional)

建议通过打断点看看执行过程，方便理解程序逻辑。

![images/Untitled.png](images/Untitled.png)

名字和视频中会有一些出入，个人风格不用在意。

另外这个花括号是一个很好的使用let 的一个小技巧

添加了花括号之后就变成一个局部变量 我们可以给这个win 反复赋值

```jsx
{
	let win = true;
	...
}
```

A good explaination:

[https://stackoverflow.com/questions/37633074/is-it-a-good-practice-to-use-naked-brackets-inside-functions](https://stackoverflow.com/questions/37633074/is-it-a-good-practice-to-use-naked-brackets-inside-functions)

[https://github.com/AQUA-lu/Frontend-04-Template/blob/master/Week_01/2.html](https://github.com/AQUA-lu/Frontend-04-Template/blob/master/Week_01/2.html)

这位同学注释写的很好可以帮助理解。

早年没有async await的时候我们是用

yield 来模拟这样的行为的

有兴趣可以去看看co的一个库是怎么实现的

让事件无线循环下去while true是一个很好的practice

### Notes

TicTacToe规则：

1. 3*3 棋盘
2. 双方分别持有圆圈和叉两种棋子
3. 双方交替落子
4. 率先连成三子的直线的一方获胜

实现思路：

棋盘表示: 二维数组(array)

以及使用两个for 循环在html上面添加我们的棋盘

```jsx
function show() {
  let boardWidth = 3;
  let boardHeight = 3;
  let board = document.getElementById("board");
  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.innerText = 
        pattern[j][i] === 2 ? "❌" :
        pattern[j][i] === 1 ? "⭕️" : "";
      
      cell.addEventListener("click", () => move(j, i));
      board.appendChild(cell);
    }
    board.appendChild(document.createElement("br"));
  }
}
```

以及我们eventlistener 监听事件的move function

 

```jsx
function move(x, y) {
	pattern[y][x] = symbol;
	symbol = 3 - symbol;
	show();
}
```

 上面的 symbol = 3 -  symbol; 稍微有点不好理解其实主要就是我们通过一个小技巧

用来转换颜色。

### 添加判断胜利的function:

这里我们添加了判断横排是不是三个连起来了， 其实竖排的也是几乎同样的代码就是需要[i][j] 换一下位置 变成 [j][i] 就行。

如果这一行或者一列中全都是相同的symbol 我们就判定为win

```jsx
//check columns
  for (let i = 0; i < boardWidth; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] !== symbol) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
```

下面这个逻辑式帮助我们检查斜方向上面有没有 三个颜色连在一起的。

[j][2 - j] 改成 [j][j] 就是另外一个斜的方向。

```jsx
{
    let win = true;
    for(let j = 0; j < boardHeight; j++) {
      if(pattern[j][2 - j] !== symbol) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
```

 添加AI(hard-coded ai)

```jsx
function bestChoice(pattern, symbol) {
  let p;
  if (p = willWin(pattern, symbol)) {
    return {
      point: p,
      result: 1
    }
  }
  let result = -2;
  let point = null;
  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
      if (pattern[i][j]) {
        continue;
      }

      let tempPattern = clone(pattern);
      tempPattern[i][j] = symbol;
      let r = bestChoice(tempPattern, 3 - symbol).result;

      if (-r > result) {
        result = -r;
        point = [j, i];
      }
    }
  }
  return {
    point: point,
    result: point ? result : 0
  }
}
```

这里面有一些理解难度的是这个：

```jsx
if (-r > result) {
  result = -r;
  point = [j, i];
}
```

这一段代码的核心思想是找留给对方最差位置的点的一个思路

最后我们可以在加上computer这样我们就有一个完整的ai了：

```jsx
function computerMove() {
  //get best option
  let bestOption = bestChoice(pattern, symbol);
  if (!!bestOption.point) {
    pattern[bestOption.point[0]][bestOption.point[1]] = symbol;
  }
  //check if there is winner or not
  if (check(pattern, symbol)) {
    winnerExit = true;
    alert(symbol == 2 ? "❌ is winner!" : "⭕️ is winner!");
  }
  symbol = 3 - symbol;
  show();
}
```

其实这个逻辑也不难理解 就是让电脑通过穷举发现收益最大的一步然后move.

## 红绿灯问题

version 1: setTimeout

这个在node.js圈子里面被大家称为call-back hell 回调地狱

```jsx
function go() {
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
```

这里我们主要是通过setTimeout的方式来控制红绿灯的

**promise版本**：

```jsx
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
```

在这个版本里面我们发现我们可以通过promise 来实现红绿灯的切换。

async/await 版本

当我们使用async/await的时候其实底层用的就是promise

```jsx
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
```

最后我们再写一个手动的版本：

```jsx
function happen(element, eventName) {
  return new Promise((resolve, reject) => {
    element.addEventListener(eventName, resolve, {once:true});
  })
}

async function go() {
  if (!!stopProgram) {
    removeLight();
    return;
  }
  while (true) {
    green();
    await happen(document.getElementById("next"), "click");
    yellow();
    await happen(document.getElementById("next"), "click");
    red();
    await happen(document.getElementById("next"), "click");
  }
}
```

这个就是完全听next的

generator 与异步：

- generator 模拟async/await
- async generator

![images/Untitled%201.png](images/Untitled%201.png)

---

**SUMMARY:**   

Next to do(optional)：

- 首先我们可以改进棋盘 建议参考codepen上面一些，比较好的css代码可以节省很多时间
- 另外没有写unit test 这个可以加上
- 引入lint检查javascript规范
- page not responsive
- 写一个五子棋的程序