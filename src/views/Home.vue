<template>
  <div class="min-h-screen bg-dark-blue-dark">
    <AppHeader />

    <div class="py-12 px-vw">
      <div
        class="flex flex-col md:flex-row md:justify-between space-y-6 md:space-y-0"
      >
        <SearchBar />
        <FilterSelect />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/app/AppHeader";
import SearchBar from "@/components/app/SearchBar";
import FilterSelect from "@/components/app/FilterSelect";

export default {
  name: "Home",

  components: {
    AppHeader,
    SearchBar,
    FilterSelect,
  },
};
</script>
