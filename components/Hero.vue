<template>
  <div class="hero container p-4">
    <h1 class="mb-4">Get inspired when you wake up every morning</h1>
    <h3 class="mb-5">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </h3>
    <Button label="sign up now" class="px-4" />
  </div>
</template>

<script setup>
const location = ref('')
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url('/images/Hero.jpg') var(--light-green) no-repeat right center;
  background-size: cover;
  min-height: 466px;
  h1,
  h3 {
    width: 100%;
    max-width: 700px;
  }
  h1 {
    font-size: var(--font-size-16);
  }
}
</style>
