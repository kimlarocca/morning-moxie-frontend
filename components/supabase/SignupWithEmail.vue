<template>
  <div>
    <template v-if="errorMessage">
      <Message class="mb-4" severity="error">
        {{ errorMessage }}
      </Message>
    </template>
    <template v-if="successMessage">
      <Message class="mb-4" severity="success">
        {{ successMessage }}
      </Message>
    </template>
    <form v-if="!successMessage" @submit.prevent="login">
      <div class="mb-3">
        <p class="text-sm pl-3 mb-1">Phone Number</p>
        <InputMask
          id="phone"
          v-model="phone"
          mask="(999) 999-9999"
          placeholder="(999) 999-9999"
          fluid
          required
        />
      </div>
      <div class="mb-3">
        <p class="text-sm pl-3 mb-1">Email Address</p>
        <InputText
          id="email"
          v-model="email"
          class="w-full"
          type="email"
          placeholder="email address"
          required
        />
      </div>
      <div class="mb-4">
        <p class="text-sm pl-3 mb-1">Password</p>
        <Password
          id="password"
          toggleMask
          :feedback="false"
          v-model="password"
          class="w-full"
          type="password"
          placeholder="password"
          required
        />
      </div>
      <div class="mb-4 pl-3 flex">
        <Checkbox v-model="checked" binary class="mt-1" />
        <p class="text-sm pl-3 mb-1">
          I consent to receive SMS from Morning Moxie.<br />Msg&data rates may
          apply, reply STOP to opt out, HELP for help.
        </p>
      </div>
      <Button label="sign up" class="w-full" type="submit" />
    </form>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const config = useRuntimeConfig()

const checked = ref(false)
const phone = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const login = async () => {
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: config.supabaseSuccessRedirectTo
    }
  })
  if (error) {
    console.log(error)
    if (error.toString().includes('already registered')) {
      errorMessage.value =
        'Looks like you already have an account! If you do not remember your password, you can retrieve it by clicking the "Forgot Password" link below.'
    } else {
      errorMessage.value = `Sorry, there was a problem creating this account. Please try signing up again! Error message: ${error.message}`
    }
  } else {
    successMessage.value =
      'Success! Please check your email for a confirmation link. If you do not receive a confirmation link, you may already have an account. Please be sure to check your spam or junk folder as well.'
  }
}
</script>
