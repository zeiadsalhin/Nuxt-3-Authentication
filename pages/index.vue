<template>
    <!--Home page details-->
    <div class="bg-gray-200 p-5 space-y-5">
        <h1 class="text-3xl font-bold">Nady Elkodaa</h1>
        <p>Welcome, User</p>
        <p>You have Logged in Successfully</p>
        <!--Log out button-->
        <button v-if="loggedin" @click="logout" class="p-2 bg-gray-300 text-xl font-semibold">Log Out</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loggedin: true, // Log in state
        }
    },
    methods: {
        logout() {
            this.$router.push('login') // redirect to login page
        }
    },
}
</script>