<template>
  <div class="login">
    <h2 class="mb-4 mt-2 flex align-items-center">Get Started Today!</h2>
    <h6 class="mb-4">Is this for you, or is this a gift?</h6>
    <div
      class="category"
      :class="type === 'individual' ? 'selected' : ''"
      @click="type = 'individual'"
    >
      <p>For Me</p>
      <IconsUser />
    </div>
    <div
      class="category"
      :class="type === 'gift' ? 'selected' : ''"
      @click="type = 'gift'"
    >
      <p>Gift</p>
      <IconsGift />
    </div>
    <transition name="slide-fade">
      <div v-if="type === 'individual'" class="mt-5">
        <SupabaseLoginWithPhone :signup="true" />
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="type === 'gift'" class="mt-5">
        <h6 class="mb-3">coming soon</h6>
        <p>
          Our gift option is coming soon! Please
          <a href="mailto:hello@morningmoxie.io">contact us</a> if you wish to
          gift a Morning Moxie subscription in the meantime.
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup>
const type = ref(null)
</script>
