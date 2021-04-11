### 手写call方法

```javascript
Function.prototype._call = function(context, ...args) {
        //  兼容处理
        context = context || window;
        
        let result;
        /** 
         * @this 指向的是当前调用的函数名
         * @context 传过来的person对象
         * this赋值给context下面的属性, 将this隐式绑定到context这个对象上
        */
        context.fn = this;
        result = context.fn(...args);
        // 设置完成员属性后，将变量回收
        delete context.fn; 
        return result;
    }

    const person = {
        name: 'zhangsan',
        say(age) {
            console.log(`${this.name}的年龄：${age}`)
        }
    }

    person.say._call(person, 22);
```



### 手写bind方法

```javascript
    Function.prototype.myBind = function() {

        // 由于arguments是类数组，不具备数组的一些方法，故使用Array.prototype.slice.call将类数组转为真实数组
        const args = Array.prototype.slice.call(arguments);

        // args的第一个元素其实是bind方法的this, 故通过shift取出第一个元素，并改变原数组
        const first = args.shift();

        // 这里函数的this指向的是fn, 所以需要保留this
        const self = this;

        // 最后返回一个函数，并且使用apply方法调用
        return function() {
            return self.apply(first, args)
        }
    }

    function fn(a, b, c) {
        console.log(this.name);
        console.log('a :>> ', a);
        console.log('b :>> ', b);
        console.log('c :>> ', c);
    }

    fn.myBind({ name: '张三' }, 1, 2, 3)()
```



### 手写New方法

```javascript
function father(name){
    this.name = name;
    this.sayname = function(){
        console.log(this.name)
    }
    // return { name: '张三' }
}

function myNew(ctx, ...args){ // ...args为ES6展开符,也可以使用arguments
    // 先用Object创建一个空的对象
    let obj = new Object();

    // 这块使用了隐式绑定，ctx.prototype是一个函数，obj.__proto__的this隐式绑定到ctx.prototype最近的一个对象上，也就是ctx
    // 所以obj就具备father一些属性和方法
    obj.__proto__ = ctx.prototype;

    // 使用apply方法去调用father函数
    let res = ctx.apply(obj, args);

    // [兼容处理] 判断函数返回值如果是null或者undefined则返回obj, 否则就返回res
    // 1. father函数return的是一个object, 就返回res  2. father函数不return任何值(undefined), 就返回obj
    return res instanceof Object ? res : obj;
}

    var son = myNew(father, 'kimi')
    son.sayname();
    // console.log('son.name :>> ', son.name);
```



### 手写Promise方法

```javascript
function SPromise(execute) {
    this.status = 'pending';
    this.successCallback = function() {}
    this.failCallback = function() {}
    execute(this.resolve.bind(this), this.reject.bind(this));
}

SPromise.prototype.resolve = function(res) {
    if (this.status === 'pending') {
        this.status = 'success';
        this.successCallback(res);
    }
}

SPromise.prototype.reject = function(err) {
    if (this.status === 'pending') {
        this.status = 'fail';
        this.failCallback(err);
    }
}

SPromise.prototype.then = function(success, fail) {
    this.successCallback = success;
    this.failCallback = fail;
}

const s = new SPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    }, 1000)
}).then((res) => {
    console.log('resolve :>> ', res);
}, (err) => {
    console.log('err :>> ', err);
})
```



### 实现一个深拷贝

```javascript

function deepClone(data){
    //判断参数是不是一个对象
    let store = Array.isArray(data) ? [] : {};

    if (data && typeof data === "object") {
        for (key in data) {
            //判断data子元素是否为对象，如果是，递归复制
            if (data[key] && typeof data[key] === "object") {
                store[key] = deepClone(data[key]);
            } else {
                //如果不是，简单复制
                store[key] = data[key];
            }
        }
    }
    return store;
}    

var obj1 ={
    x:1,
    y:2,
    z: {
        a: 3,
        b: 4
    }
};


var obj2 = deepClone(obj1);
obj1.z.a = 5;
obj1.x = 3;
console.log(obj1);
console.log(obj2);

var arr1 = [1, 2, 3, 4];
var arr2 = deepClone(arr1);
arr1[0] = 5;
console.log(arr1);
console.log(arr2);
```



### 实现一个防抖函数

```javascript
<body>
    <div id="container"></div>
</body>
<script>
// fn 是需要防抖处理的函数
// wait 是时间间隔
function debounce(fn, wait = 50) {
    // 通过闭包缓存一个定时器 id
    let timer = null
    // 将 debounce 处理结果当作函数返回
    // 触发事件回调时执行这个返回函数
    return function(...args) {
      	// 如果已经设定过定时器就清空上一次的定时器
        if (timer) clearTimeout(timer)
      
      	// 开始设定一个新的定时器，定时器结束后执行传入的函数 fn
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

// DEMO
// 执行 debounce 函数返回新函数
const betterFn = debounce(() => console.log('fn 防抖执行了'), 1000)
// 停止滑动 1 秒后执行函数 () => console.log('fn 防抖执行了')
document.addEventListener('scroll', betterFn)

window.onload = function() {
    let num = 80;
    const dom = document.getElementById('container');
    for(let i = 0; i < num; i+=1) {
        const ele = document.createElement('div');
        ele.style.width = '100px';
        ele.style.height = '20px';
        ele.style.marginBottom = '10px';
        ele.style.backgroundColor = i%2 === 0 ? 'red' : 'skyBlue';
        dom.appendChild(ele);
    }
}
</script>
```



### ES5实现原型继承

```javascript
// 父类
function Super(name, age) {
    this.name = name;
    this.age = age;
}

Super.prototype.sayAge = function() {
    console.log(`${this.name}的年龄：${this.age}`);
}

// 子类
function Sub(name, age) {
    // 调用父类自身属性
    Super.call(this, name, age);
}

// 通过Object.create方法重新创建一个对象，等于重新创建一个内存地址给prototype, 避免包含引用类型的原型
Sub.prototype = Object.create(Super.prototype);

const s = new Sub('张三', 20);
s.sayAge();
```



### 简单手写vue双向数据绑定？

```javascript
// js
let obj = {};
Object.defineProperty(obj, 'txt', {
		get() {
			return obj;
		},
		set(newValue) {
			document.getElementById('txt').value = newValue;
			document.getElementById('model-txt').innerHTML = newValue;
		}
})

document.addEventListener('input', function(e) {
	 obj.txt = e.target.value;
})

// html
<div id="app">
	<input type="text" id="txt" name="txt" />
	<p id="model-txt"></p>
</div>
```

