<template>
  <q-layout view="lHh LpR fFf">
    <q-header reveal class="bg-primary text-white headerEl">
      <q-toolbar class="headerEl__toolbar">
        <q-btn
          dense
          flat
          round
          size="lg"
          icon="menu"
          @click="toggleLeftDrawer"
          v-if="routeTitle !== 'Início'"
        />

        <q-toolbar-title class="headerEl__toolbar-center">
          <q-avatar>
            <q-icon :name="routeIcon" size="lg" />
          </q-avatar>

          {{ routeTitle }}
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          size="lg"
          :icon="audioOn ? 'volume_up' : 'volume_off'"
          class="q-mx-md"
          @click="toggleAudio"
        />

        <q-btn
          v-if="routeTitle !== 'Início'"
          dense
          flat
          round
          size="lg"
          icon="logout"
          @click="sair"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="routeTitle !== 'Início'"
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
    >
      <q-scroll-area class="fit drawerEl">
        <div class="text-center">
          <h5 class="q-my-lg">Projeto<br /><b>Leitura</b></h5>
        </div>
        <q-list padding class="menu-list">
          <MenuItem
            v-for="(route, index) in routes"
            :key="index"
            :path="route.path"
            :title="route.meta.title"
            :icon="route.meta.icon"
            :exibir="route.exibir"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- CONTEUDO -->
    <q-page-container>
      <q-page padding>
        <!-- CONTEUDO DAS PAGINAS -->

        <!-- <transition name="slide-fade"> -->
        <router-view />
        <!-- </transition> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import MenuItem from "src/components/MenuItem.vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  components: { MenuItem },
  computed: {
    routes() {
      return this.$router.options.routes[0].children;
    },
    routeTitle() {
      return this.$route.meta.title;
    },

    routeIcon() {
      return this.$route.meta.icon;
    },

    audioOn() {
      return this.$store.state.app.audioActive;
    },
  },

  methods: {
    toggleAudio() {
      this.$store.commit("app/toggleAudioActive");
      this.$stopSpeak();
    },
    sair() {
      localStorage.removeItem("leituraUsuario");
      this.$router.push("/inicio");
    },
  },
};
</script>

<style lang="scss" scoped>
.headerEl {
  height: 70px;
  border-radius: 0 0 0 20px;

  &__toolbar {
    height: 100%;

    &-center {
      font-size: 1.8rem;
    }
  }
}

.menu-list .q-item {
  border-radius: 0 32px 32px 0;
}

.logo {
  height: auto;
  width: 80px;
}

/* TRANSICAO DAS ROTAS */
.slide-fade-enter-active {
  transition: all 0.6s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.drawerEl {
  background-image: linear-gradient(90deg, whitesmoke, white);
}
</style>
