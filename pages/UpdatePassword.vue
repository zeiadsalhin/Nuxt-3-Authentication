<script setup>
//import Auth client
import { createClient } from '@supabase/supabase-js'

const router = useRouter()
const client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
// refs for inputs
const pass1 = ref()
const pass2 = ref()
const errMsg = ref()
const succMsg = ref()

definePageMeta({
    middleware: ["notauth"]// will not be loaded when there is no Authentication
})
onMounted(async () => {
    try {
        const { data, error } = await client.auth.getSession(); // get session info
        if (data.session) {
            // console.log('client');
        } else {
            router.push("/")
        }
    } catch (error) {
        console.log(error);
    }

});

async function resetpassword() {// password reset for user
    try {
        if (pass1.value == pass2.value) {
            const { data, error } = await client.auth.updateUser({// update user info
                password: pass1.value
            })
            // display success message and redirect to login page
            console.log("updated")
            errMsg.value = ''
            succMsg.value = 'Password updated successfully'

            setTimeout(() => {
                router.push("/login")
            }, 1000);


        } else {
            errMsg.value = 'Password not match'// display error if passwords not match
        }

    } catch (error) {
        console.log(error)
        errMsg.value = error // display error message from API
    }
}

//Regex password
function checkpassword() {
    const input = document.querySelector("#pass1")
    const b = document.querySelector("#submitbtn")
    const e = document.querySelector("#errorp")

    if (input.value.length < 6) {// min 6 and max 30
        input.classList.add("border-red-500")
        e.classList.remove("hidden")
    } else {
        if (input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/)) { // Regex validation
            input.classList.remove("border-red-500")
            input.classList.add("border-green-500")
            e.classList.add("hidden")
            b.removeAttribute("disabled", "true")// prevent submit
        } else {
            input.classList.add("border-red-500")
            e.classList.remove("hidden")
            b.setAttribute("disabled", "true")// allow submit
        }

    }
}
</script>
<template>
    <div>
        <!--form body-->
        <div class="about p-10 my-10 flex-col justify-center w-full">
            <h1 class="text-2xl md:text-5xl  text-center font-bold p-2">Reset Password</h1>

            <div class="w-1/4 h-1 mt-5 rounded-xl mx-auto bg-gray-900"></div>
            <form id="form" class="space-y-5 p-5 h-fit text-center mx-auto justify-center flex-col"
                @submit.prevent="resetpassword">
                <div class="form mt-3">
                    <label class="p-3 text-md md:text-xl block ">Enter your new password:</label>
                    <input placeholder="Enter your new password" id="pass1" v-model="pass1"
                        class="bg-gray-200 placeholder:text-sm  text-black  p-2 md:p-1.5 ml- rounded-md focus:outline-none border-2 w-2/3 md:w-1/5 "
                        type="password" @input="checkpassword" required />
                </div>
                <!--Error Message-->
                <p id="errorp" class="hidden text-sm text-red-700">Please Check your Password</p>
                <div class="form">
                    <label class="p-3 text-md md:text-xl block ">confirm your password:</label>
                    <input placeholder="Confirm your password" id="pass2" v-model="pass2"
                        class="bg-gray-200 placeholder:text-sm  text-black  p-2 md:p-1.5 ml- rounded-md focus:outline-none border-2 w-2/3 md:w-1/5 "
                        type="password" @input="checkpassword" required />
                </div>
                <!--Display error message if any-->
                <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
                <!--Confirmation message-->
                <p class="text-green-600" v-if="succMsg">{{ succMsg }}</p>
                <button @click="" type="submit" id="submitbtn"
                    class="px-5 py-2 md:w-1/4 mx-auto rounded-md hover:cursor-pointer hover:bg-gray-300 bg-gray-400 ">
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>