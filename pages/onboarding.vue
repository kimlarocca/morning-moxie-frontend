<template>
  <div class="settings">
    <Html lang="en">
      <Head>
        <Title>Morning Moxie | Getting Started</Title>
      </Head>
    </Html>
    <SecondaryHero />
    <div v-if="currentUserProfile" class="p-4">
      <h1 class="mb-5">Let's Get Started</h1>
      <ProgressBar :value="progress" class="mb-5" />
      <transition name="slide-fade">
        <div v-if="step === 0">
          <h2 class="mb-5">First, tell us about yourself</h2>
          <manage-user-profile class="mb-6" />
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
          <h2 class="mb-5">Select a category you'd like inspiration for:</h2>
          <manage-user-categories class="mb-6" />
          <Button @click="step--" class="mr-4 p-button-outlined" label="Back" />
          <Button
            @click="
              () => {
                updateProfile()
                step++
              }
            "
            :disabled="!currentUserProfile.category"
            class="mt-4"
            label="Continue"
          />
        </div>
      </transition>
      <transition name="slide-fade">
        <div v-if="step === 2">
          <h2 class="mb-5">Next, add a profile image</h2>
          <supabase-upload-image
            :image="currentUserProfile?.avatar_url || ''"
            class="mb-6"
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
      <transition name="slide-fade">
        <div v-if="step === 3">
          <h2 class="mb-5">Last Step! How did you hear about us?</h2>
          <Dropdown
            v-model="referredBy"
            :options="referrers"
            placeholder="Select an option"
            @change="updateProfile"
            class="mb-6"
          />
          <Button @click="step--" class="mr-4 p-button-outlined" label="Back" />
          <Button
            v-if="referredBy"
            @click="finishOnboarding()"
            label="Finish"
          />
          <Button v-else @click="finishOnboarding()" label="Skip" />
        </div>
      </transition>
      <transition name="slide-fade">
        <div v-if="step === 4">
          <h2 class="mb-5">Thanks, you're all set up!</h2>
          <p class="mb-4">
            You can always update your profile later in your
            <nuxt-link to="/settings">account settings</nuxt-link>.
          </p>
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

const referredBy = ref(currentUserProfile.value?.referred_by ?? null)
const step = ref(0)
const successMessage = ref(false)

const progress = computed(() => {
  if (step.value === 0) return 0
  else if (step.value === 1) return 25
  else if (step.value === 2) return 50
  else if (step.value === 3) return 75
  return 100
})

const referrers = [
  'Google',
  'Facebook',
  'Instagram',
  'Twitter',
  'LinkedIn',
  'Family',
  'Friend',
  'Therapist',
  'Article or blog',
  'Other'
]

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

const finishOnboarding = async () => {
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: currentUser.value.id,
      updated_at: new Date().toISOString(),
      onboarded: true
    })
    .match({ id: currentUser.value.id })
  if (error) {
    console.log('finishOnboarding error', error)
  } else {
    step.value++
  }
}
</script>

<style lang="scss">
.category {
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  border: solid 1px var(--light-green);
  cursor: pointer;
  transition: var(--transition);
  margin-bottom: 1rem;
  &.selected,
  &:hover {
    background-color: var(--light-green);
  }
}
.icon {
  height: 40px;
  path {
    fill: var(--dark-green);
  }
}
</style>
