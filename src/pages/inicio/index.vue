<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-12"
           v-for="(input) in inputs"
           :key="'input-'+input.slug"
      >
        <q-input
          v-if="input.tipo == 'text'"
          rounded outlined
          v-model="input.valor"
          :label="input.label"
          :placeholder="input.placeholder"
        />

        <q-input
          v-if="input.tipo == 'text'"
          rounded outlined
          v-model="input.valor"
          :label="input.label"
          :placeholder="input.placeholder"
        />
      </div>
    </div>
<!--    <div class="q-pa-md">-->
<!--      <div class="q-gutter-md" style="max-width: 300px">-->
<!--    -->
<!--      </div>-->
<!--    </div>-->
  </q-page>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "PageIndex",

  data() {
    return {
      hint: "Bem vindo ao Projeto Leitura!",
      inputs: [
        {
          slug: "nome",
          placeholder: "Nome",
          label: "Digite seu nome",
          icone: "mdi-pencil-outline",
          tipo: "text",
          valor: null,
          erro: "",
          obrigatorio: true,
        },
        {
          slug: "idade",
          placeholder: "Idade",
          label: "Digite sua idade",
          icone: "mdi-pencil-outline",
          tipo: "number",
          valor: null,
          erro: "",
          obrigatorio: true,
        },
      ],
    };
  },

  mounted() {
    this.$speak(this.hint);
  },
});
</script>
