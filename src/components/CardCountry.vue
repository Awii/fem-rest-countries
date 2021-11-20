<template>
  <div
    class=" bg-dark-blue filter drop-shadow-md rounded-md overflow-hidden text-white h-auto"
  >
    <img :src="imgPath" class="w-full object-contain" />
    <div class="px-6 pt-7 pb-9">
      <p class="text-base font-semibold">
        {{ name }}
      </p>
      <div class="text-sm mt-4 space-y-1">
        <p>
          <span class="font-semibold">Population:</span>
          {{ population.toLocaleString() }}
        </p>
        <p>
          <span class="font-semibold">Region:</span>
          {{ region }}
        </p>
        <p v-if="capital && capital.length">
          <span class="font-semibold">Capital:</span>
          {{ capital.join(", ") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardCountry",

  props: {
    imgPath: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    population: {
      type: Number,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    capital: {
      type: Array,
    },
  },
};
</script>
