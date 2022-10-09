<template>
  <div class="text-center">
    <div class="q-mb-lg">
      <TextComponent v-if="isListening" :text="levelText" />

      <q-spinner-orbit v-else size="lg" />
    </div>

    <div>
      <slot />
    </div>

    <!-- <div class="hintLabels">
      <div class="text-subtitle1 speaker-hint">
        Diga <b>INICIAR</b> para começar a sessão
        <br />
        Diga <b>FALAR</b> para o sistema ler o texto
      </div>
    </div> -->
  </div>
</template>

<script>
import TextComponent from "./TextComponent";

export default {
  components: {
    TextComponent,
  },

  computed: {
    isListening() {
      return this.$store.state.app.isListening || false;
    },
    level() {
      return this.$store.state.app.level || false;
    },

    levelText() {
      return this.$store.state.app.textToTalk || "";
    },
  },

  mounted() {
    this.$store.dispatch("app/resetLevel");
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
