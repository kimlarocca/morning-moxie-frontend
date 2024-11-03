<template>
  <div>
    <header class="container p-4">
      <div class="flex align-items-center justify-content-between">
        <nuxt-link to="/" class="plain flex align-items-center">
          <Logo class="mr-1" />
          <h2>Morning Moxie</h2>
        </nuxt-link>
        <i
          class="pi pi-bars text-xl p-1 cursor-pointer mr-1"
          @click="visible = true"
        />
      </div>
    </header>
    <Sidebar
      v-model:visible="visible"
      :baseZIndex="10000"
      position="right"
      class="w-full md:w-25rem"
    >
      <the-menu @menu-clicked="visible = false" />
    </Sidebar>
  </div>
</template>

<script setup>
const visible = ref(false)
</script>

<style lang="scss" scoped>
header {
  background-color: var(--light-green);
}
</style>
