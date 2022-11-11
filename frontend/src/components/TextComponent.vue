<template>
  <div>
    <transition name="fade">
      <div
        v-show="!loadingNewText"
        id="text-to-talk"
        class="text-h4 text-to-talk"
        ref="textToTalk"
      >
        <!-- TEXTO A SER FALADO -->
        <!-- <span class="selected">Pra</span>to -->
      </div>
    </transition>
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
      loadingNewText: false,
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
    // isListening(val) {
    //   if (val) {
    //     this.startTextReading();
    //   } else {
    //     this.isReadingWord = false;
    //   }
    // },

    text(val) {
      this.loadingNewText = true;
      setTimeout(() => {
        this.loadingNewText = false;
        this.renderTextOutput();
      }, 1000);
    },
  },

  mounted() {
    this.renderTextOutput();
  },

  methods: {
    renderTextOutput() {
      const elementsToRender = [];

      this.textArray.forEach((word, index) => {
        elementsToRender.push(`<span id="wrd_${index}">${word}</span>`);
      });

      const textElement = this.$refs.textToTalk;
      if (textElement) {
        textElement.innerHTML = elementsToRender.join(" ");
      }
    },

    // async startTextReading() {
    //   const textWordList = this.$refs.textToTalk.children;
    //   console.log("TEXT WORD LIST", textWordList);

    //   for (let i = 0; i < textWordList.length; i++) {
    //     if (this.isReadingWord) {
    //     }
    //     // console.log("PALAVRA", textWordList[i].innerText);
    //     textWordList[i].className = "selected";
    //     await this.$speak(textWordList[i].innerText);
    //     this.isReadingWord = true;
    //   }
    // },

    returnPartialResult() {
      this.$emit("result", this.result);
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

.text-to-talk {
  font-family: Verdana;
  font-weight: bold;

  .selected {
    color: crimson;
    font-size: 1em;
  }

  .correct-word {
    color: green;
    font-size: 1em;
  }
  .wrong-word {
    color: crimson;
    font-size: 1em;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
