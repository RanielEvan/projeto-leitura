<template>
  <div class="vld-parent">
    <loading
      :active="dialog"
      :can-cancel="cancel"
      :color="color"
      :is-full-page="fullPage"
      :loader="loader"
      :width="width"
    />
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  name: "Loading",
  components: {Loading},

  props: {
    fullPage: {
      default: true,
    },

    dialog: {
      default: false,
    },

    cancel: {
      default: false,
    },

    color: {
      default: "var(--main-color)",
    },

    loader: {
      default: "spinner",
    },

    width: {
      default: 128,
    },
  },
};
</script>

<style scoped></style>
