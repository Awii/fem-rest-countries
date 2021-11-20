<template>
  <div class="min-h-screen bg-dark-blue-dark">
    <AppHeader />
    <div class="py-12 px-vw">
      <BarContainer class="inline-flex">
        <button class="h-10 px-9 flex flex-row items-center outline-none">
          <fa-icon :icon="['fas', 'long-arrow-alt-left']" />
          <div class="ml-4 text-sm" @click="() => this.$root.$emit('go-home')">
            Back
          </div>
        </button>
      </BarContainer>
      <div
        class="flex flex-col md:flex-row md:space-x-16 lg:space-x-20 xl:space-x-28 2xl:space-x-36 mt-16 md:mt-20 text-white md:items-center"
        v-if="country"
      >
        <img
          :src="country.flags.png"
          class="w-full max-h-112 md:w-1/2 lg:w-2/5 object-contain"
        />

        <div class="mt-12 md:mt-0">
          <h1 class="font-bold text-3xl mb-8">
            {{ country.name.common }}
          </h1>
          <div
            class="flex flex-col lg:flex-row lg:space-x-16 xl:space-x-28 2xl:space-x-36 space-y-10 lg:space-y-0"
          >
            <section class="space-y-2.5">
              <p v-if="Object.keys(country.name.nativeName).length">
                <span class="font-semibold">Native name: </span>
                {{
                  country.name.nativeName[
                    Object.keys(country.name.nativeName)[0]
                  ].common
                }}
              </p>
              <p>
                <span class="font-semibold">Population: </span>
                {{ country.population.toLocaleString() }}
              </p>
              <p>
                <span class="font-semibold">Region: </span>
                {{ country.region }}
              </p>
              <p v-if="country.subregion">
                <span class="font-semibold">Sub Region: </span>
                {{ country.subregion }}
              </p>
              <p v-if="country.capital.length">
                <span class="font-semibold">Capital: </span>
                {{ country.capital.join(", ") }}
              </p>
            </section>

            <section class="space-y-2.5 max-w-xs">
              <p>
                <span class="font-semibold">Top Level Domain: </span>
                {{ country.tld.join(", ") }}
              </p>
              <p v-if="Object.keys(country.currencies).length">
                <span class="font-semibold">Currencies: </span>
                {{ formatCurrencies(country.currencies) }}
              </p>
              <p v-if="Object.keys(country.languages).length">
                <span class="font-semibold">Languages: </span>
                {{ Object.values(country.languages).join(", ") }}
              </p>
            </section>
          </div>

          <section
            class="mt-12 space-y-2 md:space-y-2"
            v-if="borderCountries.length"
          >
            <span class="mr-3 mb-2 md:mb-0 block lg:inline-block"
              >Border countries:</span
            >
            <BarContainer
              v-for="(border, index) in borderCountries"
              :key="index"
              class="inline-flex mr-2"
            >
              <router-link
                class="w-full h-full py-1.5 px-8 text-xs outline-none"
                :to="{
                  name: 'Country',
                  params: {
                    country: border.name.common.toLowerCase(),
                    currentCountry: border,
                    allCountries: countries,
                  },
                }"
              >
                {{ border.name.common }}
              </router-link>
            </BarContainer>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/app/AppHeader";
import BarContainer from "@/components/BarContainer";

export default {
  name: "Home",

  props: {
    currentCountry: {
      type: Object,
    },

    allCountries: {
      type: Array,
    },
  },

  components: {
    AppHeader,
    BarContainer,
  },

  data() {
    return {
      country: null,
      countries: null,
      borderCountries: null,
    };
  },

  methods: {
    formatCurrencies(obj) {
      let currencies = [];

      Object.values(obj).forEach((item) => {
        currencies.push(item.name);
      });

      return currencies.join(", ");
    },

    updateCountries() {
      // if no props (upon refresh), fetch all countries with needed fields
      if (!this.currentCountry || !this.allCountries) {
        fetch(
          `https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders,cca3`
        )
          .then((response) => response.json())
          .then((data) => {
            this.countries = data;

            this.country = data.filter((country) => {
              return (
                country.name.common.toLowerCase() == this.$route.params.country
              );
            })[0];

            this.updateBorderCountries();
          });
      } else {
        this.country = this.currentCountry;
        this.countries = this.allCountries;
        this.updateBorderCountries();
      }
    },

    updateBorderCountries() {
      this.borderCountries = this.countries.filter((country) => {
        for (let code of this.country.borders) {
          if (country.cca3 == code) {
            return true;
          }
        }
      });
    },
  },

  created() {
    this.updateCountries();
  },

  watch: {
    $route() {
      this.updateCountries();
    },
  },
};
</script>

<style></style>
