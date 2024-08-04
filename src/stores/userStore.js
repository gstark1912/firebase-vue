// stores/exampleStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../configs/firebase'
import { useDatabaseStore } from './database';

export const useUserStore = defineStore('user', () => {
    // State
    const userData = ref(null);
    const loadingUser = ref(false);

    // Actions    
    const register = async (userName, password) => {
        try {
            loadingUser.value = true;
            await createUserWithEmailAndPassword(auth, userName, password)
                .then((userCredential) => {
                    // Signed in 
                    userData.value = userCredential.user;
                    // ...
                });
        }
        catch (error) {
            console.log(error);
            return error.code;
        }
        finally {
            loadingUser.value = false;
        }
    };

    const signIn = async (email, password) => {
        try {
            loadingUser.value = true;
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    userData.value = userCredential.user;
                    // ...
                });
        }
        catch (error) {
            console.log(error);
            return error.code;
        }
        finally {
            loadingUser.value = false;
        }
    }

    const logOut = async () => {
        const databaseStore = useDatabaseStore();
        await signOut(auth)
            .then()
            .catch((error) => {
                console.log(error);
            });
        userData.value = null;
        databaseStore.reset();
    }

    const currentUser = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe =
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        userData.value = user;
                    }
                    else {
                        const databaseStore = useDatabaseStore();
                        userData.value = null;
                        databaseStore.reset();
                    }
                    resolve(user);
                    unsubscribe();
                }, e => reject(e));
        })
    }

    // Getters    
    const mayuscula = computed(() => userData.value.toLocaleUpperCase());

    return {
        userData,
        loadingUser,
        mayuscula,
        register,
        signIn,
        logOut,
        currentUser
    }
})
