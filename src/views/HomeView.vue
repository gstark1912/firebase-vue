<script setup>
import { useUserStore } from "../stores/userStore"
import { useDatabaseStore } from "../stores/database";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const useStore = useUserStore();
const useDatabase = useDatabaseStore();
const { userData } = useStore;
const { documents, loadingDoc } = storeToRefs(useDatabase);

onMounted(() => {
    useDatabase.getUrls();
})

const deleteUrl = async (id) => {
    await useDatabase.deleteUrl(id);
}
const router = useRouter();
const editUrl = async (id) => {
    router.push(`/edit/${id}`);
}

</script>

<template>
    <div>
        <h2>Home</h2>
        <p v-if="userData?.email">Hello {{ userData.email }}</p>
        <add-form></add-form>
        <p v-if="loadingDoc">Loading docs</p>
        <div v-else="documents">
            <h3>Tus urls son</h3>

            <a-space direction="vertical" style="width: 100%;">
                <a-card v-for=" d in documents" :key="d.id" :title="d.short" style="width: 100%;">
                    <template #extra>
                        <a-space>
                            <a-popconfirm title="Seguro de eliminar?" ok-text="Si 👀" cancel-text="No 🤔"
                                @confirm="deleteUrl(d.id)">
                                <a-button danger>Eliminar</a-button>
                            </a-popconfirm>
                            <a-button type="primary" @click="editUrl(d.id)">Editar</a-button>
                        </a-space>
                    </template>
                    <p>{{ d.name }}</p>
                </a-card>
            </a-space>
        </div>
    </div>
</template>