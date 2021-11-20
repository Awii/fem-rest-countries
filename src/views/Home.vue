<template>
  <div class="min-h-screen bg-dark-blue-dark">
    <AppHeader />

    <div class="py-12 px-vw">
      <div
        class="flex flex-col md:flex-row md:justify-between space-y-6 md:space-y-0"
      >
        <SearchBar @on-input="updateSearch" />
        <FilterSelect @on-filter="updateContinent" />
      </div>

      <div v-if="countries" class="pt-12 md:-mx-9 -my-9 grid grid-cols-fill">
        <router-link
          v-for="(country, index) in limitArray(countries, limit)"
          :key="index"
          :to="{
            name: 'Country',
            params: {
              country: country.name.common.toLowerCase(),
              currentCountry: country,
              allCountries: allCountries,
            },
          }"
        >
          <CardCountry
            class="w-full mx-auto md:w-auto md:mx-9 my-8 max-w-md self-start"
            :name="country.name.common"
            :imgPath="country.flags.png"
            :population="country.population"
            :region="country.region"
            :capital="country.capital"
          />
        </router-link>
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
      allCountries: null,
      countries: null,
      filter: { search: "", continent: "" },
      limit: 12,
      options: { rootMargin: "500px" },
    };
  },

  methods: {
    limitArray(array, limit) {
      return array.length > limit ? array.slice(0, limit) : array;
    },

    updateSearch(input) {
      this.filter.search = input;
      this.updateCountries();
    },

    updateContinent(input) {
      input = input == "all" ? "" : input;
      this.filter.continent = input;
      this.updateCountries();
    },

    updateCountries() {
      this.countries = this.allCountries.filter((country) => {
        return (
          country.name.common.toLowerCase().includes(this.filter.search) &&
          country.region.toLowerCase().includes(this.filter.continent)
        );
      });
    },

    filterContinent(input) {
      this.filter;
      this.countries = this.countries.filter((country) => {
        return country.region.toLowerCase().includes(input.toLowerCase());
      });
    },
  },

  created() {
    // fetch all countries with needed fields and sort by name
    fetch(
      `https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders,cca3`
    )
      .then((response) => response.json())
      .then((data) => {
        this.allCountries = data.sort((a, b) => {
          return a.name.common > b.name.common ? 1 : -1;
        });
        this.countries = this.allCountries;
      });

    this.$root.$on("go-home", () => {
      this.filter.search = "";
      this.filter.continent = "";
      this.updateCountries();

      this.$root.$emit("clear-search");

      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    });
  },
};
</script>
