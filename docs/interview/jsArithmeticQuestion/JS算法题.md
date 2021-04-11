### 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

**问题描述：** 

```javascript
已知如下数组：

var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
```



**方法一 (遍历递归) ：**

```javascript
    const arr = [
        [1, 2, 2],
        [3, 4, 5, 5],
        [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
    ];

    console.log(flatDataAndSort(arr));
    function flatDataAndSort(data) {
        let arr = [];
        recusive(data);
        function recusive(data) {
            data.forEach(item => {
                if (Array.isArray(item) && item.length) {
                    recusive(item);
                } else {
                    arr.push(item);
                }
            })
        }

        const sortArr = arr.sort((a, b) => a - b);
        return [...new Set(sortArr)];
    }
```



**方法二 (flat) :**

```javascript
    const arr = [
        [1, 2, 2],
        [3, 4, 5, 5],
        [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
    ];

    console.log(flatDataAndSort(arr));
    function flatDataAndSort(data) {
        const sortArr = arr.flat(4).sort((a, b) => a - b);
        return [...new Set(sortArr)];
    }
```

