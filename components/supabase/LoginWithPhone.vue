<template>
  <div>
    <template v-if="errorMessage">
      <Message class="mb-4" severity="error">
        Sorry, there was a problem logging in to your account:
        {{ errorMessage }}
      </Message>
    </template>
    <Transition name="slide-fade">
      <form v-if="!showOtp" @submit.prevent="login">
        <h6 v-if="signup" class="mb-3">Enter your phone number:</h6>
        <p v-else class="mb-3">
          Enter the phone number Morning Moxie uses to send you messages:
        </p>
        <div class="mb-3">
          <InputGroup>
            <Dropdown
              v-model="selectedCountry"
              :options="countries"
              optionLabel="name"
              placeholder="Select a Country"
              class="flag"
              aria-label="name"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div style="margin-top: -4px">
                    {{ slotProps.value.flag }}
                  </div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>
                    {{ slotProps.option.flag }} {{ slotProps.option.name }} (+{{
                      slotProps.option.code
                    }})
                  </div>
                </div>
              </template>
            </Dropdown>
            <InputNumber
              type="tel"
              id="phone"
              class="w-full"
              v-model="phone"
              :model-value="phone"
              @input="e => (phone = e.value)"
              required
              inputId="withoutgrouping"
              :useGrouping="false"
              aria-labelledby="phone"
              :prefix="`+${selectedCountry?.code} `"
              :placeholder="`Your ${selectedCountry?.name} Phone Number`"
              fluid
            />
          </InputGroup>
        </div>
        <div v-if="signup" class="mb-4 pl-3 flex">
          <Checkbox required v-model="checked" binary class="mt-1" />
          <p class="text-sm pl-3 mb-1">
            I consent to receive SMS from Morning Moxie.<br />Msg&data rates may
            apply, reply STOP to opt out, HELP for help.
          </p>
        </div>
        <Button
          :disabled="!phone"
          label="Continue"
          class="w-full"
          type="submit"
        />
      </form>
      <form v-else-if="!showConfirmation" @submit.prevent="verify">
        <p class="mb-3">
          A verification code was sent to {{ selectedCountry?.code
          }}{{ phone }}. Please enter it below:
        </p>
        <div class="mb-4">
          <InputOtp :autofocus="true" integerOnly v-model="otp" :length="6" />
        </div>
        <Button
          :label="signup ? 'Signup' : 'Login'"
          class="w-full mb-4"
          type="submit"
        />
        <p class="text-center mb-4">
          Didn't receive the code?<br />
          <a class="clickable" @click="login()"> Request again </a>
        </p>
        <p class="small text-center">
          Don't have an account?
          <a class="clickable" @click="signup()">Sign Up</a>
        </p>
      </form>
    </Transition>
    <Transition name="slide-fade">
      <Message v-if="showConfirmation" severity="success" :closable="false">
        Looks like you already have a Morning Moxie account! You are now logged
        in.
        <nuxt-link to="/settings"> Click here </nuxt-link> to go to your account
        settings.
      </Message>
    </Transition>
  </div>
</template>

<script setup>
const currentUser = useSupabaseUser()
const currentUserProfile = useCurrentUserProfile()
const supabase = useSupabaseClient()

const config = useRuntimeConfig()
const emit = defineEmits(['closePanel'])

const props = defineProps({
  signup: {
    type: Boolean,
    default: false
  }
})

const checked = ref(false)
const errorMessage = ref(null)
const otp = ref(null)
const phone = ref(null)
const showConfirmation = ref(false)
const showOtp = ref(false)

const formattedPhone = computed(() => {
  if (phone.value) {
    return `${selectedCountry.value.code}${phone.value}`
  }
  return null
})

const selectedCountry = ref({
  name: 'United States',
  code: '1',
  flag: '🇺🇸',
  mask: '(999) 999-9999'
})
const countries = [
  { name: 'Australia', code: '61', flag: '🇦🇺', mask: '(99) 9999-9999' },
  { name: 'Belgium', code: '32', flag: '🇧🇪', mask: '(999) 999-999' },
  { name: 'Canada', code: '1', flag: '🇨🇦', mask: '(999) 999-9999' },
  { name: 'China', code: '86', flag: '🇨🇳', mask: '(999) 9999-9999' },
  { name: 'Hong Kong', code: '852', flag: '🇭🇰', mask: '(999) 9999-9999' },
  { name: 'Ireland', code: '353', flag: '🇮🇪', mask: '(999) 999-999' },
  { name: 'Macau', code: '853', flag: '🇲🇴', mask: '(999) 9999-9999' },
  { name: 'New Zealand', code: '64', flag: '🇳🇿', mask: '(99) 999-9999' },
  { name: 'Puerto Rico', code: '1787', flag: '🇵🇷', mask: '(999) 999-9999' },
  { name: 'Singapore', code: '65', flag: '🇸🇬', mask: '(99) 9999-9999' },
  { name: 'Spain', code: '34', flag: '🇪🇸', mask: '(999) 999-999' },
  { name: 'United Kingdom', code: '44', flag: '🇬🇧', mask: '(999) 999-9999' },
  { name: 'United States', code: '1', flag: '🇺🇸', mask: '(999) 999-9999' }
]

const signup = () => {
  phone.value = ''
  otp.value = ''
  errorMessage.value = ''
  showOtp.value = false
  emit('closePanel')
  return navigateTo('/signup')
}

const login = async () => {
  const error = await supabase.auth.signInWithOtp({
    phone: `+${formattedPhone.value}`,
    options: {
      data: {
        phone: formattedPhone.value
      }
    }
  })
  if (error.error) {
    console.log(error)
    if (error?.error?.message?.includes('Invalid login credentials')) {
      errorMessage.value = 'Invalid login credentials. Please try again!'
    } else {
      errorMessage.value = error
    }
  } else {
    showOtp.value = true
  }
}

const verify = async () => {
  const error = await supabase.auth.verifyOtp(
    { phone: formattedPhone.value, token: otp.value, type: 'sms' },
    { redirectTo: config.supabaseAuthSignInRedirectTo }
  )
  if (error.error) {
    console.log(error)
    if (error?.error?.message?.includes('Invalid login credentials')) {
      errorMessage.value = 'Invalid login credentials. Please try again!'
    } else {
      errorMessage.value = error
    }
  } else {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', currentUser.value.id)
      .single()
    if (error) {
      console.error(error)
    } else if (data) {
      currentUserProfile.value = data
      if (!currentUserProfile.value?.onboarded) {
        emit('closePanel')
        return navigateTo('/onboarding')
      } else {
        emit('closePanel')
        showConfirmation.value = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flag {
  width: 80px;
}
</style>
