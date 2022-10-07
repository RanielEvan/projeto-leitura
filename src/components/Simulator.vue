<template>
  <div class="text-center">
    <TextComponent :text="levelText" @finish="finishSession" />
  </div>
</template>

<script>
import TextComponent from "./TextComponent";

export default {
  components: {
    TextComponent,
  },

  data() {
    return {
      level: 1,
    };
  },

  computed: {
    levelText() {
      switch (this.level) {
        case 1:
          return "Olá mundo!";
        case 2:
          return "Segundo texto maior!";
        default:
          return "";
      }
    },
  },

  methods: {
    finishSession() {
      console.log("SESSÃO FINALIZADA!");

      this.level++;
    },
  },
};
</script>

<style lang="scss">
.itemMenu {
  font-family: Verdana;
  background-color: RGBA(0, 0, 0, 0.1);
  font-size: 1rem;
}
</style>
