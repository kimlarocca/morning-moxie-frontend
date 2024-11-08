<template>
  <div class="quote-page">
    <SecondaryHero />
    <ProgressSpinner v-if="loading" />
    <div v-else-if="quote" class="container p-4 pt-6">
      <div class="grid">
        <div class="col col-12 lg:col-4 mb-6 lg:mb-0">
          <div class="lg:pr-6">
            <img
              :src="quote.image"
              alt="morning moxie sunrise over lake tahoe"
              class="quote-image"
            />
          </div>
        </div>
        <div class="col col-12 lg:col-8">
          <div class="flex align-items-center gap-2 flex-wrap mb-4">
            <div v-if="quote.hardship" class="tag">hardship</div>
            <div v-if="quote.failure" class="tag">failure</div>
            <div v-if="quote.grief" class="tag">grief</div>
            <div v-if="quote.strength" class="tag">strength</div>
            <div v-if="quote.perseverance" class="tag">perseverance</div>
            <div v-if="quote.determination" class="tag">determination</div>
          </div>
          <div class="flex align-items-start gap-2">
            <Quote />
            <div class="flex flex-column">
              <h1>{{ quote.quote }}</h1>
              <p v-if="quote.author" class="mt-4">- {{ quote.author }}</p>
              <Divider class="my-6" />
              <h5 class="mb-3">What does this quote mean to you?</h5>
              <Textarea
                v-model="commentToAdd"
                placeholder="Type your thoughts here..."
                rows="3"
                class="mb-3"
              />
              <Button
                v-if="user"
                @click="submitComment()"
                class="mb-4 align-self-end"
                label="submit"
              />
              <Button
                v-else
                @click="showLoginMenu()"
                class="mb-4 align-self-end"
                label="log in to post"
              />
            </div>
          </div>
        </div>
      </div>
      <template v-if="comments.length">
        <h2 class="mb-5">Thoughts From Our Users</h2>
        <div v-for="comment in comments" :key="comment.id">
          <h3>{{ comment.comment }}</h3>
          <Divider class="my-5 w-2" />
        </div>
      </template>
    </div>
    <div v-else class="p-4">
      <h1 class="mb-4">Quote not found</h1>
      <p class="mb-4">
        Sorry! We couldn't find the quote you were looking for.
      </p>
      <p>
        <nuxt-link to="/">Click here to return to the home page.</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { images } from '~/assets/images'

const client = useSupabaseClient()
const comments = ref([])
const loading = ref(true)
const commentToAdd = ref(null)
const route = useRoute()
const showLogin = useLoginMenu()
const showMenu = useMainMenu()
const user = useSupabaseUser()

const { data: quote, error: quoteError } = await client
  .from('quotes')
  .select('*')
  .eq('slug', route.params.slug)
  .single()
if (quoteError) {
  console.error('quotes database error', quoteError)
}

const getComments = async () => {
  const { data, error } = await client
    .from('comments')
    .select('*')
    .eq('slug', route.params.slug)
  if (error) {
    console.error('comments database error', error)
  } else {
    comments.value = data
  }
}

// submit a comment
const submitComment = async () => {
  console.log('submitComment 1', commentToAdd.value)
  if (commentToAdd.value) {
    console.log('submitComment 2', commentToAdd.value)
    const { data, error } = await client.from('comments').insert([
      {
        slug: route.params.slug,
        comment: commentToAdd.value,
        uuid: user.value.id
      }
    ])
    if (error) {
      console.error('comment database error', error)
    } else {
      getComments()
      commentToAdd.value = null
    }
  }
}

// show login menu
const showLoginMenu = () => {
  showMenu.value = true
  showLogin.value = true
}

onMounted(async () => {
  getComments()
  loading.value = false
})
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
