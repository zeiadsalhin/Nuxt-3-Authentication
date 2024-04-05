<template>
  <!--define Nuxt pages and loader-->
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import Swal from 'sweetalert2'// template
</script>
<style>
/*page transitions*/
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0.6;
  /* filter: blur(1rem); */
}
</style>