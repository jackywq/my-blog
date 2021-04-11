### JS基本数据类型 (7种)

```jsavascript
undefined、number、string、null、boolean、 ES6新增Symbol、BigInt
```

### JS引用类型 (5种)

```
object、Array、function、RegExp、date
```

### 几种判断数据类型的方法

```
typeof、instanceof、Object.prototype.toString.call()
```

>  各自的优缺点

- typeof

  ```
  优点：能够快速区分基本数据类型 
  缺点：不能将Object、Array和Null区分，都返回object
  ```

- instanceof

  ```
  优点：能够区分Array、Object和Function，适合用于判断自定义的类实例对象
  缺点：Number，Boolean，String基本数据类型不能判断
  ```

- Object.prototype.toString.call()

  ```
  优点：精准判断数据类型
  缺点：写法繁琐不容易记，推荐进行封装后使用
  ```



### 对象的深浅拷贝

> 深拷贝、浅拷贝的几种实现方式，简单介绍一下？

- 深拷贝

  ```
  1. JSON.parse(JSON.stringify())
  2. 用递归去复制所有层级属性
  ```

- 浅拷贝

  ```
  Object.assign(target, ...sources)
  ```



### ES6有哪些新特性

```
1. let/const
2. 字符串模板
3. 变量的结构赋值、数组，函数、对象的扩展
4. 箭头函数
5. Promise
6. module语法， export default
7. class的继承 extends
```



### var、let、const区别？

| **区别**           | **var** | **let** | **const** |
| ------------------ | ------- | ------- | --------- |
| 是否有块级作用域   | ×       | ✔️       | ✔️         |
| 是否存在变量提升   | ✔️       | ×       | ×         |
| 是否添加全局属性   | ✔️       | ×       | ×         |
| 能否重复声明变量   | ✔️       | ×       | ×         |
| 是否存在暂时性死区 | ×       | ✔️       | ✔️         |
| 是否必须设置初始值 | ×       | ×       | ✔️         |
| 能否改变指针指向   | x       | ✔️       | ×         |

