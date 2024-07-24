<script setup>
import { useUserStore } from "../stores/userStore"
import { useDatabaseStore } from "../stores/database";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const useStore = useUserStore();
const useDatabase = useDatabaseStore();
const { userData } = useStore;
const { documents, loadingDoc } = storeToRefs(useDatabase);

onMounted(() => {
    useDatabase.getUrls();
})

const url = ref("");
const handleSubmit = async () => {
    await useDatabase.addUrl(url.value);
}
const deleteUrl = async (id) => {
    await useDatabase.deleteUrl(id);
}

</script>

<template>
    <div>
        <h2>Home</h2>
        <p v-if="userData?.email">Hello {{ userData.email }}</p>
        <p v-if="loadingDoc">Loading docs</p>
        <div v-else="documents">
            <form @submit.prevent="handleSubmit()">
                <input type="text" placeholder="Ingresa una url" v-model="url">
                <button type="submit">Submit</button>
            </form>
            <h3>Tus urls son</h3>
            <ul>
                <li v-for="d in documents" :key="d.id">
                    <p>{{ d.id }}</p>
                    <p>{{ d.name }}</p>
                    <p>{{ d.short }}</p>
                    <router-link :to="`/edit/${d.id}`">Editar</router-link>
                    <button @click=" deleteUrl(d.id)">X</button>
                </li>
            </ul>
        </div>
    </div>
</template>