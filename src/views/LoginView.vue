<script setup>
import { useUserStore } from "../stores/userStore"
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const router = useRouter();

const userName = ref('');
const password = ref('');

const useStore = useUserStore();
const { signIn } = useStore;
const { loadingUser } = storeToRefs(useStore);

const btn_login = async () => {
    if (!userName.value || password.value.length < 6)
        alert("algo anda mal");
    await signIn(userName.value, password.value);
    router.push('/');
}
</script>

<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="btn_login">
            <div>
                <label for="userName">Usuario:</label>
                <input id="userName" v-model="userName" type="text" required />
            </div>
            <div>
                <label for="password">Contraseña:</label>
                <input id="password" v-model="password" type="password" required />
            </div>
            <button type="submit" :disabled="loadingUser">Iniciar Sesión</button>
        </form>
    </div>
</template>
