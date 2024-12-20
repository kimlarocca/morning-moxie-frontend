<template>
  <h6 class="mb-4">Inspiration Categories</h6>
  <div
    class="category"
    :class="{
      selected: category.includes('grief')
    }"
    @click="toggleCategory('grief')"
  >
    <p>Grief</p>
    <IconsRainCloud />
  </div>
  <div
    class="category"
    :class="{
      selected: category.includes('suffering')
    }"
    @click="toggleCategory('suffering')"
  >
    <p>Suffering</p>
    <IconsSad />
  </div>
  <div
    class="category"
    :class="{
      selected: category.includes('strength')
    }"
    @click="toggleCategory('strength')"
  >
    <p>Strength</p>
    <IconsDiamond />
  </div>
  <div
    class="category"
    :class="{
      selected: category.includes('determination')
    }"
    @click="toggleCategory('determination')"
  >
    <p>Determination</p>
    <IconsRocket />
  </div>
  <div
    class="category"
    :class="{
      selected: category.includes('hardship')
    }"
    @click="toggleCategory('hardship')"
  >
    <p>Hardship</p>
    <IconsUmbrella />
  </div>
  <div
    class="category"
    :class="{
      selected: category.includes('failure')
    }"
    @click="toggleCategory('failure')"
  >
    <p>Failure</p>
    <IconsFailure />
  </div>
  <div
    class="category mb-4"
    :class="{
      selected: category.includes('perseverance')
    }"
    @click="toggleCategory('perseverance')"
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

const category = ref(currentUserProfile.value?.category ?? [])
const successMessage = ref(false)

// toggle the categories
const toggleCategory = selectedCategory => {
  if (category.value?.includes(selectedCategory)) {
    category.value = category.value.filter(item => item !== selectedCategory)
  } else {
    category.value.push(selectedCategory)
  }
  updateProfile()
}

const updateProfile = async () => {
  successMessage.value = false
  const { error } = await supabase
    .from('profiles')
    .update({
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
