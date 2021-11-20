<template>
  <header class="duration-300 w-full bg-white dark:bg-dark-blue shadow-md">
    <div class="flex flex-row mx-auto justify-between text-white px-vw py-3.5">
      <router-link
        to="/"
        class="font-semibold md:text-xl lg:text-2xl p-2 -ml-2 text-black dark:text-white"
      >
        <span @click="() => this.$root.$emit('go-home')">{{ title }}</span>
      </router-link>

      <button
        class="flex flex-row items-center p-2 outline-none"
        @click="toggleDarkMode"
      >
        <fa-icon
          :icon="[isDarkMode ? 'fas' : 'far', 'moon']"
          class="mr-1.5 md:mr-2 lg:mr-2.5 text-black dark:text-white"
        />
        <span class="font-semibold text-black dark:text-white">Dark Mode</span>
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

      isDarkMode: localStorage.theme === "dark",
    };
  },

  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;

      switch (localStorage.theme) {
        case "dark":
          document.documentElement.classList.remove("dark");
          localStorage.theme = "light";
          break;
        case "light":
          document.documentElement.classList.add("dark");
          localStorage.theme = "dark";
          break;
      }
      console.log(localStorage);
    },
  },
};
</script>
