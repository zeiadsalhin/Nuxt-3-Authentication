<script setup>
// import sweetalert and Authentication config
import Swal from 'sweetalert2'
import { createClient } from '@supabase/supabase-js'
const client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
const router = useRouter()
const name = ref()
const dataview = ref()

// middleware for authentication
definePageMeta({
    middleware: ["auth"]
})

// display user data when loaded
onMounted(async () => {
    try {
        const { data, error } = await client.auth.getSession(); // get session status from local cookies

        if (data.session) {
            name.value = data.session.user.identities[0].identity_data.first_name // Display registered username
            dataview.value = data.session.user // JSON Body response
        } else {
            router.push("/login")
        }
    } catch (error) {
        console.log(error);
    }

});

// Logout and clear cookies
async function logout() {
    try {
        const { error } = await client.auth.signOut()
        Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'You Signed out successfully',
            toast: true,
            timer: 1000,
            showConfirmButton: false,
        }).then(() => {
            router.push("/login")
        })
    } catch (error) {
        console.log(error)
    }
}
</script>
<template>
    <div>
        <div v-if="dataview"> <!--will only render when Authenticated-->
            <!--Home page details-->
            <div class="bg-gray-200 p-5 space-y-5">
                <h1 class="text-3xl font-bold">Nady Elkodaa</h1>
                <p class="font-semibold">Welcome, {{ name }}</p>
                <p>You have Logged in Successfully</p>
                <!--Log out button-->
                <div class="buttons flex space-x-5">
                    <button @click="logout" class="p-2 bg-gray-300 text-xl font-semibold">Log Out</button>
                    <nuxt-link to="/updatepassword"><button class="p-2.5 bg-slate-300 text-md font-semibold">Reset
                            Password</button></nuxt-link>
                </div>
            </div>
            <!--JSON response-->
            <div class="data p-2 bg-slate-100">
                <h2 class="font-semibold"> Response body:</h2>
                <p class="p-3"> {{ dataview }}</p>
            </div>
        </div>
    </div>
</template>