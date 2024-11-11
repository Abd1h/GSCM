<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { apiService } from "@/apiService";
import { useDisplay } from "vuetify";
import { useGlobalState } from "../useGolbalState";

interface Language {
  name: string; // Display name, e.g., "دوائر الأمانة العامة ولجانها"
  language: string; // Language code, e.g., "ar"
  url: string;
  target: string; // Link target, e.g., "_self", "_blank", etc.
}

interface NavLink {
  language: Language;
  children: NavLink[];
}

const { currentLanguage } = useGlobalState();
const navigationData = ref<NavLink[]>([]);

const setNavigationData = async (language: string) => {
  try {
    const response = await apiService.fetchNavigation(language);
    if (response) {
      navigationData.value = response.data?.items?.[0]?.navigations;
    }
  } catch (error) {
    console.error("Error fetching navigation:", error);
  }
};

onMounted(() => {
  setNavigationData(currentLanguage.value);
});

watch(
  () => currentLanguage.value,
  (newLanguage) => setNavigationData(newLanguage)
);

const isSearchActive = ref<boolean>(false);
const toggleSearch = () => {
  isSearchActive.value = !isSearchActive.value;
};

// Display properties
const { mdAndUp } = useDisplay();
const isVertical = computed(() => !mdAndUp.value);
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

      <!--  Vertical NavList -->
      <v-menu v-if="isVertical" transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon class="ml-n3" v-bind="props"></v-app-bar-nav-icon>
        </template>

        <NavList
          :navigationData="navigationData"
          :isSearchActive="isSearchActive"
          :isVertical="true"
        />
      </v-menu>

      <!-- Horizontal NavList  -->
      <NavList
        v-else
        :navigationData="navigationData"
        :isSearchActive="isSearchActive"
        :isVertical="false"
      />

      <div
        v-if="!isSearchActive && isVertical"
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
  background-image: url("@/assets/img/logo-nav.99acc40.png");
  background-size: 100%;
  width: 250px;
  height: 50px;
}
</style>
