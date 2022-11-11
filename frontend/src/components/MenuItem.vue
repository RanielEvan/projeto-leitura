<template>
  <q-item
    class="q-my-sm itemMenu"
    clickable
    v-ripple
    :to="path"
    @click="$stopListening"
  >
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      {{ title }}
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: "#",
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "",
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
</style>
