<template>
  <div class="min-h-screen bg-dark-blue-dark">
    <AppHeader @go-home="updateCountries" />

    <div class="py-12 px-vw">
      <div
        class="flex flex-col md:flex-row md:justify-between space-y-6 md:space-y-0"
      >
        <SearchBar @on-input="updateCountries" />
        <FilterSelect @on-filter="updateCountries" />
      </div>

      <div
        v-if="countries && countries.length"
        class="pt-12 md:-mx-9 -my-9 grid grid-cols-fill"
      >
        <CardCountry
          v-for="(country, index) in limitArray(sortedCountries, limit)"
          :key="index"
          class="w-full mx-auto md:w-auto md:mx-9 my-8 max-w-md self-start"
          :imgPath="country.flags.png"
          :name="country.name.common"
          :population="country.population"
          :region="country.region"
          :capital="country.capital"
        />
        <AppObserver @observe="limit += 12" :options="options" />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/app/AppHeader";
import SearchBar from "@/components/app/SearchBar";
import FilterSelect from "@/components/app/FilterSelect";
import CardCountry from "@/components/CardCountry";
import AppObserver from "@/components/app/AppObserver";

export default {
  name: "Home",

  components: {
    AppHeader,
    SearchBar,
    FilterSelect,
    CardCountry,
    AppObserver,
  },

  data() {
    return {
      countries: null,
      limit: 12,
      options: { rootMargin: "500px" },
    };
  },

  methods: {
    limitArray(array, limit) {
      return array.length > limit ? array.slice(0, limit) : array;
    },

    updateCountries(input = null, isRegion = false) {
      const fields = [
        "name",
        "flags",
        "population",
        "region",
        "capital",
        "borders",
      ].join(",");

      let call;

      if (isRegion && input != "all") {
        call = `region/${input}`;
      } else if (input) {
        call = `name/${input}?${fields}`;
      } else {
        call = `all?${fields}`;
      }

      fetch(`https://restcountries.com/v3.1/${call}`)
        .then((response) => response.json())
        .then((data) => {
          this.countries = data;
          isRegion ? this.updateRoute() : this.updateRoute(input);
        });
    },

    updateRoute(input) {
      // avoid redundant navigation to same route, during refresh or multiple submits
      if (input) {
        if (input != this.$route.query.s)
          this.$router.push({ path: "/", query: { s: input } });
      } else {
        if (this.$route.query.s) {
          this.$router.push({ path: "/" }); // remove query when search bar is empty
        }
      }
    },
  },

  computed: {
    sortedCountries() {
      return this.countries.slice(0).sort((a, b) => {
        return a.name.common > b.name.common ? 1 : -1;
      });
    },
  },
};
</script>
