<template>
  <footer class="p-4">
    <Divider class="mb-7" />
    <div
      class="flex justify-content-between flex-column text-center lg:text-left lg:flex-row"
    >
      <nuxt-link
        to="/"
        class="plain flex align-items-center mb-2 justify-content-center lg:justify-content-start"
      >
        <Logo class="mr-1" />
        <h3 class="green">Morning Moxie</h3>
      </nuxt-link>
      <div>
        <p class="mb-1 text-center lg:text-right">
          <nuxt-link to="/privacy" class="mr-3"> Privacy Policy </nuxt-link>
          <nuxt-link to="/terms" class="mr-3"> Terms </nuxt-link>
          <nuxt-link to="/help"> Help Center </nuxt-link>
        </p>
        <p class="mb-1">
          Copyright © {{ currentYear }} Morning Moxie. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
