<template>
  <div class="wrapper">
    <van-row type="flex" justify="center">
      <!-- <van-image
        round
        width="40vw"
        height="40vw"
        :src="userInfo.avatar"
        fit="cover"
      /> -->
      <van-image
        round
        width="40vw"
        height="40vw"
        :src="require('@/assets/logo.png')"
        fit="contain"
      />
    </van-row>
    <van-row type="flex" justify="center">
      <p style="margin: 10px">欢迎您,{{ userInfo.name }}</p>
    </van-row>
    <van-row type="flex" justify="center">
      <van-button @click="handleLogOut" style="margin: 10px"
        >退出登录</van-button
      >
    </van-row>
  </div>
</template>

<script >
import $store from "@/store/index";
import $router from "@/router/index";

export default {
  components: {},
  computed: {
    userInfo() {
      return $store.getters["user/info"] || {avatar: 'https://cn.vuejs.org/images/logo.svg', name: 'Lucky'} 
    },
  },
  methods: {
    handleLogOut() {
      $store.dispatch("user/logout");
      $router.replace("/login");
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  padding-top: 150px;
}
</style>
