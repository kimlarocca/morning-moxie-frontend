<template>
  <div>
    <header class="p-4">
      <div class="flex align-items-center justify-content-between">
        <nuxt-link to="/" class="plain flex align-items-center">
          <Logo class="mr-1" />
          <h3 class="green">Morning Moxie</h3>
        </nuxt-link>
        <i
          class="pi pi-bars text-xl p-1 cursor-pointer mr-1"
          @click="showMenu = true"
        />
      </div>
    </header>
    <Sidebar
      v-model:visible="showMenu"
      :baseZIndex="10000"
      position="right"
      class="w-full md:w-25rem"
    >
      <the-menu @menu-clicked="closeMenu()" />
    </Sidebar>
  </div>
</template>

<script setup>
const showLogin = useLoginMenu()
const showMenu = useMainMenu()

const closeMenu = () => {
  showLogin.value = false
  showMenu.value = false
}
</script>

<style lang="scss" scoped>
header {
  background-color: var(--light-green);
}
</style>
