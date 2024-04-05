<script setup>
// import sweelalert and other Nuxt API components
import { createClient } from '@supabase/supabase-js'
const client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

import Swal from 'sweetalert2'

const router = useRouter()
const errMsg = ref()
const email = ref('')
const password = ref('')
onMounted(async () => {
    try {
        const { data, error } = await client.auth.getSession();
        // console.log(data.session.user);
        if (!data.session) {
            // console.log('client');
        } else {
            router.push("/")
        }
    } catch (error) {
        console.log(error);
    }
    // console.log(import.meta.env.VITE_SUPABASE_URL)
});

//Login form 
async function signInWithEmail() {
    try {
        const { data, error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        })
        if (error) throw error;
        // successMsg.value = 'Success'
        console.log('Loggedin Successfully')
        // console.log(user.id)
        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'You Logged in successfully',
            toast: true,
            timer: 1000,
            showConfirmButton: false,
        }).then(() => {
            router.push("/")
        })
    } catch (error) {
        // errorMessages.value = error.message
        console.log(error)
        errMsg.value = error
    }
}
</script>
<template>
    <!--Login Form Body-->
    <div class="p-1 md:p-10 flex-col justify-center h-full ">
        <h1 class="text-3xl md:text-5xl text-center font-bold p-2 reveal">Log in</h1>

        <div class="w-1/4 h-1 mt-5 rounded-xl mx-auto bg-gray-600 dark:bg-gray-900"></div>
        <form id="form" class="space-y-5 p-5 h-screen text-center mx-auto justify-center flex-col reveal"
            @submit.prevent="signInWithEmail">
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
                class="px-5 m-5 py-2 w-32 rounded-md hover:cursor-pointer bg-gray-400 hover:bg-gray-500">
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
</template>