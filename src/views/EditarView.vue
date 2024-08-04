<template>
    <h1>
        Editar
    </h1>
    <add-form v-if="url.id" :url-object="url" :btn-text="'Editar'"></add-form>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database';
import { onMounted, reactive } from 'vue';

const route = useRoute();
const id = route.params.id;

const useDatabase = useDatabaseStore();
const { getUrl } = useDatabase;

const url = reactive({
    name: ''
});


onMounted(async () => {
    const doc = await getUrl(id);
    url.name = doc.name;
    url.short = doc.short;
    url.id = id;
});

</script>