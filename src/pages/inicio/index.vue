<template>
  <q-page class="flex flex-center">
    <h5>Bem vinda!</h5>
    <!-- <<img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",

  data() {
    return {
      hint: "Bem vindo ao Projeto Leitura!",
    };
  },

  mounted() {
    this.$speak(this.hint);
  },
});
</script>
