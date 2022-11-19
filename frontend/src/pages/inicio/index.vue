<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-12">
        <q-form
          @submit="enviarCariarUsuario"
          @reset="limparCampos"
          class="fomulario"
        >
          <h4 class="formulario__titulo">Fomulário de cadastro</h4>
          <div class="row">
            <div
              class="col-12 formulario__input"
              v-for="input in inputs"
              :key="'input-' + input.slug"
            >
              <p class="formulario__input-label">
                {{ input.label }} <span v-if="input.obrigatorio" class="text-red">*</span>
              </p>

              <q-input
                v-if="input.tipo == 'text'"
                rounded outlined
                v-model="input.valor"
                :label="input.placeholder"
                :rules="input.obrigatorio ? [(val) => (val && input.valor.length > 0) || 'Por favor, digite algo'] : []"
              />

              <q-input
                v-if="input.tipo == 'number'"
                min="2"
                type="number"
                rounded outlined
                v-model="input.valor"
                :label="input.placeholder"
                :rules="input.obrigatorio ? [(val) => (val && input.valor > 3 && input.valor < 100) || 'Por favor, digite ou selecione um número'] : []"
              />

              <q-select
                v-if="input.tipo == 'select' && !input.outro"
                rounded outlined
                v-model="input.valor"
                :options="input.itens"
                option-label="nome"
                @update:model-value="input.onClickFunction(input, input.valor)"
                :label="input.placeholder"
                :rules="input.obrigatorio ? [(val) => (val && input.valor) || 'Por favor, selecione algo'] : []"
              />

              <q-input
                v-if="input.tipo == 'select' && input.outro"
                rounded outlined
                v-model="input.valor"
                label="Outro, qual?"
                :rules="input.obrigatorio ? [(val) => (val && input.valor.length > 0) || 'Por favor, digite algo'] : []"
              />

              <span v-if="input.tipo == 'termo'">
                <q-checkbox
                  v-model="input.valor"
                  :rules="[(val) => (val && input.valor) || 'Aceite os termos para continuar']"
                >
                  Aceitar os termos e condições
                </q-checkbox>
              </span>
            </div>
          </div>
          <div class="formulario__botoes">
            <q-btn rounded flat label="Limpar" type="reset" color="primary" size="lg"/>
            <q-btn rounded label="Salvar" type="submit" color="primary" size="lg"/>
          </div>
        </q-form>

        <div class="q-mt-xl text-center text-subtitle1">
          Os dados de usuário são armazenados em <b>cookies</b>. Esses dados são
          persistidos para permitir a progressão no módulo
          <b>Praticar</b>.<br />
          Estes dados também são refletidos nos servidores da aplicação e servem
          para realização de análises, estas que fundamentam uma pesquisa na
          área de tecnologia. <br />
          Esta aplicação se trata de um instrumento de pesquisa para um TCC, que
          tem como objetivo realizar sessões de leitura, oferecendo uma prática
          virtualmente assistida.<br />
        </div>
      </div>
    </div>

    <!--    <div class="q-pa-md">-->
    <!--      <div class="q-gutter-md" style="max-width: 300px">-->
    <!--    -->
    <!--      </div>-->
    <!--    </div>-->
  </q-page>

  <!--  <Loading :dialog="dialog"/>-->
</template>

<script>
import {defineComponent} from "vue";

// import Loading from "../../components/Loading.vue";

