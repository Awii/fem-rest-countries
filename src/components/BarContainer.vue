<template>
  <div
    class="duration-300 bg-light-gray-very-light dark:bg-dark-blue rounded-md filter drop-shadow-md text-black dark:text-white flex items-center"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BarContainer",
};
</script>
