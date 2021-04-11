## react的生命周期有哪些？

> Mount

- constructor()
- render()
- componentDidMount()

> update

- getDerivedStateFromPorps()
- shouldComponentUpdate()
- getSnapshotBeforeUpdate()
- render()
- componentDidupdate()

> Unmount

- componentWillUnmount()

### react的性能优化，减少render次数？

```
stateless函数组件: React.memo
class组件: PureComponent, shouldComponentUpdate()
```



## 为什么选择使用框架而不是原生?

#### 框架的好处:

1. **组件化:** 其中以 React 的组件化最为彻底,甚至可以到函数级别的原子组件,高度的组件化可以是我们的工程易于维护、易于组合拓展。
2. **天然分层:** JQuery 时代的代码大部分情况下都是耦合严重, 现代框架不管是 MVC、MVP还是MVVM 模式都能帮助我们进行分层，代码解耦更易于读写。
3. **生态:** 现在主流前端框架都自带生态,不管是数据流管理架构还是 UI 库都有成熟的解决方案。
4. **开发效率:** 现代前端框架都默认自动更新DOM,而非我们手动操作,解放了开发者的手动DOM成本,提高开发效率,从根本上解决了UI 与状态同步问题.



## 虚拟DOM的优劣如何?

[参考](https://juejin.im/post/6844903922453200904)

#### 优点：

1. **保证性能下限:** 虚拟DOM可以经过diff找出最小差异,然后批量进行patch,这种操作虽然比不上手动优化,但是比起粗暴的DOM操作性能要好很多,因此虚拟DOM可以保证性能下限
2. **无需手动操作DOM:** 虚拟DOM的diff和patch都是在一次更新中自动进行的,我们无需手动操作DOM,极大提高开发效率
3. **跨平台:** 虚拟DOM本质上是JavaScript对象,而DOM与平台强相关,相比之下虚拟DOM可以进行更方便地跨平台操作,例如服务器渲染、移动端开发等等

#### 缺点：
- **无法进行极致优化:** 在一些性能要求极高的应用中虚拟DOM无法进行针对性的极致优化



## setState到底是异步还是同步?

**答案： 有时表现出异步,有时表现出同步**

1. `setState`只在合成事件和钩子函数中是“异步”的，在原生事件和`setTimeout` 中都是同步的。

2. `setState`的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参`setState(partialState,callback)`中的callback拿到更新后的结果。

```javascript
 // 值未更新
constuctor() {
    this.state={
        value: 0
    }
}
componentDidMount() {
    this.setState({ value: this.state.value + 1});
    console.log(this.state.value); // 0
}

// 值更新了
componentDidMount() {
    setTimeout(() => {
        this.setState({ value: this.state.value + 1});
        console.log(this.state.value); // 1
    })
}

```



## React组件通信如何实现?

1. props父子组件传值;
2. 通过Context实现跨层级通信；
3. 可以借助Redux或者Mobx等全局状态管理工具维护一个全局的store;



## React中的keys有什么作用？

[参考](https://segmentfault.com/a/1190000016885832?utm_source=tag-newest)

1. 保证在同级元素中的唯一性
2. 在React diff算法中，会根据key值来判断当前元素有没有被修改、删除、移动等，从而减少不必要的元素渲染



## 调用 setState 之后发生了什么？

1. react会将传入的参数与当前的状态合并
2. 会根据最新的状态构建元素树
3. 通过react diff算法计算每个元素节点差异，并对界面进行最小化渲染



## 为什么虚拟 dom 会提高性能?（必考）

1. 虚拟dom其实是一个javascript的对象树；
2. 相当于js和真实dom之间加了个缓存，利用diff算法比较新、旧树，将差异化的节点重新渲染到页面上，从而提高性能



## react diff 原理（常考，大厂必考）

[参考](https://www.jianshu.com/p/3ba0822018cf)

react diff算法是在传统的diff算法上进行了优化，降低了算法的复杂度

- Tree diff（树节点的比较）: 
  - 跨层级的节点比较少，(比如同一个组件同时给父组件以及祖先组件使用)只有创建与销毁
  - 只对同一层级节点比较，遍历一次，如果该节点不存在，则该节点和其所有子节点会被完全删除，不会再进一步比较;
  - 如果节点存在，则走下一步：
- Component diff (组件节点的比较): 
  - 不同类型的组件，直接替换整个组件的所有节点
  - 相同类型的组件，继续比较下去,  进行下一步：
- element diff (元素节点的比较 -- 会根据唯一的key进行区分)：
  - 对新增的节点进行插入
  - 对不存在的节点进行删除
  - 对位置发生改变的节点进行移动



## redux的工作流？

**简介：** 首先redux是一个单向数据流框架，主要是为了解决组件间状态共享问题

**核心：** redux主要有action、store、reducer这三个核心文件；

**工作流：**
1. action主要作用是将视图层或者接口的数据通过dispatch方式传给reducer
2. reducer是一个纯函数，它会根据type来存储数据并将最新的state数据传递给store
3. store是一个状态树，它通过connect方法将数据分发给要接收的视图层

------



### react fiber原理？

**解决问题：**解决主线程长时间被占用的问题，导致页面卡顿

**原理：**通过window.requestIdleCallback()将可中断的任务进行分片处理，执行完后将控制权交给浏览器  -----> 将tree结构转成链表结构 ------> 通过createElement将虚拟DOM转化成真实DOM 

---



### react在16.4以后的版本为什么会移除componentWillMount、componentWillReceiveProps、componentWillUpdate这三个生命周期？

**原因：**被废弃的三个函数都是在render之前，因为fiber的出现，很可能因为高优先级任务的出现打断现有任务导致它们被执行多次

[参考](https://zhuanlan.zhihu.com/p/38030418)



### React父子组件生命周期执行顺序总结:

>  父子组件第一次渲染加载时，执行顺序为：

**问：** 为什么父组件的componentDidMount晚于子组件componentDidMount执行?

**答：** 因为父组件的componentDidMount方法的含义就是等所有子节点都挂载上才被执行

- Parent 组件： constructor()

- Parent 组件： getDerivedStateFromProps()

- Parent 组件： render()

- Child 组件： constructor()

- Child 组件： getDerivedStateFromProps()

- Child 组件： render()

- Child 组件： componentDidMount()

- Parent 组件： componentDidMount()



> 卸载子组件，执行顺序为：

**问：** 为什么父组件的componentDidUpdate方法在最后执行?

**答：** 因为componentDidUpdate方法的含义就是等其所有子节点都更新后才被执行

- Parent 组件： getDerivedStateFromProps()

- Parent 组件： shouldComponentUpdate()

- Parent 组件： render()

- Parent 组件： getSnapshotBeforeUpdate()

- Child 组件： componentWillUnmount()

- Parent 组件： componentDidUpdate()

