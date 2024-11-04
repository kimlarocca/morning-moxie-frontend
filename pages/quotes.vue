<template>
  <div class="quote">
    <SecondaryHero />
    <ProgressSpinner v-if="loading" />
    <div v-else-if="quotes" class="container p-4">
      <h1 class="mb-4">Quotes</h1>
      <div class="flex align-items-center gap-2 flex-wrap mb-5">
        <div
          class="tag large round clickable"
          @click="showSearchBar = !showSearchBar"
        >
          <i class="pi pi-search" style="font-size: 0.8rem" />
        </div>
        <div
          class="tag large clickable"
          :class="category === 'hardship' ? 'active' : ''"
          @click="changeCategory('hardship')"
        >
          hardship
        </div>
        <div
          class="tag large clickable"
          :class="category === 'failure' ? 'active' : ''"
          @click="changeCategory('failure')"
        >
          failure
        </div>
        <div
          class="tag large clickable"
          :class="category === 'grief' ? 'active' : ''"
          @click="changeCategory('grief')"
        >
          grief
        </div>
        <div
          class="tag large clickable"
          :class="category === 'suffering' ? 'active' : ''"
          @click="changeCategory('suffering')"
        >
          suffering
        </div>
        <div
          class="tag large clickable"
          :class="category === 'strength' ? 'active' : ''"
          @click="changeCategory('strength')"
        >
          strength
        </div>
        <div
          class="tag large clickable"
          :class="category === 'perseverance' ? 'active' : ''"
          @click="changeCategory('perseverance')"
        >
          perseverance
        </div>
        <div
          class="tag large clickable"
          :class="category === 'determination' ? 'active' : ''"
          @click="changeCategory('determination')"
        >
          determination
        </div>
      </div>
      <Transition name="slide-down">
        <div v-if="showSearchBar" class="flex align-items-center gap-2 mb-4">
          <div class="p-inputgroup flex-1">
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
      <p v-if="category || searchFieldValue" class="mb-4">
        {{ filteredQuotes.length }} quotes found
      </p>
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

const category = ref(null)
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

// computed property for filtered quotes based on search field value and category
const filteredQuotes = computed(() => {
  let filtered = quotes.value
  if (category.value) {
    filtered = filtered.filter(item => item[category.value])
  }
  if (searchFieldValue.value) {
    const searchTerm = searchFieldValue.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.quote.toLowerCase().includes(searchTerm)
    )
  }
  return filtered
})

// clear the search field
const clearSearchField = () => {
  searchFieldValue.value = ''
}

// change the category
const changeCategory = newCategory => {
  if (category.value === newCategory) {
    category.value = null
  } else {
    category.value = newCategory
  }
}

loading.value = false
</script>

<style lang="scss" scoped>
.quote-icon {
  height: 50px;
}
</style>
