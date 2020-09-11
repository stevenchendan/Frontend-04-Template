# week2 前端训练营

### Date: Aug 30, 2020

### Topic:

1.寻路问题

2.算法可视化

### Motivation:

1.通过寻路算法来熟悉广度优先搜索算法

---

### Cues

为什么说javascript数组既是一个天然的队列 又是一个天然的栈。

queue是一种先进先出的数据结构 first-in-first-out

![images/Untitled.png](images/Untitled.png)

通常有两种实现queue的方式

- 数组(array)
- 链表(linked list)

这个是一个用javascript实现的queue：

```jsx
class Queue {
  constructor() {
    this.items = []; // 存储数据
  }
  enqueue(item) { // 向队尾添加一个元素
    this.items.push(item);
  }
  dequeue() { // 删除队首的一个元素
    return this.items.shift();
  }
  head() { // 返回队首的元素
    return this.items[0];
  }
  tail() { // 返回队尾的元素
    return this.items[this.items.length - 1];
  }
  size() { // 返回队列的元素
    return this.items.length;
  }
  isEmpty() { // 返回队列是否为空
    return this.items.length === 0;
  }
  clear() { // 清空队列
    this.items = [];
  }
}
```

### Notes

因为会将地图存到一维数组从而减少开销

lession 1:

这个使我们要实现的地图preview

![images/Untitled%201.png](images/Untitled%201.png)

关于地图的实现我们可以使用二维数组去保存，但是这样的话 这个开销就比较大，所以我们给它降维用一维数组去保存它

```jsx
let map = localStorage["map"] ? JSON.parse(localStorage["map"]) : Array(10000).fill(0);
```

the above code is to construct the map

鼠标左键添加 右键删除：

通过addEventListener 来侦测鼠标事件

```jsx
document.addEventListener("mousedown", e => {
	mousedown = true;
	clear = (e.which === 3)
})
document.addEventListener("mouseup", () => mousedown = false);
document.addEventListener("contentmenu". e => e.precentDefault());
```

Lesson 2: 广度优先搜索

寻路问题分析：

![images/Untitled%202.png](images/Untitled%202.png)

我们只考虑上下左右四个点

这道题大家可能会犯得错误是使用递归来解决这个问题

但是这会导致一些问题 比如执行顺序问题 5,6,7可能会在2,3,4前面

被执行那就编程了深度优先搜索，这样就不适合 我们的寻路问题了

我们会使用queue来存储数据

javascript中数组就是一个天然的队列

javascript 数组也是一个天然的栈。

javascript的数组有shift 和 unshift

另外还有push 和 pop方法。

我们对这个数组的用法决定了 它到底是数组还是栈。

Lesson 3:

通过改造增加算法可视化。

我们通过添加async await来帮助我们可视化寻路过程。

但我们需要跑这个程序的时候我们通过

findPath(map, [0, 0], [50, 50]);

来定义地图以及出发点 以及终点, 然后我们就会发现我们的

寻路开始一格一格的找路 暴力破解。

![images/Untitled%203.png](images/Untitled%203.png)

Lesson 4: 处理路径问题

lesson 5: 启发式寻路：

通过判断每个点的优先级 来加速寻路过程。

A* 是一定能找到最优路径的启发式寻路

A 是不一定能找到最优路径的启发式寻路

我们主要要修改是是数据结构将我们的queue换成另外一种数据结构

在我们新的数据结构sorted中：

```jsx
class Sorted {
      constructor(data, compare) {
        this.data = data;
        this.compare = compare || ((a, b) => a - b);
      }
      take() {
        const len = this.data.length;
        if (!len) {
          return;
        }
        let min = this.data[0];
        let minIndex = 0;

        for (let i = 1; i < len; i++) {
          if (this.compare(this.data[i], min) < 0) {
            min = this.data[i];
            minIndex = 1;
          }
        }

        this.data[minIndex] = this.data[len - 1];
        this.data.pop();
        return min;
      }
      give(v) {
        this.data.push(v);
      }
    }
```

我们尽量保证compare的可定制化的能力：

