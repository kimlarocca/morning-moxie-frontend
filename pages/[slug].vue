<template>
  <div class="quote-page">
    <SecondaryHero />
    <ProgressSpinner v-if="loading" />
    <div v-else-if="quote" class="container p-4 pt-6">
      <div class="grid">
        <div class="col col-12 lg:col-4 mb-6 lg:mb-0">
          <div class="lg:pr-6">
            <img
              :src="randomImage"
              alt="morning moxie sunrise over lake tahoe"
              class="quote-image"
            />
          </div>
        </div>
        <div class="col col-12 lg:col-8">
          <div class="flex align-items-center gap-2 flex-wrap mb-3">
            <div v-if="quote.hardship" class="tag">hardship</div>
            <div v-if="quote.failure" class="tag">failure</div>
            <div v-if="quote.grief" class="tag">grief</div>
            <div v-if="quote.strength" class="tag">strength</div>
            <div v-if="quote.perseverance" class="tag">perseverance</div>
            <div v-if="quote.determination" class="tag">determination</div>
          </div>
          <div class="flex align-items-start gap-2">
            <Quote />
            <div>
              <h1 class="mb-4">{{ quote.quote }}</h1>
              <p v-if="quote.author" class="mb-4">- {{ quote.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container p-4">
      <h1 class="mb-4">Quote not found</h1>
      <p>Sorry! We couldn't find the quote you were looking for.</p>
    </div>
  </div>
</template>

<script setup>
import { images } from '~/assets/images'

const client = useSupabaseClient()
const loading = ref(true)
const quote = ref(null)
const route = useRoute()

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

// get a random image
const randomImage = computed(() => {
  if (images) {
    const randomIndex = Math.floor(Math.random() * images.length)
    return `https://ulnfvcevkxchrdwnkgyf.supabase.co/storage/v1/object/public/images/${images[randomIndex].name}`
  }
})

loading.value = false
</script>

<style lang="scss" scoped>
.quote-icon {
  width: 130px;
}
.quote-image {
  width: 100%;
  max-height: 450px;
  margin-left: 10px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: -10px 10px 0px 0px var(--green);
}
</style>
