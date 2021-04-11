

### Div元素水平垂直居中

##### 1. postion绝对定位 + margin负值法 

>  前提: 需要知道子元素的宽高

```css
    <style>
        * { 
            margin:0; 
            padding:0;
        }
        .parent {
            width: 1000px;
            height: 100vh;
            border: 1px solid red;
            box-sizing: border-box;
            position: relative;
        }
        .son  {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300px;
            height: 200px;
            margin-left: -150px;
            margin-top: -100px;
            background-color: yellow;
        }
    </style>
    <div class="parent">
        <div class="son"></div>
    </div>
```
##### 2. postion绝对定位 + translate平移法

> 利用transform: translate(-50%, -50%); 自动获取子元素的宽高比例一半，往中心位置平移，不需要知道子元素的宽高

```css
  <style>
        * { 
            margin:0; 
            padding:0;
        }
        .parent {
            width: 1000px;
            height: 100vh;
            border: 1px solid red;
            box-sizing: border-box;
            position: relative;
        }
        .son  {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 300px;
            height: 200px;
            transform: translate(-50%, -50%);
            background-color: yellow;
        }
    </style>
    <div class="parent">
        <div class="son"></div>
    </div>
```

##### 3.  flex布局

```css
<style>
        * { 
            margin:0; 
            padding:0;
        }
        .parent {
            width: 1000px;
            height: 100vh;
            border: 1px solid red;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .son  {
            width: 300px;
            height: 200px;
            background-color: yellow;
        }
    </style>
    <div class="parent">
        <div class="son"></div>
    </div>
```

##### margin: auto居中法

```css
<style>
        * { 
            margin:0; 
            padding:0;
        }
        .parent {
            width: 1000px;
            height: 100vh;
            border: 1px solid red;
            box-sizing: border-box;
            position: relative;
        }
        .son  {
            width: 300px;
            height: 200px;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            background-color: yellow;
        }
    </style>
    <div class="parent">
        <div class="son"></div>
    </div>
```

---

### 文本水平垂直居中

##### table-cell + vertical-align + text-align 多行文本居中法

```css
<style>
        * { 
            margin:0; 
            padding:0;
        }
        .container {
            width: 500px;
            height: 500px;
            border: 1px solid red;
            box-sizing: border-box;
            display: table-cell;
            text-align: center;
            vertical-align: middle;
        }
        
    </style>
    <div class="container">
        哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
    </div>
```
##### text-align + line-height 单行文本居中法

```css
    <style>
        * { 
            margin:0; 
            padding:0;
        }
        .container {
            width: 500px;
            height: 500px;
            border: 1px solid red;
            box-sizing: border-box;
            text-align: center;
            line-height: 500px;
        }
        
    </style>
    <div class="container">
        哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
    </div>
```



### visibility:hidden, opacity:0，display:none三者区别
opacity:0 不改变页面布局，绑定元素事件也会触发；

visibility:hidden 不改变页面布局，绑定元素事件不会触发；

display: none 改变页面布局，该元素直接被删除，绑定元素事件不会触发；

### BFC指的是什么？
- 指的是块级格式化上下文, BFC可以看作是被隔离的独立容器，不会在布局中影响到外边的元素

> 触发的条件
- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cell、flex，table-caption
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

> 应用

防止两个相邻元素margin重复

```javascript
<style type="text/css">
    .container {
        overflow: hidden;
    }
    p {
        width: 100px;
        height: 100px;
        background: red;
        margin: 100px;
    }
</style>
    
<body>
    <div class="container">
        <p></p>
    </div>
    <div class="container">
        <p></p>
    </div>
</body>
```

[BFC - 知乎](https://zhuanlan.zhihu.com/p/25321647)

### 伪类、伪元素的区别？
> 区别
- 伪元素：创建了新元素

- 伪类：通过元素选择器可以实现

  

### flex: 1 到底代表了什么？

flex是定义子项分配的剩余空间，flex: 1相当于平均分配元素；是flex-grow, flex-shrink 与 flex-basis的一种简写形式；

