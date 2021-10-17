<template>
  <div>
    <BarContainer class="h-12 w-48">
      <button
        type="button"
        class="w-full h-full text-white text-sm flex flex-row items-center justify-between pl-6 pr-4 outline-none"
        @click="toggleDropdown"
      >
        <div>Filter by Region</div>

        <fa-icon :icon="['fas', 'chevron-down']" size="sm" />
      </button>
    </BarContainer>

    <transition
      enter-class="opacity-0 scale-y-0"
      enter-to-class="opacity-100 scale-y-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-50"
    >
      <BarContainer
        v-if="showDropdown"
        class="absolute z-10 mt-1 w-48 origin-top-right transition-all transform duration-300"
      >
        <ul class="px-6 py-4 text-sm space-y-1">
          <li v-for="region in regions" :key="region">
            {{ region }}
          </li>
        </ul>
      </BarContainer>
    </transition>
  </div>
</template>

<script>
import BarContainer from "@/components/BarContainer";

export default {
  name: "FilterSelect",

  components: { BarContainer },

  data() {
    return {
      showDropdown: false,
      regions: ["Africa", "America", "Asia", "Europe", "Oceania"],
    };
  },

  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
};
</script>

<style></style>
