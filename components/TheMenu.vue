<template>
  <nav>
    <div class="mx-3">
      <div class="flex align-items-start">
        <div class="mr-3">
          <nuxt-link
            to="/settings"
            class="plain white clickable ml-2"
            aria-label="manage profile"
            @click="emit('menuClicked', true)"
          >
            <Avatar
              v-if="currentUserProfile?.avatar_url"
              :image="currentUserProfile?.avatar_url"
              shape="circle"
              size="large"
              aria-label="user avatar image"
            />
            <Avatar
              v-else
              shape="circle"
              size="large"
              icon="pi pi-user"
              aria-label="user avatar image"
            />
          </nuxt-link>
        </div>
        <div v-if="currentUser">
          <h3 class="mb-3">
            Welcome back<template v-if="currentUserProfile?.full_name"
              >, {{ currentUserProfile?.full_name }} </template
            >!
          </h3>
          <p class="small">{{ currentUser?.email }}</p>
        </div>
        <div v-else>
          <h3 class="mb-3">You are logged out.</h3>
          <Button @click="showLogin = true" label="log in" class="mb-3" />
          <p class="mb-6">
            Don't have an account yet?
            <nuxt-link to="/signup" @click="emit('menuClicked', true)">
              Sign up
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
    <Divider class="my-5" />
    <div class="mx-4">
      <p class="mb-3">
        <nuxt-link to="/quotes" @click="emit('menuClicked', true)">
          Browse Quotes
        </nuxt-link>
      </p>
      <p v-if="currentUser" class="mb-3">
        <nuxt-link to="/settings" @click="emit('menuClicked', true)">
          Account Settings
        </nuxt-link>
      </p>
      <p class="mb-3">
        <nuxt-link to="/help" @click="emit('menuClicked', true)">
          Help
        </nuxt-link>
      </p>
      <p v-if="currentUser" class="mb-3">
        <nuxt-link to="/logout" @click="emit('menuClicked', true)">
          Log Out
        </nuxt-link>
      </p>
    </div>
    <Sidebar
      v-model:visible="showLogin"
      :baseZIndex="10000"
      position="right"
      class="w-full md:w-25rem"
    >
      <Login @close-panel="emit('menuClicked', true)" class="mx-4" />
    </Sidebar>
  </nav>
</template>

<script setup>
const currentUser = useSupabaseUser()
const currentUserProfile = useCurrentUserProfile()
const emit = defineEmits(['menuClicked'])
const showLogin = ref(false)
</script>

<style lang="scss" scoped>
.p-avatar.p-avatar-circle {
  width: 60px;
  height: 60px;
}
</style>