export default defineComponent({
  name: "PageIndex",
  // components: {Loading},

  data() {
    return {
      hint: "Bem vindo ao Projeto Leitura! Preencha os dados do formulário para continuar.",
      dialog: false,

      inputs: [
        {
          slug: "nome",
          label: "Digite seu nome",
          placeholder: "Nome",
          tipo: "text",
          valor: null,
          obrigatorio: true
        },
        {
          slug: "idade",
          label: "Digite sua idade",
          placeholder: "Idade",
          tipo: "number",
          valor: null,
          obrigatorio: true
        },
        {
          slug: "sexo",
          label: "Selecione seu sexo",
          placeholder: "Sexo",
          tipo: "select",
          itens: [
            {
              id: "f",
              nome: "Feminino",
            },
            {
              id: "m",
              nome: "Masculino",
            },
          ],
          valor: null,
          onClickFunction: (event, item) => {
          },
          obrigatorio: true
        },
        {
          slug: "profissao",
          label: "Selecione sua profissão",
          placeholder: "Profissão",
          tipo: "select",
          itens: [],
          valor: null,
          onClickFunction: (event, item) => {
            if (item['id'] == 'outro') {
              event['valor'] = null;
              event['outro'] = true;
            }
          },
          obrigatorio: true,
        },
        {
          slug: "nivel_escolaridade",
          label: "Selecione seu nível de escolaridade",
          placeholder: "Nível de escolaridade",
          tipo: "select",
          itens: [
            {
              id: "Fundamental incompleto",
              nome: "Fundamental incompleto",
            },
            {
              id: "Médio incompleto",
              nome: "Médio incompleto",
            },
          ],
          valor: null,
          onClickFunction: (event, item) => {
          },
          obrigatorio: true,
        },
        {
          slug: "motivo_deixar_escola",
          label: "Selecione o motivo que o fez abandonar a escola",
          placeholder: "O que te fez ABANDONAR a escola",
          tipo: "select",
          itens: [],
          valor: null,
          onClickFunction: (event, item) => {
            if (item['id'] == 'outro') {
              event['valor'] = null;
              event['outro'] = true;
            }
          },
        },
        {
          slug: "motivo_voltar_escola",
          label: "Selecione o motivo que o fez voltar a escola",
          placeholder: "O que te fez VOLTAR a escola",
          tipo: "select",
          itens: [],
          valor: null,
          onClickFunction: (event, item) => {
            if (item['id'] == 'outro') {
              event['valor'] = null;
              event['outro'] = true;
            }
          },
        },
        {
          slug: "id_turma",
          label: "Selecione sua turma",
          placeholder: "Turma",
          tipo: "select",
          itens: [],
          valor: null,
          onClickFunction: (event, item) => {
          },
        },
        {
          slug: "termo",
          label: "Termo de responsabilidade para realização de pesquisa científica",
          tipo: "termo",
          valor: null,
          obrigatorio: true,
        },
      ],
    };
  },

  methods: {
    limparCampos() {
      this.dialog = true;
      this.inputs.forEach((input) => {
        input.valor = null;
      });
      this.dialog = false;
    },

    async enviarCariarUsuario() {
      this.dialog = true;
      try {
        let form = new FormData();

        this.inputs.forEach((input) => {
          console.log(input);
          let valor;
          if(input.tipo == 'select' && !input.outro){
            valor = input.valor.id;
          }else{
            valor = input.valor;
          }
          form.append(input.slug, valor);
        });

        let dados = await this.$api.post("/user/enviar-criar", form);

        this.atualizarLocalStorage(dados.data.usuario);

        this.$router.push("/praticar");
      } catch (e) {
        console.log(e);
        // alert(
        //   e.response ? e.response.data.message : "Sem conexão com o servidor"
        // );
      }
      this.dialog = false;
    },

    atualizarLocalStorage(usuario) {
      localStorage.setItem("leituraUsuario", JSON.stringify(usuario));
    },

    setarItens(dados) {
      this.inputs.forEach((input) => {
        if (dados[input.slug]) {
          input.itens = dados[input.slug];
        }
      });
    },

    async inicio() {
      this.dialog = true;
      try {
        await this.$api.get("/user/get-dados-selects")
          .then((response) => {
            console.log(response.data);
            this.setarItens(response.data);
          });
      } catch (e) {
        console.log(e);
      }
      this.dialog = false;
    },

    verificarUsuario() {
      let usuario = JSON.parse(window.localStorage.getItem("leituraUsuario"));

      if (!usuario) {
        this.inicio();
      } else {
        this.$router.push("/praticar");
      }
    },
  },

  mounted() {
    this.$speak(this.hint);
    this.verificarUsuario();
  },
});
</script>

<style lang="scss" scoped>
.formulario {
  &__titulo {
    margin: 0 0 14px 0;
    text-align: center;
  }

  &__input {
    margin-bottom: 8px;

    &-label {
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 17px;
    }
  }

  &__botoes {
    display: flex;
    justify-content: space-between;
  }
}
</style>
