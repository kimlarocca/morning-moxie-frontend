<template>
  <div class="hero p-4">
    <h1 class="mb-4">Get inspired when you wake up every morning</h1>
    <h3 class="mb-5">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </h3>
    <nuxt-link to="/signup" class="plain">
      <Button label="sign up now" />
    </nuxt-link>
  </div>
</template>

<script setup>
const location = ref('')
</script>

<style lang="scss" scoped>
$medium: 768px;
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url('/images/Hero.jpg') var(--light-green) no-repeat left center;
  background-size: cover;
  min-height: 466px;
  h1,
  h3 {
    width: 100%;
    max-width: 700px;
  }
  @media all and (min-width: $medium) {
    background: url('/images/Hero.jpg') var(--light-green) no-repeat right
      center;
  }
}
</style>
