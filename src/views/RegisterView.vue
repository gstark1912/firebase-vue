<script setup>
import { useUserStore } from "../stores/userStore"
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { message } from "ant-design-vue";

const router = useRouter();

const formState = reactive({});

const useStore = useUserStore();
const { register } = useStore;
const { loadingUser } = storeToRefs(useStore);

const btn_register = async () => {
    const resp = await register(formState.userName, formState.password);
    if (!resp) {
        message.success("Usuario creado!");
        router.push('/');
    }
    else {
        switch (resp) {
            case 'auth/email-already-in-use':
                message.error("El mail ya está en uso");
                break;

            default:
                break;
        }
    }
}

const validateRepeat = async (_rule, value) => {
    if (formState.password !== value)
        return Promise.reject('No coincide che');

    return Promise.resolve();
}

</script>
<template>
    <a-row>
        <a-col :span="8" :offset="8">
            <h2>Register</h2>
        </a-col>
    </a-row>
    <a-row>
        <a-col :span="12" :offset="4">
            <a-form :model="formState" name="basic" @finish="btn_register" layout="vertical">
                <a-form-item label="Usuario" name="userName"
                    :rules="[{ required: true, message: 'Poné un usuario culeao' }]">
                    <a-input v-model:value="formState.userName"></a-input>
                </a-form-item>
                <a-form-item label="Contraseña" name="password"
                    :rules="[{ required: true, message: 'Poné una contraseña de entre 6 y 12 caracteres', max: 12, min: 1 }]">
                    <a-input v-model:value="formState.password"></a-input>
                </a-form-item>
                <a-form-item label="Repetir contraseña" name="repeatPassword"
                    :rules="[{ message: 'No coinciden las contraseñas', validator: validateRepeat }]">
                    <a-input v-model:value="formState.repeatPassword"></a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" :disabled="loadingUser" html-type="submit">Registrar Sesión</a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>

</template>