<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { apiService } from "@/apiService";

interface Language {
  name: string; // Display name, e.g., "دوائر الأمانة العامة ولجانها"
  language: string; // Language code, e.g., "ar"
  url: string; // URL associated with the item
  target: string; // Link target, e.g., "self", "blank", etc.
}

interface NavLink {
  language: Language;
  children: NavLink[];
}

const navigationData = ref<NavLink[]>([]);

onMounted(async () => {
  try {
    const response = await apiService.fetchNavigation("ar");
    if (response) {
      navigationData.value = response.data.items[0].navigations;
    }
  } catch (error) {
    console.error("Error fetching navigation:", error);
  }
});
//
// const array = ref([1, 2, 3, 2, 32]);
// navigationData.value.forEach((element) => {
//   console.log("testttttttttt");
//   console.log(element, 1);
// });
const isSearchActive = ref<boolean>(false);
const isNavLinksActive = ref<boolean>(false);
const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value;
  isNavLinksActive.value = isSearchActive.value; //TEMMMMMMMP
};
</script>
<template>
  <v-toolbar
    color="#1e1e1e"
    class="d-flex justify-center top-navbar mb-4"
    style="height: 80px"
    density="compact"
  >
    <v-container
      style="min-width: 85%"
      class="d-flex justify-center align-center"
    >
      <v-app-bar-nav-icon class="ml-n3"></v-app-bar-nav-icon>
      <!-- Search Icon -->
      <v-btn v-if="!isSearchActive" icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- Close Icon -->
      <v-btn v-else icon @click="toggleSearch">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-card-text class="pa-0 mx-4 align-self-center" v-if="isSearchActive">
        <v-text-field
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Search.."
          variant="solo"
          hide-details
          single-line
          bg-color="#383838"
          max-width="80%"
        ></v-text-field>
      </v-card-text>

      <!-- nav links -->
      <v-row
        style="align-content: center; min-width: auto"
        class="d-none d-lg-flex flex-0-1"
        v-if="!isSearchActive"
        no-gutters
      >
        <v-col
          class="px-1"
          v-for="navLink in navigationData"
          :key="navLink.language.name"
          cols="auto"
        >
          <v-btn
            :href="navLink.language.url"
            :target="navLink.language.target"
            slim
            density="default"
          >
            {{ navLink.language.name }}
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn :href="'/'" :target="'_self'" slim density="default">
            الرئيسية
          </v-btn>
        </v-col>
      </v-row>

      <div
        v-if="!isSearchActive && !isNavLinksActive"
        class="d-flex logo-nav ml-auto"
      ></div>
    </v-container>
  </v-toolbar>
</template>

<style scoped>
.top-navbar {
  position: relative;
}

.top-navbar::after {
  content: "";
  height: 8px;
  width: 100%;
  background-color: rgba(246, 196, 12, 0.8);
  position: absolute;
  bottom: -8px;
}
.logo-nav {
  background-image: url("src/assets/img/logo-nav.99acc40.png");
  background-size: 100%;
  width: 250px;
  height: 50px;
}
</style>
