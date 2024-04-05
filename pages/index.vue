<script setup>
// import { ref } from 'vue'

import Swal from 'sweetalert2'
import { createClient } from '@supabase/supabase-js'
const client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
const router = useRouter()
const name = ref()
// const isloggedin = ref(true)
// State

// client.auth.onAuthStateChange((event, session) => {
//     setTimeout(async () => {
//         if (event === 'SIGNED_IN') {
//             console.log(1);
//             isloggedin.value = true
//         } else if (event === 'SIGNED_OUT') {
//             console.log('signedout');
//             isloggedin.value = false
//             router.push("login")
//         }
//     }, 0)
// })



onMounted(async () => {
    try {
        const { data, error } = await client.auth.getSession();
        // console.log(data.session.user.identities[0].identity_data.first_name);

        if (data.session) {
            name.value = data.session.user.identities[0].identity_data.first_name
        } else {
            router.push("/login")
        }
    } catch (error) {
        console.log(error);
    }

});




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
    <!--Home page details-->
    <div class="bg-gray-200 p-5 space-y-5">
        <h1 class="text-3xl font-bold">Nady Elkodaa</h1>
        <p>Welcome, {{ name }}</p>
        <p>You have Logged in Successfully</p>
        <!--Log out button-->
        <button @click="logout" class="p-2 bg-gray-300 text-xl font-semibold">Log Out</button>
    </div>
</template>
<script>

export default {
    data() {
        return {
            // loggedin: true, // Log in state
        }
    },
    methods: {

    },
}
</script>