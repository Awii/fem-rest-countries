<template>
  <header class="w-full bg-dark-blue shadow-md">
    <div class="flex flex-row mx-auto justify-between text-white px-vw py-3.5">
      <router-link
        to="/"
        class="font-semibold md:text-xl lg:text-2xl p-2 -ml-2"
      >
        {{ title }}
      </router-link>

      <button class="flex flex-row items-center p-2" @click="toggleDarkMode">
        <fa-icon
          :icon="[isDarkMode ? 'fas' : 'far', 'moon']"
          class="mr-1.5 md:mr-2 lg:mr-2.5"
        />
        <span class="font-semibold">Dark Mode</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",

  data() {
    return {
      title: "Where in the world?",

      isDarkMode: true,
    };
  },

  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },
  },
};
</script>
