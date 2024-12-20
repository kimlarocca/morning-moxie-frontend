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
              type="tel"
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
        <div v-if="signup" class="mb-4 pl-3 flex">
          <Checkbox required v-model="checked" binary class="mt-1" />
          <p class="text-sm pl-3 mb-1">
            I consent to receive SMS from Morning Moxie.<br />Msg&data rates may
            apply, reply STOP to opt out, HELP for help.
          </p>
        </div>
        <Button label="Continue" class="w-full" type="submit" />
      </form>
      <form v-else-if="!showConfirmation" @submit.prevent="verify">
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
        <nuxt-link to="/settings">
          Go to account settings <i class="pi pi-angle-right" />
        </nuxt-link>
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
const errorMessage = ref('')
const otp = ref('')
const phone = ref('')
const showConfirmation = ref(false)
const showOtp = ref(false)

const formattedPhone = computed(() => phone.value.replace(/\D/g, ''))

const selectedCountry = ref({ name: 'United States', code: '1', flag: '🇺🇸' })
const countries = [
  { name: 'United States', code: '1', flag: '🇺🇸' },
  { name: 'Albania', code: '355', flag: '🇦🇱' },
  { name: 'Andorra', code: '376', flag: '🇦🇩' },
  { name: 'Austria', code: '43', flag: '🇦🇹' },
  { name: 'Belarus', code: '375', flag: '🇧🇾' },
  { name: 'Belgium', code: '32', flag: '🇧🇪' },
  { name: 'Bolivia', code: '591', flag: '🇧🇴' },
  { name: 'Bosnia and Herzegovina', code: '387', flag: '🇧🇦' },
  { name: 'Bulgaria', code: '359', flag: '🇧🇬' },
  { name: 'China', code: '86', flag: '🇨🇳' },
  { name: 'Croatia', code: '385', flag: '🇭🇷' },
  { name: 'Cyprus', code: '357', flag: '🇨🇾' },
  { name: 'Czech Republic', code: '420', flag: '🇨🇿' },
  { name: 'Denmark', code: '45', flag: '🇩🇰' },
  { name: 'Ecuador', code: '593', flag: '🇪🇨' },
  { name: 'Estonia', code: '372', flag: '🇪🇪' },
  { name: 'Falkland Islands', code: '500', flag: '🇫🇰' },
  { name: 'Finland', code: '358', flag: '🇫🇮' },
  { name: 'France', code: '33', flag: '🇫🇷' },
  { name: 'French Guiana', code: '594', flag: '🇬🇫' },
  { name: 'Germany', code: '49', flag: '🇩🇪' },
  { name: 'Greece', code: '30', flag: '🇬🇷' },
  { name: 'Guyana', code: '592', flag: '🇬🇾' },
  { name: 'Hong Kong', code: '852', flag: '🇭🇰' },
  { name: 'Hungary', code: '36', flag: '🇭🇺' },
  { name: 'Iceland', code: '354', flag: '🇮🇸' },
  { name: 'India', code: '91', flag: '🇮🇳' },
  { name: 'Indonesia', code: '62', flag: '🇮🇩' },
  { name: 'Ireland', code: '353', flag: '🇮🇪' },
  { name: 'Italy', code: '39', flag: '🇮🇹' },
  { name: 'Japan', code: '81', flag: '🇯🇵' },
  { name: 'Laos', code: '856', flag: '🇱🇦' },
  { name: 'Latvia', code: '371', flag: '🇱🇻' },
  { name: 'Liechtenstein', code: '423', flag: '🇱🇮' },
  { name: 'Lithuania', code: '370', flag: '🇱🇹' },
  { name: 'Luxembourg', code: '352', flag: '🇱🇺' },
  { name: 'Macau', code: '853', flag: '🇲🇴' },
  { name: 'Malaysia', code: '60', flag: '🇲🇾' },
  { name: 'Maldives', code: '960', flag: '🇲🇻' },
  { name: 'Malta', code: '356', flag: '🇲🇹' },
  { name: 'Mexico', code: '52', flag: '🇲🇽' },
  { name: 'Moldova', code: '373', flag: '🇲🇩' },
  { name: 'Monaco', code: '377', flag: '🇲🇨' },
  { name: 'Montenegro', code: '382', flag: '🇲🇪' },
  { name: 'Netherlands', code: '31', flag: '🇳🇱' },
  { name: 'New Zealand', code: '64', flag: '🇳🇿' },
  { name: 'North Macedonia', code: '389', flag: '🇲🇰' },
  { name: 'Norway', code: '47', flag: '🇳🇴' },
  { name: 'Paraguay', code: '595', flag: '🇵🇾' },
  { name: 'Peru', code: '51', flag: '🇵🇪' },
  { name: 'Philippines', code: '63', flag: '🇵🇭' },
  { name: 'Poland', code: '48', flag: '🇵🇱' },
  { name: 'Portugal', code: '351', flag: '🇵🇹' },
  { name: 'Puerto Rico', code: '1787', flag: '🇵🇷' },
  { name: 'Romania', code: '40', flag: '🇷🇴' },
  { name: 'Russia', code: '7', flag: '🇷🇺' },
  { name: 'San Marino', code: '378', flag: '🇸🇲' },
  { name: 'Serbia', code: '381', flag: '🇷🇸' },
  { name: 'Singapore', code: '65', flag: '🇸🇬' },
  { name: 'Slovakia', code: '421', flag: '🇸🇰' },
  { name: 'Slovenia', code: '386', flag: '🇸🇮' },
  { name: 'South Africa', code: '27', flag: '🇿🇦' },
  { name: 'Spain', code: '34', flag: '🇪🇸' },
  { name: 'Suriname', code: '597', flag: '🇸🇷' },
  { name: 'Sweden', code: '46', flag: '🇸🇪' },
  { name: 'Switzerland', code: '41', flag: '🇨🇭' },
  { name: 'Taiwan', code: '886', flag: '🇹🇼' },
  { name: 'Thailand', code: '66', flag: '🇹🇭' },
  { name: 'Turkiye', code: '90', flag: '🇹🇷' },
  { name: 'Ukraine', code: '380', flag: '🇺🇦' },
  { name: 'United Kingdom', code: '44', flag: '🇬🇧' },
  { name: 'Uruguay', code: '598', flag: '🇺🇾' },
  { name: 'Vatican City', code: '379', flag: '🇻🇦' },
  { name: 'Venezuela', code: '58', flag: '🇻🇪' },
  { name: 'Vietnam', code: '84', flag: '🇻🇳' }
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
