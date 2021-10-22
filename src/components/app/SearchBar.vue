<template>
  <BarContainer class="h-12 w-full md:w-3/5 lg:w-1/2 md:max-w-lg px-6">
    <fa-icon :icon="['fas', 'search']" />
    <input
      class="appearance-none bg-transparent w-full h-full pl-6 text-white focus:outline-none placeholder-white text-sm"
      placeholder="Search for a country..."
      type="text"
      v-model="input"
      v-debounce:500ms="handleInput"
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
    if (this.$route.query.s) {
      this.input = this.$route.query.s; // set search bar
      this.handleInput(this.$route.query.s);
    } else {
      this.handleInput();
    }

    this.$root.$on("clear-search", () => {
      this.input = "";
    });
  },

  methods: {
    handleInput(input) {
      this.$emit("on-input", input);
    },
  },
};
</script>
