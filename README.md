# second-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


#  hot-reload 无法跨容器通信。
# 解决方案：先把容器内部的 3213 端口映射到宿主机，
# 然后 package.json 里面的 "browserify-hmr" 改成 
# “[ browserify-hmr -h '0.0.0.0' -u 'http://t.cn/RtXWpm9 ]” 注意这坑爹玩意外面必须套方括号