[掘金 - 参考](https://juejin.cn/post/6940945178899251230#heading-21)



### 问下JS的执行机制？

> js是单线程、还是多线程？

```
单线程
```

> js的执行机制是什么？

```
同步：进行主进程，直接执行；
异步：等同步函数执行完毕，执行异步队列函数
```

- 追问1：如果存在多个异步函数， 如何执行；

  ```
  采用event loop(事件循环机制)，依次轮询执行
  ```

- 追问2：目前JS解决异步方案有哪些？

  ```javascript
  回调函数
  Promise
  async/await
  事件监听
  ```

- 追问3：如果想要这些异步函数同时返回结果，怎么做？

  ```
  Promise.all()
  ```



### 原型与原型链的理解？

**原型对象：** 一个构造函数下面都包含一个prototype原型对象， 可以让所有对象的实例共享它所包含的属性和方法

**原型链：** 当访问一个对象的属性时，该属性找不到 ----> 就会沿着它的原型对象prototype上找 ----> 如果这个原型对象又有自己的原型，就会一直找下去 ----> 直到找到最后一层null为止，这就形成了所谓的原型链；

#### 追问__proto__和prototype到底有什么区别？

1. __proto__被称为“隐式原型”，它是构造函数的实例化对象下面的属性，它的指针指向的是构造函数的原型对象(prototype)
2. prototype被称为“原型对象”，它是构造函数下面的属性



**注意点：**

1. prototype下面constructor属性的指针指向的是其自身构造函数
2. 实例没有prototype属性

所以：

```javascript
    function Person(name) {
        this.name = name;
    }
    Person.prototype.getAge = function() {}

    var p = new Person('hello');
    console.log(p.__proto__); // Person.prototype
    console.log(p.__proto__ === Person.prototype); // true
    console.log(p.__proto__.__proto__); // Object.prototype
    console.log(p.__proto__.__proto__.__proto__); // null
    console.log(p.__proto__.__proto__.__proto__.__proto__); // null后面没有了，报错


    console.log(p.constructor); // Person
    console.log(p.prototype); // undefined, p是构造函数实例，没有prototype属性

    console.log(Person.constructor); // Function 一个空函数
    console.log(Person.prototype); // 打印出Person.prototype这个对象所有方法和属性
    console.log(Person.prototype.constructor); // Person 构造函数原型对象下面的constructor属性，指向的是该构造函数本身
    console.log(Person.prototype.__proto__); // Object.prototype
```

[掘金 - 参考](https://juejin.cn/post/6940945178899251230#heading-72)



### MVC与MVVM的区别？

MVC:  每次更新都要通知controller去触发，所有逻辑都是controller层操作，不利于维护

MVVM：相对于MVC, 实现了view和model层的自动同步，比如vue的双向数据绑定，更加的响应式

[参考](https://www.cnblogs.com/xsg1/p/10535665.html)

------



### 重绘与回流

#####  注意：回流必将引起重绘，重绘不一定会引起回流；

> 重绘

**名词解释：** 节点几何属性或者样式发生改变而不会影响布局的，例如`outline`, `visibility` ,`color`、`background-color`等

`visibility: hidden`只是隐藏元素，但是元素的位置是不变的，所以不会影响布局

**触发重绘：**

- CSS、DOM改动



> 回流

**名词解释：**布局或者几何属性发生改变，影响布局的；

**触发回流：**

- 对DOM节点进行增、删、改
- 屏幕尺寸发生改变
- 一些CSS属性改变



> 如何减少重绘与回流？

- 尽量将一些DOM操作、样式改变合并处理；
- 处理动画时，使用css3硬件加速，比如transform、opacity、filter等，不会引起重绘与回流；



### 提升页面性能的方法有哪些？

```
1. 利用浏览器缓存
2. 使用CDN
3. 使用按需加载，比如图片的懒加载
4. HTTP请求整合，减少请求次数
```



### 什么是同源策略？

```
同源： 协议、域名、端口都要相同，不同就是跨域了
```



### 跨域解决方案有哪些？

1. ##### 基于webpack proxy实现跨域请求 <span style="color: green">【主流】</span>

**原理：** webpack devServer底层是用node作中间件代理，用node实现跨域请求；

**配置：**proxy 设置`changeOrigin: true`

```javascript
// webpack.config.js
devServer: {
  proxy: {
    '/api': {
        target: 'http: xxx.com',
        changeOrigin: true
    }
  }
}

// 功能页面
import "whatwg-fetch";
fetch('/api/list', {
   method: 'GET',
   headers: {
   	'content-type': 'application/json;charset=utf-8',
   }
}).then(res => {})
```



2. ##### 跨域资源共享(CORS)<span style="color: green">【主流】</span>

   1) 服务端设置Access-Control-Allow-Origin（允许跨源)

   2) 如果携带cookie, 前端要设置withCredentials = true

<span style="color: red">局限性：</span>当服务端设置多源情况下，浏览器要保持其安全性，是不允许携带cookie；



3. ##### nginx反向代理<span style="color: green">【主流】</span>

   1) 通过proxy_pass反向代理不同域的域名，实现跨域；



4. ##### jsonp跨域

**方案：** 动态创建script标签，script标签不受同源策略的限制

<span style="color: red">前提条件：</span> 

   1)  在script src后面加入的callback函数，必须是一个全局函数

   2)  服务端支持

<span style="color: red">问题：</span>

   1)  jsonp只能处理GET请求

   2）url可以被劫持，存在安全问题

```
// 客户端
<script src="http://127.0.0.1:3000/list?callback=getData"></script>
<script>
	function getData() {}
</script>

// 服务端 -- 将数据通过JSON.stringify()塞到函数里面
getData('+ JSON.stringify(data) +')
```



5. ##### document.domain + iframe跨域

1) 前提条件：仅限主域相同，子域不同的跨域场景
2) 通过js强制设置document.domain为基础主域，就实现了同域；

6. ##### postMessage跨域

7. ##### websocket跨域

