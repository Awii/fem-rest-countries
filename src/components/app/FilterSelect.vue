<template>
  <div class="duration-300">
    <BarContainer class="h-14 w-48">
      <button
        type="button"
        class="w-full h-full text-sm flex flex-row items-center justify-between pl-6 pr-4 outline-none"
        @click="() => (this.showDropdown = !this.showDropdown)"
        @focusout="() => (this.showDropdown = false)"
      >
        <div>{{ selectedRegion || "Filter by Region" }}</div>

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
        <div class="px-4 py-3 text-sm flex flex-col items-start">
          <button
            type="button"
            v-for="region in regions"
            :key="region"
            class="p-1"
            @click="emitRegion(region)"
          >
            {{ region }}
          </button>
        </div>
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
      selectedRegion: null,
      regions: ["All", "Africa", "America", "Asia", "Europe", "Oceania"],
    };
  },

  methods: {
    emitRegion(region) {
      if (region == "All") {
        this.selectedRegion = null;
      } else {
        this.selectedRegion = region;
      }
      this.$emit("on-filter", region.toLowerCase());
    },
  },
};
</script>

<style></style>
