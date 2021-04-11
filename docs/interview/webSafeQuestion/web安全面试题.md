## XSS攻击（跨站脚本攻击）

**攻击类型：**

>  存储型 XSS -- 【服务端安全漏洞】

**攻击原理：**攻击者在页面上插入XSS代码 -----> 服务端将数据存入数据库中 -----> 当用户访问到存在XSS漏洞的页面时，服务端从数据库中取出数据展示到页面上，导致XSS代码执行，达到攻击效果



>  反射型 XSS -- 【服务端安全漏洞】

**攻击原理：** 攻击者在URL上插入XSS代码 -----> 服务端接收URL上XSS代码 -----> 再将代码输出到页面上  -----> 用户打开后受到XSS攻击



- 反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。

**例子：**比如输入框搜索, 用户在url输入`https://aaa.com?name=<script>{alert('111')}</script>`, 将url后面的XSS的脚本当作参数传给服务端，服务端再将参数塞入到数据中一并返给页面



>  DOM型 XSS -- 【前端安全漏洞, 不和服务端交互】

**攻击原理：**攻击者在URL中插入XSS代码 -----> 用户直接从URL获取XSS代码输出到页面上, 导致XSS代码执行

 

#### XSS 攻击有两大要素：

> 攻击者提交恶意代码。

<span style="color: green; font-weight: bold">解决方案：</span>

1. 输入内容长度控制，增加XSS攻击的难度。

2. HTML转义、禁止以 javascript: 开头的链接。

   

> 浏览器执行恶意代码。

<span style="color: green; font-weight: bold">解决方案：</span>

1. `Httponly`这个属性可以防止XSS,它会禁止javascript脚本来访问cookie。
2. 设置验证码，防止攻击者模拟用户登陆。
3. 浏览器引入了` same-site ` 来限制第三方cookie, 提高安全性
4. 浏览器在http响应头设定CSP(内容安全策略)规则，只能加载白名单里面的资源，从而减少XSS攻击风险

参考1: [：如何防止XSS攻击？美团技术团队](https://www.cnblogs.com/meituantech/p/9718677.html) 

参考2：[前端面试与进阶指南](https://www.cxymsg.com/guide/security.html#%E5%85%B6%E4%BB%96-xss-%E9%98%B2%E8%8C%83%E6%8E%AA%E6%96%BD)

------




## CSRF攻击（跨站请求伪造）

**攻击步骤：** 

1. 受害者登录 `a.com`, 并保留了cookie登录信息
2. 攻击者诱导受害者访问 `b.com`，并携带cookie信息向`a.com`发送伪造请求，比如一些form表单提交

3. 绕过验证，执行一些特定的操作

<span style="color: green; font-weight: bold">解决方案：</span>

1. 使用 `sameSite` 进行同源检测，直接禁止不信任的外域；
2.  加入一个随机的 token, 每次请求必须要将token带上，服务器验证token是否有效；
3. 双重Cookie验证
4. 验证 `Http Referer` 属性，确定来源域名，进行相应的禁止；

参考：[前端面试与进阶指南](https://www.cxymsg.com/guide/security.html#%E5%A6%82%E4%BD%95%E9%A2%84%E9%98%B2csrf)