[文档地址](https://segmentfault.com/a/1190000011145364 )

[视频地址](https://www.bilibili.com/video/BV1SE411r7yk?from=search&amp;seid=3174189534851876307)

------



### cookie 与 session 的区别？
- Session 是在服务端保存的一个数据结构，用来跟踪用户的状态，这个数据可以保存在集群、数据库、文件中； 
- Cookie 是客户端保存用户信息的一种机制，用来记录用户的一些信息，也是实现 Session 的一种方式。限制4KB左右

**参考：** [COOKIE和SESSION有什么区别？](https://www.zhihu.com/question/19786827)

- **提问: 如果客户端的浏览器禁用了 Cookie 怎么办？**
  - 一般这种情况下，会使用一种叫做URL重写的技术来进行会话跟踪，即每次HTTP交互，URL后面都会被附加上一个诸如 sid=xxxxx 这样的参数，服务端据此来识别用户。

------



### 闭包的原理？

**闭包定义：** 指有权访问另一个函数作用域中的变量的函数。

**作用：**

- **优点**：利用函数的作用域，让其变量私有化，避免全局变量被污染；

- **缺点**：内部变量无法被回收，造成内存消耗，可能导致内存泄漏；

**实现原理：** 其实是利用了作用域链的特性，我们都知道作用域链就是在当前执行环境下访问某个变量时，如果不存在就一直向外层寻找，最终寻找到最外层也就是全局作用域，这样就形成了一个链条。[知乎参考](https://zhuanlan.zhihu.com/p/106287246)

**应用场景：**

1. 循环给页面多个节点绑定事件   **参考：** [闭包使用场景](https://zhuanlan.zhihu.com/p/87950150)  [视频地址](https://www.bilibili.com/video/BV1YJ411R7ap?p=13)  [掘金](https://juejin.cn/post/6844903939163308046)

```html
<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
</body>
<script>
    var list = document.getElementsByTagName('li')

    for(var i = 0; i < list.length; i++) {
        list[i].onclick = (function(k) {
            return function() {
                alert(k+1)
            }
        })(i)
    }
</script>
```

**如何避免闭包引起的内存泄漏: ** 在退出函数之前，可以使变量赋值为null;

------

### JS变量提升？

1. 变量声明和函数声明都会提升到作用域的顶端

2. 函数声明：如果存在多个同名函数，后面出现的将会覆盖前面的函数声明
3. 变量提升的优先级高于函数

[参考](https://blog.csdn.net/qq_39712029/article/details/80951958)

------



### SSR服务端渲染原理？

**原理：** 将对应的资源转化为HTML字符串形式传递给浏览器，浏览器接收到这段html后不会重新渲染DOM树，只是去做事件绑定，这样就提高首屏加载性能；

**优势：**减少首屏加载时间，有利于SEO检索；

**缺点：**增加服务器的负载；

[参考](https://juejin.im/post/6844904004753817607#heading-3)

------



### require、import区别？

1. 写法的形式不一样, require只能固定的三种方式，import则是五花八门
2. require可以使用动态加载(比如：变量可以用字符串拼接)，import必须是静态编译



### 如何实现图片懒加载?

**回答：**可以将图片src属性设置为data-src, 添加一个滚动事件，根据图片滚动的距离以及可视区域的高度实时计算出图片距离底部的大小，在图片将要滚动到底部时，将data-src替换为src



### 如何实现选中复制功能？

**回答：**主要利用 `Selection API ` 和 `document.execCommand`



### Promise 和 Async/await的区别？

1. promise是ES6, async/await是ES7
2. async/await相对于promise写法更加简洁，避免了代码的嵌套（当处理多个异步时，async/await要比promise代码简洁的多）

[参考](https://www.jianshu.com/p/fd6933ff6b81)



### 为什么0.1+0.2 ! == 0.3，如何让其相等？

**回答：** 

1. 因为实际上计算机是将两个数的二进制相加，而这两个数的二进制都是无限循环的数，所以不会等于0.3，可以使用ES6 `Number.EPSILON` 这个属性，这个属性的作用就是减少一个误差范围。

```javascript
 let isEqual = Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON;
 console.log(isEqual); // true
```



2. 先转成整数相加，然后再除以余数

   ```javascript
       // 1. 通过获取两个数值小数部分的长度 2. 取最大的长度并转化10的幂次方 3. 将小数转化给整数累加后，再除以余数
       function addNum(num1, num2) {
           let sq1, sq2, multiple;
           try {
               sq1 = num1.toString().split(".")[1].length;
           } catch (e) {
               sq1 = 0;
           }
           try {
               sq2 = num2.toString().split(".")[1].length;
           } catch (e) {
               sq2 = 0;
           }
   
           multiple = Math.pow(10, Math.max(sq1, sq2) + 1);
           return (num1 * multiple + num2 * multiple) / multiple;
       }
   
       var total = addNum(0.1, 0.2);
       console.log(total); // 0.3
   ```

   

### 实现一个链式调用方法，并按照设置的等待时间依次打印出想要的结果

**方法一：**

```javascript
// 这里主要是使用浏览器循环执行机制, 将链接调用存放在一个数组队列中，然后利用宏任务执行顺序 (主代码script > setTimeout)，优先执行主代码将function存到队列中， 再执行setTimeout依次去调用    
	class Tool {
      constructor() {
        this.queue = [];
        // 主代码执行完成后，调用next
        setTimeout(() => {
            this.next();
        })
      }

      register(execute, wait) {
        let fn = () => {
          setTimeout(() => {
            execute();  
            this.next();
          }, wait);
        };

        this.queue.push(fn);
        return this;
      }

      next() {
        let fn = this.queue.shift();
        fn && fn();
      }
    }

    const t = new Tool();
    t.register(() => console.log(111111), 1000)
      .register(() => console.log(2222222), 2000)
      .register(() => console.log(3333333), 3000);
```



**方法二：**

```javascript
    class Tool {
        constructor() {
            // 设置一个累计的等待时间, 虽然setTimeout基本上同时执行的，但是可以让第二次累加第一次的时间，依次类推
            this.accWait = 0;
        }
        register(fn, wait) {
            this.accWait = this.accWait + wait;
            setTimeout(fn, this.accWait);
            return this;
        }
    }

    const t = new Tool();
    t.register(() => console.log(111111), 1000)
      .register(() => console.log(2222222), 2000)
      .register(() => console.log(3333333), 3000);
```



### 浏览器事件循环的运行机制？

**事件循环的主要机制：**  任务队列机制，一个事件循环中有一个或者多个任务队列

**任务队列：** 分为宏任务队列和微任务队列

**事件循环的主要执行顺序：**

- 首先会执行主线程里面的代码（主代码块）
- 在当前执行环境下遇到宏任务时，比如setTimeout、setInterval会放到宏任务队列中；
- 遇到微任务，比如Promise会放到微任务队列中；
- 等待当前宏任务队列执行完成后，会立即执行微任务队列里的任务；

- 微任务执行完成后，再执行宏任务队列里的任务；

- 宏任务队列里面存在setTimeout、Promise, 它们会将放在下一次循环任务中去执行；



##### 哪些是宏任务？

- script(主代码)
- setTimeout
- setInterval
- I/O (事件回调阶段 callback)
- UI rendering
- MessageChannel(浏览器)
- requestAnimationFrame(浏览器)
- setImmediate(Node.js 环境)

##### 宏任务的执行顺序？

```javascript
主代码块 > I/O > UI渲染 > requestAnimationFrame > MessageChannel > setTimeout/setInterval
```



##### 哪些是微任务？

- Promise.then
- Object.observe(已废弃)
- MutationObserver(html5新特性)
- process.nextTick(Node.js 环境)
- async(基于promise实现)

##### 微任务的执行顺序？

```
process.nextTick > Promise > MutationOberser
```

[segmentfault - 参考](https://segmentfault.com/a/1190000012646373)

[知乎 - 参考](https://zhuanlan.zhihu.com/p/33058983)





### 浏览器缓存

##### 缓存流程

浏览器里有一个专门存放规则的一个数据库（映射表），把缓存资源信息和磁盘的文件地址对应起来



##### 缓存规则

>  强缓存

**触发条件:**  主要是根据 respsone headers 中  `Cache-Control`  这个值判断的; 当 `Cache-Control：max-age=xxxx`  并且max-age不为0（未过期），执行强缓存。

**Cache-Control 的取值含义：**

- `max-age=xxx` 过期时间（重要）
- `no-cache` 不进行强缓存（重要）

- `no-store` 不强缓存，也不协商缓存

**特性：** 不和服务器进行交互，完全从浏览器缓存数据表中读取，速度非常快





> 协商缓存

**触发条件：** 

1. `Cache-Control：max-age=xxxx` 过期了

2. `Cache-Control：no-cache`  

**特性：** 

1. 需要和服务器进行交互，把用户本地资源的 `ETag` 以及 `Last-Modified` 标识传到服务器进行对比；
2. 资源没有更改，返回304，浏览器读取本地缓存；
3. 资源有更改， 返回200， 从服务器上获取最新资源；
4. 速度比强缓存慢；



**`ETag` 和 `Last-Modified` 的区别？**

**答：** Last-Modified是旧http标准上有的， ETag( md5的一个hash)是http标准上加的，ETag算是Last-Modified的一个补充

![浏览器缓存执行机制图](/Users/wangquan/Downloads/浏览器缓存执行机制图.png)

[掘金 - 参考1](https://juejin.cn/post/6844903763665240072#heading-2)

[掘金 - 参考2](https://juejin.cn/post/6862711686705938445)



### Javascript的编译原理是如何运行的？

1. 通过词法分析将 `字符流` 转换为 `记号流`
2. 通过语法分析生成 `AST抽象语法树` 
3. Javascript引擎按照作用域机制来执行AST代码

[segmentfault - 参考](https://segmentfault.com/a/1190000011858383?utm_source=sf-similar-article)





### 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？

##### Set: 类似数组，成员值都是唯一的，不能重复

1. 有add、delete、clear、has、size等属性方法, 没有键名(key)

```javascript
const set =new Set([1, 2, 3, 4, 1, 2]);

console.log(set.size); // 4

console.log(set.has(1)); // true

// 删除某一个
set.delete(1);
console.log(set.has(1)); // false

// 添加某一个
set.add(5);
console.log(set.has(5)); // true

// 转化为真正的数组
const arr = Array.from(set);
console.log(arr); // [2,3,4,5]

// 清空所有
set.clear();
console.log(set.size); // 0
```

2. Set的实例有四个遍历方法

   - `Set.prototype.keys()`：返回键名的遍历器
   - `Set.prototype.values()`：返回键值的遍历器
   - `Set.prototype.entries()`：返回键值对的遍历器
   - `Set.prototype.forEach()`：使用回调函数遍历每个成员

   ```javascript
   
   let set = new Set(['red', 'green', 'blue']);
   
   for (let item of set.keys()) {
     console.log(item);
   }
   // red
   // green
   // blue
   
   for (let item of set.values()) {
     console.log(item);
   }
   // red
   // green
   // blue
   
   for (let item of set.entries()) {
     console.log(item);
   }
   // ["red", "red"]
   // ["green", "green"]
   // ["blue", "blue"]
   
   
   set.forEach((value, key) => console.log(key + ' : ' + value))
   // red : red
   // green : green
   // blue : blue
   ```

   

3. 函数接受一个数组（或者具有iterable接口的其他数据结构）

   ```javascript
   let set = new Set('123456123456');
   console.log(set); // '123456'
   ```

[Set - 参考](https://es6.ruanyifeng.com/#docs/set-map#Set)

**Set和WeakSet的区别：**

- WeakSet 只能储存对象引用，不能存放值，而 Set 对象都可以存储

---



##### Map: 对json功能增强，key可以是任意类型值

1. 有set、get、delete、has、clear 等方法

```javascript
const m = new Map();

const o = { name: '张三' };

m.set(o, { age: 22 });

console.log(m.size); // 1

console.log(m.get(o)); // { age: 22 }

console.log(m.has(o)); // true

console.log(m.delete(o)); // true

console.log(m.has(o)); // false

m.clear();

console.log(m.size); // 0
```

2. Map有四个遍历方法

- `Map.prototype.keys()`：返回键名的遍历器。
- `Map.prototype.values()`：返回键值的遍历器。
- `Map.prototype.entries()`：返回所有成员的遍历器。
- `Map.prototype.forEach()`：遍历 Map 的所有成员。



**Map和WeakMap的区别：**

- WeakMap的key只能是对象， 而Map的key可以是任意值

[Map - 参考](https://es6.ruanyifeng.com/#docs/set-map#Map)