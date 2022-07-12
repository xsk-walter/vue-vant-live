<template>
  <div class="home">
    <block-loading :loading="blockLoading">
      <p style="text-align: center">vue+vant 移动端快速开发架构(Vue2.0)</p>

      <van-button @click="goList">to list</van-button>
    </block-loading>
  </div>
</template>

<script >
import VueDraggable from 'vuedraggable'
import { formatArrToFormData } from '@/utils'
import $store from '@/store/index'
import $router from '@/router/index'
import $api from '@/api/index'

export default {
  name: 'home',
  components: {
    draggable: VueDraggable,
  },
  data() {
    return {
      value: 50,
      time: 30 * 60 * 60 * 1000,
      blockLoading: false,
    }
  },

  methods: {
    onEndCallback(evt) {
      console.log(evt)
      console.log(this.myArray)
    },
    handleLogOut() {
      $store.dispatch('user/logout')
      $router.replace('/login')
    },
    blockloadingTest() {
      this.blockLoading = true
      setTimeout(() => {
        this.blockLoading = false
      }, 3000)
    },

    goList() {
      this.$router.push('/article/list')
    },
  },
}
</script>
<style lang="scss" scoped>
.home {
  line-height: 80px;
  text-align: center;
  padding: 5px 10px;
}
.logo {
  width: 200px;
  height: 200px;
}
.theme {
  text-align: center;
  color: $common-color;
  margin: 10px 0px;
}
.title {
  font-size: 50px;
  text-align: center;
}
</style>
