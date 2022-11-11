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
        <Transcriptions @enviar-resposta="enviarResposta"/>
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
    },

    async enviarResposta(request) {
      this.dialog = true;
      try {
        let form = new FormData();
        form.append('id_user', this.usuario.id);
        form.append('id_frase', this.frase.id);
        form.append('resposta', request.frase);
        form.append('porcentagem_acerto', request.porcentagem_acerto);

        await api.post("/frase/enviar-resposta-frase", form);
        await this.getFrase();

      } catch (e) {
        this.dialog = false;
        console.log(e);
        alert(e.response ? e.response.data.message : "Sem conexão com o servidor");
        // this.alertErro(e);
      }
    }
  },
});
</script>
