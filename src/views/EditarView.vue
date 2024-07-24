<template>
    <h1>
        Editar
    </h1>
    <form v-if="url">
        <p>Id {{ url.id }}</p>
        <p>Short {{ url.short }}</p>
        <form @submit.prevent="handleSubmit()">
            <input type="text" v-model="url.name">
            <button type="submit">Editar</button>
        </form>
    </form>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useDatabaseStore } from '../stores/database';
import { onMounted } from 'vue';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
console.log(id);

const useDatabase = useDatabaseStore();
const { getUrl, updateUrl } = useDatabase;

const url = ref(null);

onMounted(async () => {
    const doc = await getUrl(id);
    url.value = doc;
    url.value.id = id;
});

const handleSubmit = async () => {
    await updateUrl(url.value);
    router.push('/');
}

</script>