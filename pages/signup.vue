<template>
  <div class="signup">
    <Html lang="en">
      <Head>
        <Title>Morning Moxie | Sign Up</Title>
      </Head>
    </Html>
    <SecondaryHero />
    <div class="container p-4">
      <h1 class="mb-3">Sign Up</h1>
      <p>
        Please fill out the form below to get started or to get access to manage
        your current subscription.
      </p>
      <divider class="my-6 w-2" />
      <div class="width400">
        <supabase-signup-with-email class="mb-6" />
      </div>
    </div>
  </div>
</template>
