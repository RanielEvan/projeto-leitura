<template>
  <div>
    <q-card class="text-center">
      <q-card-section>
        <div class="text-h6">Exercício UM</div>

        <div class="text-subtitle2 speaker-hint">
          Leia em voz alta as palavras que aparecerem na tela
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-h2 text-to-talk">
          <span class="selected">Pra</span>to
          <!-- <TextComponent /> -->
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <!-- <q-btn color="blue">Ouvir</q-btn> -->
        <q-btn
          v-if="!isListening"
          color="green"
          icon="mic"
          @click="$startListening()"
          >Começar a leitura</q-btn
        >

        <q-btn v-else color="red" icon="mic" @click="$stopListening()"
          >Parar</q-btn
        >
      </q-card-actions>

      <q-card-section>
        <div class="">
          Transcrição:
          <strong class="text-h6">{{ transcricaoParcial }}</strong>

          <q-separator class="q-my-md" />

          <b>Falas:</b>
          <div class="text-center">
            <div v-for="(item, index) in listaTranscricoes" :key="index">
              <span class="text-subtitle1"> {{ item }}</span>
            </div>
          </div>

          <!-- <strong id="final">{{ transcricaoCompleta }}</strong> -->
          <!-- <TextComponent /> -->
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",

  data() {
    return {
      levelHint:
        "Exercício 1... Leia em voz alta as palavras que aparecerão na tela. Para iniciar toque no botão verde ou diga 'iniciar' !",
    };
  },

  computed: {
    isListening() {
      return this.$store.state.app.isListening || false;
    },

    transcricaoParcial() {
      return this.$store.state.app.interimTranscript || "-";
    },

    transcricaoCompleta() {
      return this.$store.state.app.finalTranscript || "-";
    },

    listaTranscricoes() {
      return this.$store.state.app.transcriptSessions || [];
    },
  },

  mounted() {
    // const elToSpeak = document.getElementsByClassName("speaker-hint");
    this.$speak(this.levelHint);
  },

  methods: {},
});
</script>

<style lang="scss">
.text-to-talk {
  font-family: Verdana;

  .selected {
    color: crimson;
    font-weight: bold;
    font-size: 1em;
  }
}
</style>
