<template>
  <div>
    <q-card class="text-center">
      <q-card-section>
        <div class="text-h6">Práticas de nível {{ frase.nivel }}</div>
      </q-card-section>

      <q-card-section>
        <Simulator :levelText="frase.texto">
          <q-btn
            v-if="!isListening"
            color="green"
            icon="mic"
            @click="$startListening(); getFrase()"
          >
            Começar a leitura
          </q-btn>

          <q-btn v-else color="red" icon="mic" @click="$stopListening()">
            Parar
          </q-btn>
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
import { mapMutations } from "vuex";

import { obterTextoDoNivel } from "src/services/textService";

export default defineComponent({
  components: {
    Simulator,
    Transcriptions,
  },

  name: "PageIndex",

  data() {
    return {
      levelHint: "Vamos praticar! Leia em voz alta as palavras que aparecerão na tela. Para iniciar toque no botão verde.",

      dialog: false,
      usuario: {},

      frase: {},
    };
  },

  computed: {
    isListening() {
      return this.$store.state.app.isListening || false;
    },
  },

  mounted() {
    // const elToSpeak = document.getElementsByClassName("speaker-hint");

    this.verificarUsuario();
    this.$speak(this.levelHint);
  },

  methods: {
    ...mapMutations({
      setLevel: "app/setLevel",
    }),
    verificarUsuario() {
      this.usuario = JSON.parse(window.localStorage.getItem("leituraUsuario"));
    },

    async fimFrase() {
      this.$stopListening();
    },

    async getFrase() {
      this.dialog = true;
      this.frase = await obterTextoDoNivel(this.usuario.id, this.setLevel);
      this.$store.state.app.transcriptSessions = [];
      this.dialog = false;
    },
  },
});
</script>
