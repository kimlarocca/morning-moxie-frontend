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
        <p class="mb-3">
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
                  <div>
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
            <InputMask
              id="phone"
              class="w-full"
              v-model="phone"
              required
              aria-labelledby="phone"
              :mask="`+${selectedCountry?.code} (999) 999-9999`"
              placeholder="Phone Number"
              fluid
            />
          </InputGroup>
        </div>
        <Button label="Continue" class="w-full" type="submit" />
      </form>
      <form v-else @submit.prevent="verify">
        <div class="mb-4">
          <InputOtp integerOnly v-model="otp" :length="6" />
        </div>
        <Button label="Login" class="w-full mb-4" type="submit" />
        <p class="text-center mb-4">
          Didn't receive the code?<br /><a @click="login()">Request again</a>
        </p>
        <p class="small text-center">
          Don't have an account? <a @click="clear()">Sign Up</a>
        </p>
      </form>
    </Transition>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
const config = useRuntimeConfig()
const emit = defineEmits(['closePanel'])

const phone = ref('')
const otp = ref('')
const showOtp = ref(false)
const errorMessage = ref('')

const formattedPhone = computed(() => phone.value.replace(/\D/g, ''))

const selectedCountry = ref({ name: 'United States', code: '1', flag: '🇺🇸' })
const countries = [
  { name: 'United States', code: '1', flag: '🇺🇸' },
  { name: 'Canada', code: '1', flag: '🇨🇦' },
  { name: 'United Kingdom', code: '44', flag: '🇬🇧' },
  { name: 'Australia', code: '61', flag: '🇦🇺' },
  { name: 'Germany', code: '49', flag: '🇩🇪' },
  { name: 'France', code: '33', flag: '🇫🇷' },
  { name: 'India', code: '91', flag: '🇮🇳' },
  { name: 'Japan', code: '81', flag: '🇯🇵' },
  { name: 'China', code: '86', flag: '🇨🇳' },
  { name: 'Brazil', code: '55', flag: '🇧🇷' },
  { name: 'South Africa', code: '27', flag: '🇿🇦' },
  { name: 'Mexico', code: '52', flag: '🇲🇽' },
  { name: 'Russia', code: '7', flag: '🇷🇺' },
  { name: 'Italy', code: '39', flag: '🇮🇹' },
  { name: 'Spain', code: '34', flag: '🇪🇸' },
  { name: 'Netherlands', code: '31', flag: '🇳🇱' },
  { name: 'Sweden', code: '46', flag: '🇸🇪' },
  { name: 'Norway', code: '47', flag: '🇳🇴' },
  { name: 'Denmark', code: '45', flag: '🇩🇰' },
  { name: 'Finland', code: '358', flag: '🇫🇮' },
  { name: 'New Zealand', code: '64', flag: '🇳🇿' },
  { name: 'South Korea', code: '82', flag: '🇰🇷' },
  { name: 'Singapore', code: '65', flag: '🇸🇬' },
  { name: 'Malaysia', code: '60', flag: '🇲🇾' },
  { name: 'Indonesia', code: '62', flag: '🇮🇩' },
  { name: 'Philippines', code: '63', flag: '🇵🇭' },
  { name: 'Thailand', code: '66', flag: '🇹🇭' },
  { name: 'Vietnam', code: '84', flag: '🇻🇳' },
  { name: 'Turkey', code: '90', flag: '🇹🇷' },
  { name: 'Saudi Arabia', code: '966', flag: '🇸🇦' },
  { name: 'United Arab Emirates', code: '971', flag: '🇦🇪' },
  { name: 'Israel', code: '972', flag: '🇮🇱' },
  { name: 'Egypt', code: '20', flag: '🇪🇬' },
  { name: 'Nigeria', code: '234', flag: '🇳🇬' },
  { name: 'Kenya', code: '254', flag: '🇰🇪' },
  { name: 'Argentina', code: '54', flag: '🇦🇷' },
  { name: 'Chile', code: '56', flag: '🇨🇱' },
  { name: 'Colombia', code: '57', flag: '🇨🇴' },
  { name: 'Peru', code: '51', flag: '🇵🇪' },
  { name: 'Venezuela', code: '58', flag: '🇻🇪' }
]

const clear = () => {
  phone.value = ''
  otp.value = ''
  errorMessage.value = ''
  showOtp.value = false
}

const login = async () => {
  const error = await client.auth.signInWithOtp({
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
  const error = await client.auth.verifyOtp(
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
    emit('closePanel')
    return navigateTo('/settings')
  }
}
</script>

<style lang="scss" scoped>
.flag {
  width: 80px;
}
</style>
