<script setup>
import { useUserStore } from "../stores/userStore"
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { message } from "ant-design-vue";

const router = useRouter();

const formState = ref({});

const useStore = useUserStore();
const { signIn } = useStore;
const { loadingUser } = storeToRefs(useStore);

const btn_login = async () => {
    const resp = await signIn(formState.value.userName, formState.value.password);
    if (!resp) {
        message.success("Bienvenido de nuevo!");
        router.push('/');
    }
    else
        switch (resp) {
            case 'auth/invalid-email':
            case 'auth/user-not-found':
            case 'auth/invalid-credential':
                message.error("No se encontró el usuario");
                break;
            default:
                message.error("Algo falló en firebase");
                break;
        }
}
</script>

<template>
    <a-row>
        <a-col :span="8" :offset="8">
            <h2>Login</h2>
        </a-col>
    </a-row>
    {{ loadingUser }}
    <a-row>
        <a-col :span="12" :offset="4">
            <a-form :model="formState" name="basic" @finish="btn_login" layout="vertical">
                <a-form-item label="Usuario" name="userName"
                    :rules="[{ required: true, message: 'Poné un usuario culeao' }]">
                    <a-input v-model:value="formState.userName">
                    </a-input>
                </a-form-item>
                <a-form-item label="Contraseña" name="password"
                    :rules="[{ required: true, message: 'Poné password culeao' }]">
                    <a-input-password v-model:value="formState.password" type="password">
                    </a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button :loading="loadingUser" type="primary" :disabled="loadingUser" html-type="submit">Iniciar
                        Sesión</a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>
