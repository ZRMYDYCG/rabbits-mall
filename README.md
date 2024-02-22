# vue-rabbit

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### 代码格式模板

```txt
/**
 * 责任人：Array
 * ['曾日闽']
 * **/

/***
 * 组件依赖
 * **/


/***
 * 脚本主体逻辑
 * **/

/***
 * 声明周期钩子
 * **/
```

### 组件封装

封装实例：

![](https://pic.imgdb.cn/item/65d58f619f345e8d03e3b11e.jpg)

核心思路：

把可复用的结构只写一次，把可能发生变化的部分抽象成组件参数（props / 插槽）

实现步骤：

1. 不做任何抽象，准备静态模板

2. 抽象可变的部分
    - 主标题和副标题是纯文本，可以抽象成 prop 传入
    - 主体内容是复杂的模板，可以抽象成插槽传入

### 接口文档

[接口文档](https://www.apifox.cn/apidoc/shared-c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132167)