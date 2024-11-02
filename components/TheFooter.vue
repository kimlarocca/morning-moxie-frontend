<template>
  <footer class="p-4">
    <Divider class="mb-5" />
    <div class="like-h2 mb-2">Morning Moxie</div>
    <div class="flex justify-content-between flex-column lg:flex-row">
      <p class="mb-2">
        <nuxt-link to="/" class="mr-4"> Privacy Policy </nuxt-link>
        <nuxt-link to="/" class="mr-4"> Terms </nuxt-link>
        <nuxt-link to="/"> Help Center </nuxt-link>
      </p>
      <p>Copyright © {{ currentYear }} Morning Moxie. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
