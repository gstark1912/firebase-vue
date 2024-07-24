import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue';
import { db } from '../configs/firebase';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { auth } from '../configs/firebase';
import { nanoid } from 'nanoid/non-secure';

export const useDatabaseStore = defineStore('database', () => {

    const documents = ref([]);
    const loadingDoc = ref(false);

    const getUrls = async () => {
        if (documents.value.length !== 0)
            return;

        loadingDoc.value = true;
        try {
            const q = query(collection(db, "urls"), where("user", "==", auth.currentUser.uid));
            const querySnapshot = await getDocs(q);
            documents.value = [];
            querySnapshot.forEach((doc) => {
                documents.value.push({
                    id: doc.id,
                    ...doc.data()
                });
            })
            console.log(documents.value);
        } catch (error) {
            console.log(error);
        } finally {
            loadingDoc.value = false;
        }
    }


    const reset = () => {
        documents.value = [];
    }

    const addUrl = async (name) => {
        try {
            const obj = {
                name,
                short: nanoid(6),
                user: auth.currentUser.uid
            };
            const docRef = await addDoc(collection(db, "urls"), obj);
            console.log(docRef);
        } catch (error) {
            console.log(error);
        } finally {
            documents.value = [];
            getUrls();
        }
    }

    const deleteUrl = async (id) => {
        try {
            const docRef = await deleteDoc(doc(db, "urls", id));
            console.log(docRef);
        } catch (error) {
            console.log(error);
        } finally {
            documents.value = [];
            getUrls();
        }
    }

    const getUrl = async (id) => {
        try {
            const docRef = await getDoc(doc(db, "urls", id));
            return docRef.data();
        } catch (error) {
            console.log(error);
        } finally {

        }
    }

    const updateUrl = async (url) => {
        try {
            const docRef = await updateDoc(doc(db, "urls", url.id), {
                name: url.name
            });
        } catch (error) {
            console.log(error);
        } finally {
            documents.value = [];
        }
    }

    return {
        documents,
        reset,
        getUrls,
        addUrl,
        deleteUrl,
        getUrl,
        updateUrl
    }
});