<template>
  <div class="text-h5">
    Transcrição:
    <strong class="text-h4">{{ transcricaoParcial }}</strong>

    <q-separator class="q-my-md" />

    <b>Transcrições (Acurácia):</b>
    <div class="text-center">
      <div v-for="(item, index) in listaTranscricoes" :key="index">
        <hr>
        <span class="text-h5"> {{ item }}</span>
      </div>
    </div>

    <!-- <strong id="final">{{ transcricaoCompleta }}</strong> -->
    <!-- <Simulator /> -->
  </div>
</template>

<script>
export default {
  computed: {
    transcricaoParcial() {
      return this.$store.state.app.interimTranscript || "-";
    },

    transcricaoCompleta() {
      return this.$store.state.app.finalTranscript || "-";
    },

    listaTranscricoes() {
      return (
        this.$store.state.app.transcriptSessions.map(
          (it) => `${it.transcript} (${it.acuracy * 100}%)`
        ) || []
      );
    },
  },
};
</script>

<style></style>
