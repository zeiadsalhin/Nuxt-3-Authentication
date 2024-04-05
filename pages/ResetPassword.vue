<script setup>
//import Authentication client
import { createClient } from '@supabase/supabase-js'

const router = useRouter()
const client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

const email = ref()
const errMsg = ref()
const succMsg = ref()
definePageMeta({
    middleware: ["auth"]// handled ny auth middleware
})
async function resetpassword() { // reset password by email link included token
    try {
        const { data, error } = await client.auth.resetPasswordForEmail(email.value, {
            redirectTo: 'https://nuxtauthtask.netlify.app/updatepassword',
        })
        console.log("link sent")
        succMsg.value = 'Link sent Successfully, please check your email' // display user message for success
    } catch (error) {
        console.log(error) // print error message for user
        errMsg.value = error
    }
}

</script>
<template>
    <div>
        <!--form body-->
        <div
            class="about p-1 md:p-10 m-10 flex-col justify-center mx-auto w-11/12 h-fit bg-gray-100 shadow-inner rounded-md">
            <h1 class="text-2xl md:text-5xl  text-center font-bold p-4">Reset Password</h1>

            <div class="w-1/4 h-1 mt-5 rounded-xl mx-auto bg-gray-900"></div>
            <form id="form" class="space-y-5 p-5 h-96 text-center mx-auto justify-center flex-col"
                @submit.prevent="resetpassword">
                <div class="form mt-3">
                    <label class="p-5 text-md md:text-xl block ">Enter your Email:</label>
                    <input placeholder="Enter your registered Email" id="email" v-model="email"
                        class="bg-gray-200 placeholder:text-sm  text-black  p-2 md:p-2 ml- rounded-md focus:outline-none w-2/3 md:w-1/5 "
                        type="email" required />
                </div>
                <!--Display error message if any-->
                <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
                <!--Confirmation message-->
                <p class="text-green-600" v-if="succMsg">{{ succMsg }}</p>
                <button @click="" type="submit"
                    class="px-5 py-2 md:w-1/4 mx-auto rounded-md hover:cursor-pointer text-gray-100 hover:bg-gray-300 hover:text-gray-800 bg-gray-500 ">
                    Send reset link
                </button>
            </form>
        </div>
    </div>
</template>