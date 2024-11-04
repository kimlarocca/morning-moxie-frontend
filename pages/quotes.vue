<template>
  <div class="quote">
    <SecondaryHero />
    <ProgressSpinner v-if="loading" />
    <div v-else-if="quotes" class="container p-4">
      <h1 class="mb-4">Quotes</h1>
      <div class="flex align-items-center gap-2 flex-wrap mb-5">
        <Button
          rounded
          plain
          icon="pi pi-search"
          aria-label="search"
          @click="showSearchBar = !showSearchBar"
        />
        <div class="tag">
          <i
            class="pi pi-search clickable"
            @click="showSearchBar = !showSearchBar"
          />
        </div>
        <div class="tag">hardship</div>
        <div class="tag">failure</div>
        <div class="tag">grief</div>
        <div class="tag">suffering</div>
        <div class="tag">strength</div>
        <div class="tag">perseverance</div>
        <div class="tag">determination</div>
      </div>
      <Transition name="fade">
        <div v-if="showSearchBar" class="flex align-items-center gap-2 mb-4">
          <div class="p-inputgroup flex-1 mb-6">
            <InputText v-model="searchFieldValue" placeholder="Search quotes" />
            <Button
              v-if="searchFieldValue"
              icon="pi pi-times"
              aria-label="clear search"
              @click="clearSearchField"
            />
            <Button v-else icon="pi pi-search" aria-label="search quotes" />
          </div>
        </div>
      </Transition>
      <div v-for="quote in filteredQuotes" :key="quote.id" class="mb-4">
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
const searchFieldValue = ref('')
const showSearchBar = ref(false)

const { data, error } = await client.from('quotes').select('*').order('author')
if (error) {
  console.error('quotes database error', error)
} else {
  quotes.value = data
}

// computed property for filtered quotes based on search field value
const filteredQuotes = computed(() => {
  if (!searchFieldValue.value) {
    return quotes.value
  }
  return quotes.value.filter(item => {
    const searchTerm = searchFieldValue.value.toLowerCase()
    return item.quote.toLowerCase().includes(searchTerm)
  })
})

// clear the search field
const clearSearchField = () => {
  searchFieldValue.value = ''
}

loading.value = false
</script>

<style lang="scss" scoped>
.quote-icon {
  height: 50px;
}
</style>
