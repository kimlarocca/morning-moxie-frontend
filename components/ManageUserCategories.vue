<template>
  <h6 class="mb-4">Inspiration Category</h6>
  <div
    class="category"
    :class="category === 'grief' ? 'selected' : ''"
    @click="category = 'grief'"
  >
    <p>Grief</p>
    <IconsRainCloud />
  </div>
  <div
    class="category"
    :class="category === 'suffering' ? 'selected' : ''"
    @click="category = 'suffering'"
  >
    <p>Suffering</p>
    <IconsSad />
  </div>
  <div
    class="category"
    :class="category === 'strength' ? 'selected' : ''"
    @click="category = 'strength'"
  >
    <p>Strength</p>
    <IconsDiamond />
  </div>
  <div
    class="category"
    :class="category === 'determination' ? 'selected' : ''"
    @click="category = 'determination'"
  >
    <p>Determination</p>
    <IconsRocket />
  </div>
  <div
    class="category"
    :class="category === 'hardship' ? 'selected' : ''"
    @click="category = 'hardship'"
  >
    <p>Hardship</p>
    <IconsUmbrella />
  </div>
  <div
    class="category"
    :class="category === 'failure' ? 'selected' : ''"
    @click="category = 'failure'"
  >
    <p>Failure</p>
    <IconsFailure />
  </div>
  <div
    class="category mb-4"
    :class="category === 'perseverance' ? 'selected' : ''"
    @click="category = 'perseverance'"
  >
    <p>Perseverance</p>
    <IconsCloudy />
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
</template>

<script setup>
const currentUser = useSupabaseUser()
const currentUserProfile = useCurrentUserProfile()
const supabase = useSupabaseClient()

const category = ref(currentUserProfile.value?.category ?? null)
const successMessage = ref(false)

// watch for changes to the category
watch(category, () => {
  updateProfile()
})

const updateProfile = async () => {
  successMessage.value = false
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: currentUser.value.id,
      updated_at: new Date().toISOString(),
      category: category.value
    })
    .match({ id: currentUser.value.id })
  if (error) {
    console.log('updateProfile error', error)
  } else {
    successMessage.value = true
    currentUserProfile.value.category = category.value
  }
}
</script>
