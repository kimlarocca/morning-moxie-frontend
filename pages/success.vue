<template>
  <div class="success">
    <Html lang="en">
      <Head>
        <Title>Morning Moxie | Success!</Title>
      </Head>
    </Html>
    <SecondaryHero />
    <div class="container p-4">
      <h1 class="mb-3">Success!</h1>
      <h3 class="mb-2">Your email was successfully verified</h3>
      <Divider class="mb-4 pt-6 w-4 lg:w-2" />
      <p class="mb-4">Please login to your new account to continue:</p>
      <SupabaseLoginWithEmail class="width400" />
    </div>
  </div>
</template>
