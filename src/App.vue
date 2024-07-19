<template>
  <div>
    <h1>App</h1>
    <nav>
      <router-link v-if="userStore.userData" to="/">Home</router-link>
      <router-link v-if="!userStore.userData" to="/login">Login</router-link>
      <router-link v-if="!userStore.userData" to="/register">Register</router-link>
      <button @click="btn_logOut" v-if="userStore.userData">Logout</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useUserStore } from './stores/userStore';
import { useRouter } from 'vue-router';

const route = useRouter();
const userStore = useUserStore();
const { logOut } = userStore;

const btn_logOut = async () => {
  await logOut();
  route.push('/login');
}

</script>

<style lang="scss" scoped></style>