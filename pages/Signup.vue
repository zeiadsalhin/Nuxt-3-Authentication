<script setup>
//Import Sweetalert toast
import Swal from 'sweetalert2'
// import required APIs from Nuxt
import { createClient } from '@supabase/supabase-js'

const client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
const router = useRouter()
const errMsg = ref()
const displayname = ref('')
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

});

async function signUpNewUser() {
    try {
        const { data, error } = await client.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data: {
                    first_name: displayname.value,
                    // last_name: 'mohamed',
                },
            }
        })
        if (error) throw error;
        // successMsg.value = 'Success'
        console.log('Signed up successfully')
        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'You Signed Up successfully',
            toast: true,
            timer: 2000,
            showConfirmButton: false,
        }).then(() => {
            router.push("Login")
        })
    } catch (error) {
        errMsg.value = error
        console.log(error)
    }
}

// Form Validation Functions
function checkname() {
    const input = document.querySelector("#name")
    const b = document.querySelector("#submitbtn")
    const e = document.querySelector("#errorn")

    if (input.value.length > 25) {
        input.classList.add("border-red-500")
        e.classList.remove("hidden")
        b.setAttribute("disabled", "true")
    } else {
        if (input.value.length > 1) {
            input.classList.remove("border-red-500")
            input.classList.add("border-green-500")
            e.classList.add("hidden")
            b.removeAttribute("disabled", "true")
        } else {
            input.classList.add("border-red-500")
            input.classList.remove("border-green-500")
            e.classList.remove("hidden")
        }

    }
}
function checkemail() {
    const input = document.querySelector("#email")
    const b = document.querySelector("#submitbtn")
    const e = document.querySelector("#errore")

    if (input.value.length > 40) {
        input.classList.add("border-red-500")
        e.classList.remove("hidden")
    } else {
        if (input.value.includes("@") && input.value.includes(".com")) {
            input.classList.remove("border-red-500")
            input.classList.add("border-green-500")
            e.classList.add("hidden")
            b.removeAttribute("disabled", "true")
        } else {
            input.classList.add("border-red-500")
            e.classList.remove("hidden")
            b.setAttribute("disabled", "true")
        }

    }
}
function checkpassword() {
    const input = document.querySelector("#password")
    const b = document.querySelector("#submitbtn")
    const e = document.querySelector("#errorp")

    if (input.value.length < 6) {
        input.classList.add("border-red-500")
        e.classList.remove("hidden")
    } else {
        if (input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/)) { // Regex validation
            input.classList.remove("border-red-500")
            input.classList.add("border-green-500")
            e.classList.add("hidden")
            b.removeAttribute("disabled", "true")
        } else {
            input.classList.add("border-red-500")
            e.classList.remove("hidden")
            b.setAttribute("disabled", "true")
        }

    }
}
</script>
<template>
    <!--Form Body-->
    <div class="p-1 md:p-10 flex-col justify-center h-full ">

        <h1 class="text-3xl md:text-5xl text-center font-bold p-2">Sign Up</h1>

        <div class="w-1/4 h-1 mt-5 rounded-xl mx-auto bg-gray-600 dark:bg-gray-900"></div>
        <form id="form" class="p-5 text-center mx-auto justify-center flex-col" @submit.prevent="signUpNewUser">
            <!--Display error message if any-->
            <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
            <div class="form flex justify-center">
                <label class="p-2 text-md md:text-xl text-right md:mr-14">Name</label>
                <input @change="changed" id="name" type="name" v-model="displayname" @input="checkname"
                    spellcheck="false"
                    class="bg-gray-200 dark:bg-gray-300 text-black h-fit my-auto p-1 md:p-2 rounded-md focus:outline-none border-2  w-2/3 md:w-1/5 "
                    required />


            </div>
            <!--Error Message-->
            <p id="errorn" class="hidden text-sm text-red-700">Please Check your Name</p>

            <div class="form mt-3 flex justify-center">
                <label class="p-3 text-md md:text-xl md:mr-14">Email</label>
                <input id="email" v-model="email" @input="checkemail" spellcheck="false"
                    class="bg-gray-200 dark:bg-gray-300 text-black h-fit my-auto p-1 md:p-2 rounded-md focus:outline-none border-2  w-2/3 md:w-1/5 "
                    type="email" required />

            </div>
            <!--Error Message-->
            <p id="errore" class="hidden text-sm text-red-700">Please Check your Email</p>

            <div class="form mt-3 flex justify-center">
                <label class="p-3 text-md md:text-xl text-center md:mr-5">Password</label>
                <input id="password" v-model="password" @input="checkpassword"
                    class="bg-gray-200 dark:bg-gray-300 text-black h-fit my-auto p-1 md:p-2 rounded-md focus:outline-none border-2  w-2/3 md:w-1/5 "
                    type="password" required />

            </div>
            <!--Error Message-->
            <p id="errorp" class="hidden text-sm text-red-700">Please Check your Password</p>
            <span class="block text-sm opacity-40 p-2 -mt-2 mb-5 space-y-1">
                <ul>Ex: Min 6 Characters and Must Include</ul>
                <li>Capital letter</li>
                <li>Special Character</li>
                <li>At least one number</li>
            </span>
            <!--Submit button-->
            <button id="submitbtn" @click="" type="submit"
                class="px-5 py-2 w-32 rounded-md hover:cursor-pointer bg-gray-400 hover:bg-gray-500">
                Sign Up
            </button>

            <div class="">
                <div class="relative md:w-1/4 h-1 m-5 rounded-xl mx-auto bg-gray-800">

                </div>
            </div>
            <p class="m-5 text-center">Already have an account?</p>
            <NuxtLink to="/login" onclick=""
                class="text-center mx-auto flex w-48 justify-center px-5 py-2 rounded-md hover:cursor-pointer bg-gray-300 hover:bg-gray-400 ">
                login</NuxtLink>
        </form>
        <!--End of body-->
    </div>
</template>
<script>


</script>