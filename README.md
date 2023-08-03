#### React KeepAlive 方案

- 非标准的组件缓存，只是数据缓存

  A 跳转到 B 时，将 A 中的数据或虚拟 DOM 存储到 redux 中，A 组件释放销毁，B 组件加载，当从 B 回到 A 时，A 开始加载，判断 redux 中有无对应的数据或虚拟 DOM，没有就正常渲染，有的话就拿来渲染

- 修改路由机制，指定某些组件在路由跳转时不触发销毁，只是通过 display 属性控制其隐藏，后期跳转回来的时候，再通过 display 属性控制其显示

- [通过改变组件层级和 DOM 操作，保证组件不会被销毁](https://juejin.cn/post/6844903942522929160)

  由于 `React` 会卸载掉处于固有组件层级内的组件，所以需要将 `<KeepAlive>` 中的组件，也就是其 `children` 属性抽取出来，渲染到一个不会被卸载的组件 `<Keeper>` 内，再使用 `DOM` 操作将 `<Keeper>` 内的真实内容移入对应 `<KeepAlive>`，就可以实现[此功能](https://www.npmjs.com/package/react-activation)
