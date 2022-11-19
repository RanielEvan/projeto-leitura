<template>
  <q-page>
    <div class="row w-full">
      <div class="col-12">
        <h4 class="text-h4 text-bold nivel-titulo">Relatório por níveis</h4>
      </div>
      <div
        class="col-12"
        v-for="nivel in niveis"
        :key="`nivel-${nivel.titulo}`"
      >
        <q-card class="card-nivel" flat bordered>
          <q-card-section
            class="card-nivel__titulo"
            @click="nivel.situacao ? (nivel.expanded = !nivel.expanded) : false"
          >
            <div class="text-h5 text-bold card-nivel__titulo-nivel">
              {{ nivel.titulo }}
            </div>
            <q-btn
              v-if="nivel.situacao"
              color="grey"
              round
              flat
              dense
              size="lg"
              :icon="
                nivel.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
              "
            />
            <q-icon
              v-else
              round
              flat
              dense
              color="grey"
              size="lg"
              name="lock"
            />
          </q-card-section>

          <q-slide-transition>
            <div v-show="nivel.expanded" class="card-nivel__expandido">
              <q-markup-table class="card-nivel__expandido-tabela">
                <thead>
                  <tr>
                    <th class="text-left"><div class="text-h6">Frase</div></th>
                    <th class="text-center">
                      <div class="text-h6">Tentativas</div>
                    </th>
                    <th class="text-center">
                      <div class="text-h6">Porcentagem</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="frase in nivel.frases" :key="`frase-${frase.id}`">
                    <td class="text-left">{{ frase.texto }}</td>
                    <td class="text-center">{{ frase.tentativas }}</td>
                    <td
                      class="text-center text-weight-bolder"
                      :class="
                        frase.porcentagem_acerto > 70
                          ? 'text-green'
                          : 'text-red'
                      "
                    >
                      {{ frase.porcentagem_acerto }}%
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>

              <div class="card-nivel__expandido-geral">
                <q-circular-progress
                  show-value
                  class="text-blue text-weight-bolder"
                  :value="nivel.porcentagem_geral"
                  size="80px"
                  color="blue"
                >
                  {{ nivel.porcentagem_geral }}%
                </q-circular-progress>
                <p>PORCENTAGEM</p>
                <p>GERAL</p>
                <p>DO NÍVEL{{ nivel.id }}</p>
              </div>
            </div>
          </q-slide-transition>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",

  data() {
    return {
      dialog: false,

      usuario: {},
      niveis: [],
    };
  },

  methods: {
    async inicio() {
      this.dialog = true;
      try {
        await this.$api
          .get(`/relatorio/get-relatorio-geral?id_user=${this.usuario.id}`)
          .then((response) => {
            this.niveis = response.data.niveis;
          });
      } catch (e) {
        this.dialog = false;
        console.log(e);
      }
    },

    verificarUsuario() {
      this.usuario = JSON.parse(window.localStorage.getItem("leituraUsuario"));

      if (!this.usuario) {
        this.$router.push("/inicio");
      } else {
        this.inicio();
      }
    },
  },

  mounted() {
    // this.$speak(this.hint);
    this.verificarUsuario();
  },
});
</script>

<style lang="scss" scoped>
.w-full {
  width: 100%;
}

.nivel-titulo {
  text-align: center;
}

.card-nivel {
  margin-bottom: 10px;

  &__titulo {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    font-weight: bold;

    &-nivel {
      margin-top: auto;
      margin-block: auto;
    }
  }

  &__expandido {
    @media only screen and (min-width: 680px) {
      display: flex;
    }

    &-tabela {
      width: 100%;
    }

    &-geral {
      padding: 15px;
      text-align: center;
      margin: auto;

      @media only screen and (max-width: 680px) {
        margin-top: 20px;
        margin-bottom: 20px;
      }

      > p {
        font-weight: bold;
        margin: 0;
      }
    }
  }
}
</style>
