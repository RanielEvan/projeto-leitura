<template>
  <div>
    Transcrição da fala:
    <strong id="interim">{{ transcribedVoice }}</strong> Transcrição da fala:
    <strong id="final">{{ transcribedVoice }}</strong>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listening: false,

      transcription: "",
    };
  },

  computed: {
    transcribedVoice() {
      return this.$speech.getTranscription();
    },
  },

  methods: {
    toggleListen() {},
  },
};
</script>

<style></style>
