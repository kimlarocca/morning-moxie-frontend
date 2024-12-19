<template>
  <div class="hero p-4">
    <h1 class="mb-4">Inspiring texts when you wake up every morning</h1>
    <h3 class="mb-5">
      Morning Moxie is your daily dose of positivity. When life feels
      overwhelming, a little encouragement can make all the difference.
    </h3>
    <nuxt-link to="/signup" class="plain">
      <Button label="sign up" />
    </nuxt-link>
  </div>
</template>

<script setup>
const location = ref('')
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: url('/images/Hero.jpg') var(--light-green) no-repeat left center;
  min-height: 266px;
  background-size: cover;
  h1,
  h3 {
    width: 100%;
    max-width: 700px;
    color: var(--black);
  }
  @media all and (min-width: 768px) {
    min-height: 466px;
    background: url('/images/Hero.jpg') var(--light-green) no-repeat right
      center;
  }
  @media all and (min-width: 1493px) {
    background: url('/images/Hero.jpg') var(--light-green) no-repeat left center;
  }
}
</style>
