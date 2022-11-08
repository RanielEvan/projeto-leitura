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
              v-for="(input) in inputs"
              :key="'input-'+input.slug"
            >
              <q-input
                v-if="input.tipo == 'text'"
                rounded outlined
                v-model="input.valor"
                :label="input.label"
                :placeholder="input.placeholder"
                :rules="[ val => val && input.valor.length > 0 || 'Por favor, digite algo']"
              />

              <q-input
                v-if="input.tipo == 'number'"
                type="number"
                rounded outlined
                v-model="input.valor"
                :label="input.label"
                :placeholder="input.placeholder"
                :rules="[ val => val && (input.valor > 3 && input.valor < 100) || 'Por favor, digite ou selecione um número']"
              />

              <q-select
                v-if="input.tipo == 'select'"
                rounded outlined
                v-model="input.valor"
                :options="input.itens"
                option-label="nome"
                :label="input.label"
                :placeholder="input.placeholder"
                :rules="[ val => val && input.valor || 'Por favor, selecione algo']"
                @input-value="input.onClickFunction($event, input.value)"
              />
            </div>
          </div>
          <div class="formulario__botoes">
            <q-btn rounded flat label="Limpar" type="reset" color="primary"/>
            <q-btn rounded label="Salvar" type="submit" color="primary"/>
          </div>
        </q-form>
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
import api from "src/api";
import axios from "axios";
// import Loading from "../../components/Loading.vue";

export default defineComponent({
  name: "PageIndex",
  // components: {Loading},

  data() {
    return {
      hint: "Bem vindo ao Projeto Leitura!",
      dialog: false,

      inputs: [
        {
          slug: "nome",
          placeholder: "Nome",
          label: "Digite seu nome",
          tipo: "text",
          valor: null
        },
        {
          slug: "idade",
          placeholder: "Idade",
          label: "Digite sua idade",
          tipo: "number",
          valor: null
        },
        {
          slug: "sexo",
          label: "Selecione seu sexo",
          tipo: "select",
          itens: [
            {
              id: 'f',
              nome: 'Feminino'
            },
            {
              id: 'm',
              nome: 'Masculino'
            }
          ],
          valor: null
        },
        {
          slug: "nivel_escolaridade",
          label: "Selecione seu nível de escolaridade",
          tipo: "select",
          itens: [
            {
              id: 'Ensino fundamental incompleto',
              nome: 'Ensino fundamental incomplet'
            },
            {
              id: 'Ensino fundamental completo',
              nome: 'Ensino fundamental completo'
            },
            {
              id: 'Ensino fundamental completo',
              nome: 'Ensino fundamental completo'
            },
          ],
          valor: null
        },
        {
          slug: "cidade",
          label: "Selecione sua cidade",
          tipo: "select",
          itens: [],
          valor: null,
          onClickFunction: (event, item)  => {
            alert(item);
            this.buscarBairros(item);
          },
        },
        {
          slug: "bairro",
          label: "Selecione seu bairro",
          tipo: "select",
          itens: [],
          valor: null
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
          let valor = '';
          if(input.tipo == 'select' && ['cidade', 'bairro'].includes(input.slug)){
            valor = input.valor.nome;
          }else if(input.tipo == 'select'){
            valor = input.valor.id;
          }else{
            valor = input.valor;
          }

          form.append(input.slug, valor);
        });

        let dados = await api.post("/user/enviar-criar", form);

        this.atualizarLocalStorage(dados.data.usuario);
        alert("Usuário cadastrado com sucesso");
        this.$router.push("/praticar");
      } catch (e) {
        console.log(e);
        alert(e.response ? e.response.data.message : "Sem conexão com o servidor");
        // this.alertErro(e);
      }
      this.dialog = false;
    },

    atualizarLocalStorage(usuario) {
      localStorage.setItem("leituraUsuario", JSON.stringify(usuario));
    },

    async buscarBairros(cidade) {
      alert(cidade);
    },

    setarItens(slug, valores) {
      this.dialog = true;

      this.inputs.forEach((input) => {
        if (input.slug == slug) {
          input.itens = valores;
        }
      });

      this.dialog = false;
    },

    async inicio() {
      this.dialog = true;
      try {
        await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/distritos").then((response) => {
          this.setarItens('cidade', response.data);
          this.setarItens('bairro', response.data);
        });
      } catch (e) {
        this.dialog = false;
        console.log(e);
        alert(e.response ? e.response.data.message : "Sem conexão com o servidor");
        // this.alertErro(e);
      }
    },

    verificarUsuario() {
      let usuario = JSON.parse(window.localStorage.getItem("leituraUsuario"));

      if (!usuario) {
        this.inicio();
      } else {
        this.$router.push('/praticar');
      }
    }
  },

  mounted() {
    // this.$speak(this.hint);
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
  }

  &__botoes {
    display: flex;
    justify-content: space-between;
  }
}
</style>
