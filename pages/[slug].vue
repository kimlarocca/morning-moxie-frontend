<template>
  <div class="quote">
    <SecondaryHero />
    <ProgressSpinner v-if="loading" />
    <div v-else-if="quote" class="container p-4">
      <h1 class="mb-4">{{ quote.quote }}</h1>
      <p>- {{ quote.author }}</p>
    </div>
    <div v-else class="container p-4">
      <h1 class="mb-4">Quote not found</h1>
      <p>Sorry! We couldn't find the quote you were looking for.</p>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const loading = ref(true)
const route = useRoute()
const quote = ref(null)

const { data, error } = await client
  .from('quotes')
  .select('*')
  .eq('slug', route.params.slug)
  .single()
if (error) {
  console.error('quotes database error', error)
} else {
  quote.value = data
}

loading.value = false
</script>
