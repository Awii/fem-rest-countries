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

      <div
        v-if="countries && countries.length"
        class="pt-12 md:-mx-9 -my-9 grid grid-cols-fill"
      >
        <CardCountry
          v-for="(country, index) in countries"
          :key="index"
          class="w-full mx-auto md:w-auto md:mx-9 my-8 max-w-md self-start"
          :imgPath="country.flags.png"
          :name="country.name"
          :population="country.population"
          :region="country.region"
          :capital="country.capital"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/app/AppHeader";
import SearchBar from "@/components/app/SearchBar";
import FilterSelect from "@/components/app/FilterSelect";
import CardCountry from "@/components/CardCountry";

export default {
  name: "Home",

  data() {
    return {
      countries: null,
    };
  },

  components: {
    AppHeader,
    SearchBar,
    FilterSelect,
    CardCountry,
  },

  /*
  created() {
    fetch("https://restcountries.com/v2/name/x")
      .then((response) => response.json())
      .then((data) => {
        this.countries = data;
      });
  },
  */
};
</script>
