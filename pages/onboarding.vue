<template>
  <div class="settings">
    <Html lang="en">
      <Head>
        <Title>Morning Moxie | Let's Get Started</Title>
      </Head>
    </Html>
    <SecondaryHero />
    <div v-if="currentUserProfile" class="p-4">
      <h1 class="mb-5">Let's Get Started {{ progress }}</h1>
      {{ currentUserProfile }}
      <ProgressBar :value="progress" class="mb-4" />
      <transition name="slide-fade">
        <div v-if="step === 0">
          <h2 class="mb-4">First, tell us about yourself</h2>
          <manage-user-profile />
          <Button
            @click="step++"
            :disabled="!currentUserProfile?.timezone"
            class="mt-4"
            label="Continue"
          />
        </div>
      </transition>
      <transition name="slide-fade">
        <div v-if="step === 1">
          <h2 class="mb-4">Next, upload a profile picture</h2>
          <supabase-upload-image
            :image="currentUserProfile?.avatar_url || ''"
            class="mb-5"
          />
          <Button @click="step--" class="mr-4 p-button-outlined" label="Back" />
          <Button
            v-if="currentUserProfile?.avatar_url"
            @click="step++"
            label="Continue"
          />
          <Button v-else @click="step++" label="Skip" />
        </div>
      </transition>
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
const currentUserProfile = useCurrentUserProfile()
const supabase = useSupabaseClient()

const avatarImage = ref(null)
const step = ref(1)
const successMessage = ref(false)

const progress = computed(() => {
  if (step.value === 0) return 0
  else if (step.value === 1) return 33
  else if (step.value === 2) return 66
  return 100
})

const updateProfile = async () => {
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: currentUser.value.id,
      updated_at: new Date().toISOString(),
      referred_by: referredBy.value
    })
    .match({ id: currentUser.value.id })
  if (error) {
    console.log('updateProfile error', error)
  } else {
    successMessage.value = true
    currentUserProfile.value.referred_by = referredBy.value
  }
}
</script>
