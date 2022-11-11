<template>
  <div>
    <q-card class="text-center">
      <q-card-section>
        <div class="text-h6">Práticas de nível {{ frase.nivel }}</div>
      </q-card-section>

      <q-card-section v-if="frase.id">
        <Simulator :levelText="frase.texto">
          <q-btn
            v-if="!isListening"
            color="green"
            icon="mic"
            @click="$startListening()"
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
        <Transcriptions/>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Simulator from "src/components/Simulator";
import Transcriptions from "src/components/Transcriptions";
import {defineComponent} from "vue";
import axios from "axios";
import api from "src/api";

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
    this.verificarUsuario();
  },

  methods: {
    verificarUsuario() {
      let usuario = JSON.parse(window.localStorage.getItem("leituraUsuario"));

      if (!usuario) {
        this.$router.push('/');
      } else {
        this.usuario = usuario;
        this.getFrase();
      }
    },

    async getFrase() {
      this.dialog = true;
      try {
        let dados = await api.get(`/frase/get-frase?id_user=${this.usuario.id}`);
        this.frase = dados.data.frase;
      } catch (e) {
        console.log(e);
        alert(e.response ? e.response.data.message : "Sem conexão com o servidor");
        // this.alertErro(e);
      }
      this.dialog = false;
    }
  },
});
</script>
