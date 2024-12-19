<template>
  <div class="settings">
    <Html lang="en">
      <Head>
        <Title>Morning Moxie | Account Settings</Title>
      </Head>
    </Html>
    <SecondaryHero />
    <div class="p-4">
      <h1 class="mb-5">Account Settings</h1>
      <manage-user-profile class="mb-6" />
      <divider class="my-6 mb-7 w-2" />
      <manage-user-categories class="mb-6" />
      <divider class="my-6 mb-7 w-2" />
      <supabase-upload-image :image="avatarImage || ''" class="mb-5" />
      <divider class="my-6 mb-7 w-2" />
      <div id="delete">
        <h6 class="mb-4">Delete Account</h6>
        <p>
          Please <a href="mailto:hello@morningmoxie.io">contact us</a> if you
          wish to delete your account.
        </p>
      </div>
      <div class="changes-saved-toast">
        <Message
          v-if="successMessage"
          class="mb-4"
          severity="success"
          :closable="false"
          :sticky="false"
        >
          Your changes have been saved.
        </Message>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const currentUser = useSupabaseUser()
const supabase = useSupabaseClient()

const avatarImage = ref(null)
const profile = ref([])
const successMessage = ref(false)
const userType = ref(null)

// get the profile for the logged in user
let { data } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', currentUser.value?.id)
  .limit(1)
if (data) {
  profile.value = data
  avatarImage.value = data[0]?.avatar_url
  userType.value = data[0]?.user_type
}
</script>

<style lang="scss">
.settings {
  position: relative;
}
.settings nav {
  a,
  a:visited,
  a:active {
    color: var(--gray);
    font-weight: 500;
    &.active,
    &:hover {
      color: var(--green);
    }
  }
}
</style>
