<script setup>
import { reactive } from 'vue';
import { useDatabaseStore } from '../stores/database';
import { message } from 'ant-design-vue';
import { storeToRefs } from "pinia";
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const formState = reactive({
    name: ''
});

// Recibir el objeto como prop
const props = defineProps({
    urlObject: {
        type: Object,
        default: () => ({ name: '' })
    },
    btnText: {
        type: String,
        default: () => ('Agregar')
    }
});
// Cargar los datos existentes si se proporciona un objeto
const loadData = (obj) => {
    formState.name = obj.name || '';
};

const isEditMode = computed(() => props.urlObject && props.urlObject.id);

// Usar un watcher para detectar cambios en el prop
watch(() => props.urlObject, (newVal) => {
    if (newVal) {
        loadData(newVal);
    }
}, { immediate: true });

const useDatabase = useDatabaseStore();
const { loading } = storeToRefs(useDatabase);


const onFinish = async (value) => {
    if (!isEditMode) {
        await useDatabase.addUrl(value.name);
        message.success("URL Agregada!");
        formState.name = '';
    }
    else {
        value.id = props.urlObject.id;
        await useDatabase.updateUrl(value);
        message.success("URL modificada!");
        router.push('/');
    }
}

</script>

<template>
    <a-form name="addForm" :model="formState" @finish="onFinish">
        <a-form-item name="name" label="Url" :rules="[{
            required: true,
            whitespace: true,
            pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: 'Ingrese una url válida'
        }]">
            <a-input :loading="loading" v-model:value="formState.name"></a-input>
        </a-form-item>
        <a-form-item>
            <a-button type="primary" html-type="submit">{{ btnText }}</a-button>
        </a-form-item>
    </a-form>
</template>
