import { createClient } from '@supabase/supabase-js'
// import { redirect } from 'vue-router'

export default defineNuxtRouteMiddleware(async (to, from, next) => {
  const client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
  const isLoginRoute = to.path === '/login' ||to.path === '/signup' ||to.path === '/updatepassword';
  try {
    const { data, error } = await client.auth.getSession();
    if (data && !data.session && !data.session.user && isLoginRoute) {
      console.log("User not found");
      return navigateTo('/login');
    }
  } catch (error) {
    console.log(error);
  }
});
  