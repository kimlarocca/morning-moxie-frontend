<template>
  <div v-if="profile && profile.length > 0">
    <h6 class="mb-2">Name</h6>
    <InputText
      v-model="fullName"
      placeholder="Enter your full name here"
      @change="updateProfile"
      class="mb-4"
    />
    <h6 class="mb-3">Timezone</h6>
    <p class="small mb-3">
      Your daily message will be sent at 6am in your selected timezone:
    </p>
    <Dropdown
      v-model="timezone"
      :options="timezones"
      optionLabel="timezone"
      placeholder="Select a Timezone"
      @change="updateProfile"
      class="mb-2"
    />
  </div>
  <div class="changes-saved-toast">
    <Message
      v-if="successMessage"
      class="mb-4"
      severity="success"
      :closable="false"
      :sticky="false"
    >
      Your changes have been saved.
    </Message>
  </div>
</template>

<script setup>
const currentUser = useSupabaseUser()
const currentUserProfile = useCurrentUserProfile()
const supabase = useSupabaseClient()

const fullName = ref(null)
const profile = ref([])
const successMessage = ref(false)
const timezone = ref(null)

const timezones = [
  {
    city: 'Pago Pago, American Samoa',
    timezone: 'SST - Samoa Standard Time',
    utcSendHour: 17
  },
  {
    city: 'Honolulu, Hawaii, USA',
    timezone: 'HST - Hawaii Standard Time',
    utcSendHour: 16
  },
  {
    city: 'Anchorage, Alaska, USA',
    timezone: 'AKST - Alaska Standard Time',
    utcSendHour: 15
  },
  {
    city: 'Los Angeles, California, USA',
    timezone: 'PST - Pacific Standard Time',
    utcSendHour: 14
  },
  {
    city: 'Denver, Colorado, USA',
    timezone: 'MST - Mountain Standard Time',
    utcSendHour: 13
  },
  {
    city: 'Mexico City, Mexico',
    timezone: 'CST - Central Standard Time',
    utcSendHour: 12
  },
  {
    city: 'New York, USA',
    timezone: 'EST - Eastern Standard Time',
    utcSendHour: 11
  },
  {
    city: 'Caracas, Venezuela',
    timezone: 'VET - Venezuela Time',
    utcSendHour: 10
  },
  {
    city: 'Buenos Aires, Argentina',
    timezone: 'ART - Argentina Time',
    utcSendHour: 9
  },
  {
    city: 'South Georgia, South Sandwich Islands',
    timezone: 'GST - South Georgia Time',
    utcSendHour: 8
  },
  { city: 'Azores, Portugal', timezone: 'AZOT - Azores Time', utcSendHour: 7 },
  {
    city: 'London, United Kingdom',
    timezone: 'GMT - Greenwich Mean Time',
    utcSendHour: 6
  },
  {
    city: 'Paris, France',
    timezone: 'CET - Central European Time',
    utcSendHour: 5
  },
  {
    city: 'Cairo, Egypt',
    timezone: 'EET - Eastern European Time',
    utcSendHour: 4
  },
  {
    city: 'Moscow, Russia',
    timezone: 'MSK - Moscow Standard Time',
    utcSendHour: 3
  },
  {
    city: 'Dubai, United Arab Emirates',
    timezone: 'GST - Gulf Standard Time',
    utcSendHour: 2
  },
  {
    city: 'Tashkent, Uzbekistan',
    timezone: 'UZT - Uzbekistan Time',
    utcSendHour: 1
  },
  {
    city: 'Dhaka, Bangladesh',
    timezone: 'BST - Bangladesh Standard Time',
    utcSendHour: 0
  },
  {
    city: 'Bangkok, Thailand',
    timezone: 'ICT - Indochina Time',
    utcSendHour: 23
  },
  {
    city: 'Beijing, China',
    timezone: 'CST - China Standard Time',
    utcSendHour: 22
  },
  {
    city: 'Tokyo, Japan',
    timezone: 'JST - Japan Standard Time',
    utcSendHour: 21
  },
  {
    city: 'Sydney, Australia',
    timezone: 'AEST - Australian Eastern Standard Time',
    utcSendHour: 20
  },
  {
    city: 'Sydney, Australia',
    timezone: 'AEDT - Australian Eastern Standard Time',
    utcSendHour: 20
  },
  {
    city: 'Honiara, Solomon Islands',
    timezone: 'SBT - Solomon Islands Time',
    utcSendHour: 19
  },
  { city: 'Suva, Fiji', timezone: 'FJT - Fiji Time', utcSendHour: 18 }
]

// get the profile for the logged in user
let { data } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', currentUser.value.id)
  .limit(1)
if (data) {
  profile.value = data
  fullName.value = data[0]?.full_name
  timezone.value = data[0]?.timezone
}

const updateProfile = async () => {
  successMessage.value = false
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: currentUser.value.id,
      updated_at: new Date().toISOString(),
      full_name: fullName.value,
      timezone: timezone.value,
      utc_send_hour: timezone.value?.utcSendHour
    })
    .match({ id: currentUser.value.id })
  if (error) {
    console.log('updateProfile error', error)
  } else {
    successMessage.value = true
    currentUserProfile.value.full_name = fullName.value
    currentUserProfile.value.timezone = timezone.value
  }
}
</script>
