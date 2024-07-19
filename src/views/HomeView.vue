<script setup>
import { useUserStore } from "../stores/userStore"

const useStore = useUserStore();
const { userData } = useStore;

</script>

<template>
    <div>
        <h2>Home</h2>
        <p v-if="userData?.email">Hello {{ userData.email }}</p>
    </div>
</template>