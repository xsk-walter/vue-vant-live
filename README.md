## 基于 vue-cli4+vant 搭建 H5 通用架子(支持微信公众号)

* 已经上传vue3.0+ts分支
* 如果有优化建议和bug请提issue

### 功能介绍

* 支持 px 自动转 vw(rem暂时废弃) 并且忽略 node_modules 下三方包
* 常用目录别名设置
* 支持 scss 全局样式、变量、函数......
* 支持 gzip 压缩
* 支持本地 mock 模拟数据
* 支持网站标题动态设置
* axios 封装
* cdn 配置加载
* 支持多环境模式
* 内置微信公众号 sdk
* 支持 vant 组件库的按需加载
* 支持 svg 雪碧图
* 本项目已经实现vant-ui自带组件库的自适应, 正常开发直接写750px的设计稿像素

### 安装

```
git clone git@gitee.com:null_639_5368/vue-vant-base.git
```

或者

下载 zip

### 演示

http://null_639_5368.gitee.io/vue-vant-base

### 运行

```
npm install 或者 yarn

npm run dev:mock 模拟数据模式

npm run dev 默认开发模式

npm run build 生产模式
```

### 注意事项


```
// .env.development

// http统一api请求前缀（开发模式下做跨域处理,一般清楚下不用做特殊处理）
VUE_APP_API_PREFIX='/api'

```


```
// .env.production

// 这里修改为网站发布的目录如'./xxx',如果在根目录修改为'/' （如果这里配置不当会找不到路径导致白屏）
VUE_APP_PUBLIC_PATH='/vue-vant-base'

// http统一api请求前缀（生产模式下填后端api地址）
VUE_APP_API_PREFIX='http://wwww.xxx.com/api'
```


```
// draggable 插件使用
<draggable
    tag="van-grid"
    :list="myArray"
    @end="onEndCallback"
    :disabled="false"
    :component-data="{
    props: { 'column-num': 3 },
    }"
>
    <van-grid-item
    v-for="item in myArray"
    :key="item.id"
    icon="photo-o"
    :text="item.name"
    ></van-grid-item>
</draggable>

 myArray: [
    { name: "1号彩笔", id: 1 },
    { name: "2号彩笔", id: 2 },
    { name: "3号彩笔", id: 3 },
    { name: "4号彩笔", id: 4 },
    { name: "5号彩笔", id: 5 },
    { name: "6号彩笔", id: 6 },
],


onEndCallback(evt) {
    console.log(evt);
    console.log(this.myArray);
},
```

```
// svg - iconClass 为文件名称
 <svg-icon iconClass="404"></svg-icon>
```

```
// common.scss
// 声明
$common-color: green;

// 使用
<div class="theme">scss全局变量颜色</div>

.theme {
  color: $common-color;
}
```

```
// 图片上传
async uploadImage() {
    const formData = new FormData();
    formData.append("id", "8888");
    const fileArr = this.fileList.map((item) => item.file);
    // 此方法会改变原数组,console.log(formData)是看不到效果的必须在请求体里面才能看到
    formatArrToFormData(formData, "images", fileArr);
    const result = await $api.test.uploadImage(formData);
    console.log(result);
}
```

```
// 块级组件加载
 <block-loading :loading="blockLoading">
    ...
 </block-loading>
 blockLoading : true、false 控制
```