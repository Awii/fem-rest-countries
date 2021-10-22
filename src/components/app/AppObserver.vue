<template>
  <div class="observer"></div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
    },
  },

  data() {
    return {
      observer: null,
    };
  },

  mounted() {
    const options = this.options || {};
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("observe");
      }
    }, options);

    this.observer.observe(this.$el);
  },

  destroyed() {
    this.observer.disconnect();
  },
};
</script>
