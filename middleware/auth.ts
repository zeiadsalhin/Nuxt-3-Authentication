// import Authentication client 
import { createClient } from '@supabase/supabase-js'

export default defineNuxtRouteMiddleware(async (to, from) => { // middleware config
  const client = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)
  const isLoginRoute = to.path === '/login' ||to.path === '/signup'; // define authentication routes
  try {
    const { data, error } = await client.auth.getSession();
    if (data && data.session && data.session.user && isLoginRoute) {// Authentication status
      console.log("User found");
      return navigateTo('/');// navigating route to home if Authenticated
    }
  } catch (error) {
    console.log(error); // print error if any
  }
});
  