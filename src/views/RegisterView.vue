<script setup>
import { useUserStore } from "../stores/userStore"
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const router = useRouter();

const userName = ref('');
const password = ref('');

const useStore = useUserStore();
const { register } = useStore;
const { loadingUser } = storeToRefs(useStore);

const btn_register = async () => {
    if (!userName.value || password.value.length < 6)
        return alert("Mal ahi man");
    await register(userName.value, password.value);
    router.push('/');
}

</script>
<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent='btn_register'>
            <div>
                <label for="username">Usuario:</label>
                <input id="username" v-model="userName" type="text" required />
            </div>
            <div>
                <label for="password">Contraseña:</label>
                <input id="password" v-model="password" type="password" required />
            </div>
            <button type="submit" :disabled="loadingUser">Registrar</button>
        </form>
    </div>
</template>