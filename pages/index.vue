<template>
  <div class="home">
    <Hero class="mb-6 lg:mb-6" />
    <div class="px-4">
      <div class="grid">
        <div class="col col-12 lg:col-6 mb-4">
          <img
            class="rounded"
            src="/images/sunrise-meditation.jpg"
            alt="Sunrise Meditation with Morning Moxie"
          />
        </div>
        <div class="col col-12 lg:col-6 mb-4">
          <div class="p-2">
            <signup class="mb-4" />
          </div>
        </div>
      </div>
    </div>
    <divider class="my-6 lg:hidden" />
    <div class="p-4">
      <h2 class="mb-2 text-center">We're More Than Just Messages</h2>
      <h3 class="mb-6 text-center">
        Morning Moxie is a Community & Space For Reflection
      </h3>
      <div class="grid">
        <div class="col col-12 lg:col-4 mb-4">
          <div class="card h-full">
            <div class="flex align-items-center mb-2">
              <icons-lightbulb />
              <h6 style="margin-left: -0.6rem">Daily Messages</h6>
            </div>
            <h3 class="mb-3">Moments Of Clarity</h3>
            <p>
              Let us help you find balance in the chaos. Wake up to messages
              designed to uplift, empower, and help you face life's challenges
              with resilience.
            </p>
          </div>
        </div>
        <div class="col col-12 lg:col-4 mb-4">
          <div class="card h-full">
            <div class="flex align-items-center mb-2">
              <icons-pencil />
              <h6>Private Journal</h6>
            </div>
            <h3 class="mb-3">Dive Deeper</h3>
            <p>
              With your own private and personal journal, you can reflect on
              your thoughts, track your growth, and process your feelings in
              your own words.
            </p>
          </div>
        </div>
        <div class="col col-12 lg:col-4 mb-4">
          <div class="card h-full">
            <div class="flex align-items-center mb-2">
              <icons-chat />
              <h6 style="margin-left: 0.8rem">Message Boards</h6>
            </div>
            <h3 class="mb-3">A Sense Of Connection</h3>
            <p>
              Discover a supportive community by exploring our user message
              board, where members share their perspectives on the quotes that
              moved them.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  background-color: rgba(198, 221, 215, 0.4);
  border-radius: 20px;
  padding: 2rem;
  .icon {
    width: 3rem;
    height: 3rem;
  }
}
</style>
