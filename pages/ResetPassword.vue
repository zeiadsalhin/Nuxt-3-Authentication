<script setup>
import { createClient } from '@supabase/supabase-js'

const router = useRouter()
const client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

const email = ref()
const errMsg = ref()
const succMsg = ref()
definePageMeta({
    middleware: ["auth"]
})
async function resetpassword() {
    try {
        const { data, error } = await client.auth.resetPasswordForEmail(email.value, {
            redirectTo: 'https://nuxtauthtask.netlify.app/updatepassword',
        })
        console.log("link sent")
        succMsg.value = 'Link sent Successfully, please check your email'
    } catch (error) {
        console.log(error)
        errMsg.value = error
    }
}

</script>
<template>
    <div>
        <div class="about p-1 md:p-10 flex-col justify-center h-full">
            <h1 class="text-2xl md:text-5xl  text-center font-bold p-2">Reset Password</h1>

            <div class="w-1/4 h-1 mt-5 rounded-xl mx-auto bg-gray-900"></div>
            <form id="form" class="space-y-5 p-5 h-screen text-center mx-auto justify-center flex-col"
                @submit.prevent="resetpassword">
                <div class="form mt-3">
                    <label class="p-3 text-md md:text-xl block ">Enter your Email:</label>
                    <input placeholder="Enter your registered Email" id="email" v-model="email"
                        class="bg-gray-200 placeholder:text-sm  text-black  p-1 md:p-1.5 ml- rounded-md focus:outline-none w-2/3 md:w-1/5 "
                        type="email" required />
                </div>
                <!--Display error message if any-->
                <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
                <!--Confirmation message-->
                <p class="text-green-600" v-if="succMsg">{{ succMsg }}</p>
                <button @click="" type="submit"
                    class="px-5 py-2 md:w-1/4 mx-auto rounded-md hover:cursor-pointer hover:bg-gray-300 bg-gray-400 ">
                    Send reset link
                </button>
            </form>
        </div>
    </div>
</template>