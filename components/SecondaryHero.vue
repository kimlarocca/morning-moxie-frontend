<template>
  <div class="secondary-hero mb-4" />
</template>

<style lang="scss" scoped>
.secondary-hero {
  background: url('/images/SecondaryHero.jpg') var(--light-green) no-repeat
    right top;
  background-size: cover;
  height: 166px;
  @media all and (min-width: 1400px) {
    background: url('/images/SecondaryHero.jpg') var(--light-green) no-repeat
      left center;
  }
}
</style>
