<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="home">
          <router-link v-if="userStore.userData" to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item key="login">
          <router-link v-if="!userStore.userData" to="/login">Login</router-link>
        </a-menu-item>
        <a-menu-item key="register">
          <router-link v-if="!userStore.userData" to="/register">Register</router-link>
        </a-menu-item>
        <a-menu-item key="logout">
          <a-button type="primary" @click="btn_logOut" v-if="userStore.userData">Logout</a-button>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <router-view></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { useUserStore } from './stores/userStore';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

const selectedKeys = ref([]);
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { logOut } = userStore;

const btn_logOut = async () => {
  await logOut();
  router.push('/login');
}

watch(() => route.name, () => { selectedKeys.value = [route.name] });

</script>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>