<template>
  <BarContainer class="h-14 w-full md:w-3/5 lg:w-1/2 md:max-w-lg px-6">
    <fa-icon :icon="['fas', 'search']" class="text-black dark:text-white" />
    <input
      class="appearance-none bg-transparent w-full h-full pl-6 focus:outline-none placeholder-black dark:placeholder-white text-sm"
      placeholder="Search for a country..."
      type="text"
      v-model="input"
      @keyup="() => this.$emit('on-input', this.input.toLowerCase())"
    />
  </BarContainer>
</template>

<script>
import BarContainer from "@/components/BarContainer";

export default {
  name: "SearchBar",

  components: {
    BarContainer,
  },

  data() {
    return {
      input: "",
    };
  },

  created() {
    this.$root.$on("clear-search", () => {
      this.input = "";
    });
  },
};
</script>
