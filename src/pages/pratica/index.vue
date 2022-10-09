<template>
  <div>
    <q-card class="text-center">
      <q-card-section>
        <div class="text-h6">{{ excerciseNameView }}</div>
      </q-card-section>

      <q-card-section>
        <Simulator>
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
        </Simulator>
      </q-card-section>

      <!-- TRANSCRICAO -->
      <q-card-section>
        <Transcriptions />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Simulator from "src/components/Simulator";
import Transcriptions from "src/components/Transcriptions";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Simulator,
    Transcriptions,
  },

  name: "PageIndex",

  data() {
    return {
      levelHint:
        "Vamos praticar! Leia em voz alta as palavras que aparecerão na tela. Para iniciar toque no botão verde.",
    };
  },

  computed: {
    isListening() {
      return this.$store.state.app.isListening || false;
    },

    userLevel() {
      return this.$store.state.app.level || "-";
    },

    excerciseNameView() {
      return `Práticas de nível ${this.userLevel}`;
    },
  },

  mounted() {
    // const elToSpeak = document.getElementsByClassName("speaker-hint");
    this.$speak(this.levelHint);
  },

  methods: {},
});
</script>
