// stores/exampleStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../configs/firebase'

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
        }
        finally {
            loadingUser.value = false;
        }
    }

    const logOut = async () => {
        await signOut(auth)
            .then()
            .catch((error) => {
                console.log(error);
            });
        userData.value = null;
    }

    const currentUser = () => {
        return new Promise((resolve, reject) => {
            const unsubscribe =
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        userData.value = user;
                    }
                    else {
                        userData.value = null;
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
