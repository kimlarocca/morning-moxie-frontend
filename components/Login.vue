<template>
  <div class="login">
    <h2 class="mb-4 mt-2 flex align-items-center">Login</h2>
    <supabase-login-with-phone @close-panel="emit('closePanel')" class="mb-4" />
  </div>
</template>

<script setup>
const emit = defineEmits(['closePanel'])
</script>
