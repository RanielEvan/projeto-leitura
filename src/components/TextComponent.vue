<template>
  <div class="text-h2 text-to-talk" ref="textToTalk">
    <!-- TEXTO A SER FALADO -->
    <!-- <span class="selected">Pra</span>to -->
  </div>

  <!-- <q-item class="q-my-sm itemMenu" clickable v-ripple :to="path">
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      {{ title }}
    </q-item-section>
  </q-item> -->
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      result: {},
      isReadingWord: false,
    };
  },

  computed: {
    // Input filter
    textArray() {
      return this.text.split(" ");
    },

    // Controles
    isListening() {
      return this.$store.state.app.isListening || false;
    },

    endReading() {
      return this.$store.state.app.isListening || false;
    },

    // transcricaoParcial() {
    //   return this.$store.state.app.interimTranscript || "";
    // },

    // transcricaoCompleta() {
    //   return this.$store.state.app.finalTranscript || "";
    // },

    // listaTranscricoes() {
    //   return this.$store.state.app.transcriptSessions || [];
    // },
  },

  watch: {
    isListening(val) {
      if (val) {
        this.startTextReading();
      } else {
        this.isReadingWord = false;
      }
    },
  },

  mounted() {
    this.renderTextOutput();
  },

  methods: {
    renderTextOutput() {
      const elementsToRender = [];

      this.textArray.forEach((word, index) => {
        elementsToRender.push(`<span>${word}</span>`);
      });

      const textElement = this.$refs.textToTalk;
      textElement.innerHTML = elementsToRender.join(" ");
    },

    startTextReading() {
      const textWordList = this.$refs.textToTalk.children;
      console.log("TEXT WORD LIST", textWordList);

      for (let i = 0; i < textWordList.length; i++) {
        if (this.isReadingWord) {
        }
        // console.log("PALAVRA", textWordList[i].innerText);
        textWordList[i].className = "selected";
        this.$speak(textWordList[i].innerText);
        this.isReadingWord = true;
      }
    },

    returnPartialResult() {
      this.$emit("result", this.result);
    },

    finishSession() {
      this.$emit("finish");
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
