<script setup>
// import sweelalert and other Nuxt API components
import { createClient } from '@supabase/supabase-js'
const client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

import Swal from 'sweetalert2'

const router = useRouter()
const errMsg = ref()
const email = ref('')
const password = ref('')
const dataview = ref()
definePageMeta({
    middleware: ["auth"] // handles auth routing
})
// get user data if exist when mounted
onMounted(async () => {
    try {
        const { data, error } = await client.auth.getSession(); // get cookies user info
        if (!data.session) {
            // console.log('client exist');
            dataview.value = true // render form when no authentication
        } else {
            router.push("/")
        }
    } catch (error) {
        console.log(error);
    }
});

//Login form 
async function signInWithEmail() { // sign in with email and password
    try {
        const { data, error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })
        if (error) throw error;

        // display success toast
        console.log('Loggedin Successfully')
        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'You Logged in successfully',
            toast: true,
            timer: 1000,
            showConfirmButton: false,
        }).then(() => {
            router.push("/") //routing to dashboard after login
        })
    } catch (error) {
        //display error message
        console.log(error)
        errMsg.value = error
    }
}
</script>
<template>
    <div>
        <!--Login Form Body-->
        <!--will only render when Authenticated-->
        <div v-if="dataview"
            class="p-1 md:p-5 md:my-20 m-10 flex-col justify-center mx-auto w-11/12 h-1/3 bg-gray-200 shadow-2xl rounded-md">
            <h1 class="text-3xl md:text-5xl text-center font-bold p-5">Log in</h1>

            <div class="w-1/4 h-1 mt-5 rounded-xl mx-auto bg-gray-600 dark:bg-gray-900"></div>
            <form id="form" class="space-y-5 p-5 w-full h-fit text-center mx-auto justify-center flex-col"
                @submit.prevent="signInWithEmail">
                <!--input fields-->
                <div class="form mt-3">
                    <label class="p-3 text-md md:text-xl md:mr-14 hiddenm">Email</label>
                    <input placeholder="Email" v-model="email"
                        class="bg-gray-200 dark:bg-gray-300 text-black p-1 md:p-2 ml- rounded-md focus:outline-none w-2/3 md:w-1/5 "
                        type="email" required />
                </div>
                <div class="form mt-3">
                    <label class="p-3 text-md md:text-xl text-center md:mr-5 hiddenm">Password</label>
                    <input placeholder="Password" v-model="password"
                        class="bg-gray-200 dark:bg-gray-300 text-black p-1 md:p-2 rounded-md focus:outline-none w-2/3 md:w-1/5 "
                        type="password" required />
                </div>
                <!--Display error message if any-->
                <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>

                <!--Submit button-->
                <button @click="" type="submit"
                    class="px-5 m-5 py-2 w-32 rounded-md hover:cursor-pointer bg-gray-400 hover:bg-gray-500 hover:text-gray-50">
                    Log in
                </button>
                <!--Forget Password-->
                <NuxtLink to="/ResetPassword"><button
                        class="px-5 m-5 py-2 w-fit rounded-md hover:cursor-pointer bg-gray-100 hover:bg-gray-300">
                        Forget password?
                    </button></NuxtLink>
                <!--Return to Sign Up page-->
                <NuxtLink to="/signup"><button
                        class="px-5 m-5 py-2 w-fit hover:cursor-pointer mx-auto block hover:underline hover:bg-gray-300">
                        return to Sign Up
                    </button></NuxtLink>
            </form>
        </div>
        <!--End of Body-->
    </div>
</template>