```jsx
constructor(data, compare) {
  this.data = data;
  this.compare = compare || ((a, b) => a - b);
}
```

出于对性能的考虑我们这里没有直接用slice 因为它是O(N).

我们将最后一个放到这里 然后使用pop操作这样能减少复杂度

```jsx
this.data[minIndex] = this.data[len - 1];
this.data.pop();
return min;
```

lesson 6 启发式寻路：

将push和 shift 换成了 take 和 give

![images/Untitled%204.png](images/Untitled%204.png)

我们还可以提升目前的逻辑 这个需要同学们 自己去思考:

主要考虑修改的逻辑在这个读和写的部分。

![images/Untitled%205.png](images/Untitled%205.png)

视频里面用了 sorted:

![images/Untitled%206.png](images/Untitled%206.png)

但是还有更好的数据结构 二叉堆(optional)

这个需要同学们课下自己实现

**Lesson 7: 使用LL算法构建AST（属于编译原理）**

AST全称是抽象语法树。

最著名的语法分析有两种算法 LL算法 另外一种是LR算法

LL就是left left 的意思：就是从左到右扫描，从左到右规约的意思。

**四则运算：**

TokenNumber: 0, 1, 2, 3, 4, 5, 6, 7 ,8 ,9 

Operator: + - * /

whitespace: <SP>

lineTerminator: <LF><CR>

四则运算语法定义：

![images/Untitled%207.png](images/Untitled%207.png)

我们的课程代码：

```jsx
const regexp = /([\d\.]+)|([ \t]+)|([\n\r]+)|(\+)|(\-)|(\*)|(\/)/g
const dictionary = [
  'Number',
  'Whitespace',
  'LineTerminator',
  '+',
  '-',
  '*',
  '/'
]

function tokenize(source) {
  let result = null;
  while (true) {
    result = regexp.exec(source);
    if (!result) {
      break;
    }
    for (let i = 1; i <= dictionary.length; i++) {
      if (result[i]) {
        console.log(dictionary[i - 1]);
      }
    }
    console.log(result);
  }
}

tokenize("1024 + 10 * 25")
```

代码中的reg和dictionary 中的element是一一对应关系，中间都用 | 分开

Lesson 9: 词法分析

我们之前没有一些异常处理相关的代码

我们通过添加lastIndex来看检查我们的匹配出来长度和原来前进的长度是不是一样长

下面是我们更新后的代码：

```jsx
const regexp = /([\d\.]+)|([ \t]+)|([\n\r]+)|(\+)|(\-)|(\*)|(\/)/g
const dictionary = [
  'Number',
  'Whitespace',
  'LineTerminator',
  '+',
  '-',
  '*',
  '/'
]

/**
 * Returns the top N elements from the array.
 *
 * @param source the core logic for LL.
 * @return The first n elemnts from array when sorted with compare.
 */
function tokenize(source) {
  let result = null;
  let lastIndex = 0;
  while (true) {
    lastIndex = regexp.lastIndex;
    result = regexp.exec(source);
    if (!result) {
      break;
    }
    if (regexp.lastIndex - lastIndex > result[0].length) {
      break;
    }

    let token = {
      type: null,
      value: null
    }

    for (let i = 1; i <= dictionary.length; i++) {
      if (result[i]) {
        console.log(dictionary[i - 1]);
      }
    }
    token.value = result[0];
    yield token;
  }
}

// tokenize("1024 + 10 * 25")

for (let token of tokenize("1024 + 10 * 25")) {
  console.log(token);
}
```

如果这个长度超了 就说明里面有我们不认识的字符。我们就需要break。但是error handling 其实更好。我们这里就先不写了。

```jsx
if (regexp.lastIndex - lastIndex > result[0].length) {
  break;
}
```

Lesson 10: LL对应的语法分析

Lesson 11: 使用LL算法构建AST:

AST代表抽象语法树，一周老师主要是想让我们了解下底层的编译原理相关的知识。

我们的词法分析师按照下面这个结构进行构建的。

![images/Untitled%208.png](images/Untitled%208.png)

首先我们写一个复杂的additiveExpression

当面对+-法的时候我们会将他们

```jsx

```

---

