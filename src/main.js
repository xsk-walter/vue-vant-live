import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


// 初始化样式
import "@/assets/css/reset.css";

// rem 适配js
// import 'amfe-flexible'

// 设置html根字体大小
import "@/assets/css/font-html.css";

// 导入vant css
import "vant/lib/index.less";

// 路由权限拦截
import "./router/permission";

// 初始化svg图标
import "./icons/index";

import http from '@/utils/request'
Vue.prototype.$http = http

// mock模式
if (process.env.VUE_APP_MODE == "mock") {
  require("../mock");
  console.log("本地mock数据已导入");
}

// 注册自定义全局组件
import components from "./utils/components";

// 注册全局插件
import plugins from "./utils/plugins";

Vue.use(plugins).use(components);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");