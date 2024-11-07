<script setup>
const props = defineProps({
  navigationData: {
    type: Array,
    required: true,
  },
  isSearchActive: {
    type: Boolean,
    required: true,
  },
  isVertical: {
    type: Boolean,
    required: true,
  },
});
import { onMounted } from "vue";
console.log(onMounted(() => console.log(true)));

const getListClasses = () => {
  if (props.isVertical) {
    return "d-flex flex-column align-end flex-column-reverse custom-list";
  } else {
    return "d-none d-flex flex-grow-1 justify-end custom-list";
  }
};
</script>

<template>
  <v-list :class="getListClasses()" v-if="!isSearchActive" nav>
    <v-list-item v-for="navLink in navigationData" :key="navLink.language.name">
      <v-list-item-title>
        <v-btn
          :href="navLink.language.url"
          :target="navLink.language.target"
          slim
          density="default"
        >
          {{ navLink.language.name }}
        </v-btn>
      </v-list-item-title>
    </v-list-item>

    <!-- Additional item for main link "الرئيسية" -->
    <v-list-item>
      <v-list-item-title>
        <v-btn href="/" target="_self" slim density="default"> الرئيسية </v-btn>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style scoped>
.custom-list {
  color: inherit !important;
  box-shadow: none !important; /* Removes any shadow */
  border: none !important; /* Removes any border */
  background-color: #1e1e1e !important; /* Removes background color */
}

.custom-list .v-btn {
  box-shadow: none;
  background-color: transparent;
  color: aliceblue;
}
</style>
