<template>
  <div class="quote">
    <SecondaryHero />
    <ProgressSpinner v-if="loading" />
    <div v-else-if="quotes" class="container p-4">
      <h1 class="mb-4">Quotes</h1>
      <div v-for="quote in quotes" :key="quote.id" class="mb-4">
        <Quote />
        <nuxt-link :to="`/${quote.slug}`" class="plain">
          <h2 class="mb-2">
            {{ quote.quote }}
          </h2>
          <p v-if="quote.author">- {{ quote.author }}</p>
        </nuxt-link>
        <divider class="my-5 w-2" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Quote from '~/components/Quote.vue'

const client = useSupabaseClient()
const loading = ref(true)
const quotes = ref(null)

const { data, error } = await client.from('quotes').select('*').order('author')
if (error) {
  console.error('quotes database error', error)
} else {
  quotes.value = data
}

loading.value = false
</script>

<style lang="scss" scoped>
.quote-icon {
  height: 50px;
}
</style>
