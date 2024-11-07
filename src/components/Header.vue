<script setup lang="ts">
import { ref } from "vue";
import { useGlobalState } from "@/useGolbalState";

interface SocialMediaLink {
  href: string;
  icon: string;
}

// an array of social media links
const socialMediaLinks: SocialMediaLink[] = [
  {
    href: "https://www.facebook.com/governmentwebsit",
    icon: "mdi-facebook",
  },
  {
    href: "https://www.youtube.com/@Iraqigov",
    icon: "mdi-youtube",
  },
  {
    href: "#",
    icon: "mdi-twitter",
  },
  {
    href: "https://t.me/cabinetmedia",
    icon: "mdi-send",
  },
];

const { setLanguage } = useGlobalState();
const changeLanguage = (language: string) => {
  console.log("this output is from Change Language function", language);
  setLanguage(language);
};

const flipWebsite = () => {
  document.body.style.transform = "rotate(180deg)";
  document.body.style.transformOrigin = "center";
  document.body.style.width = "100%";
  document.body.style.height = "100%";
};
const resetWebsite = () => {
  document.body.style.transform = "";
  document.body.style.transformOrigin = "";
};

const isDarkTheme = ref(false);
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
};
</script>
<template>
  <v-card dir="rtl" class="background-image">
    <v-container style="min-width: 85%">
      <v-row class="d-flex align-center" justify="space-between">
        <!-- social - lan - dark/light -->
        <v-col class="d-flex align-center" cols="6" md="4">
          <!-- Social Links -->
          <div
            v-for="(link, index) in socialMediaLinks"
            :key="index"
            class="d-none d-sm-flex mr-3"
          >
            <a
              :href="link.href"
              target="_blank"
              class="media-icons pr-3 text-decoration-none"
            >
              <v-icon>{{ link.icon }}</v-icon>
            </a>
          </div>
          <!-- Language Selector -->
          <div class="d-flex mx-2">
            <span class="pr-4" @click="changeLanguage('en')">EN</span>
            <span class="pr-4 cursor-pointer" @click="flipWebsite">KR</span>
            <span
              class="pr-4 cursor-pointer"
              @click="
                () => {
                  resetWebsite(), changeLanguage('ar');
                }
              "
              >AR</span
            >
          </div>
          <!-- Color Toggle Buttons -->
          <div class="d-flex">
            <v-btn
              variant="text"
              class="theme--light custom-btn"
              @click="toggleTheme"
            >
              <v-icon size="1.1rem">mdi-theme-light-dark</v-icon>
            </v-btn>
            <v-btn variant="text" class="v-icon--link theme--light custom-btn">
              <v-icon size="1.1rem">mdi-invert-colors</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- Logo Section -->
        <v-col
          class="d-flex align-center justify-center justify-sm-end"
          cols="6"
          md="6"
        >
          <a class="d-none d-md-inline-block" href="/"
            ><div class="logo-2"></div
          ></a>
          <div class="ma-4"></div>
          <a class="" href="/"><div class="logo"></div></a>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style scoped>
.background-image {
  background-image: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0.7),
      #fff 100%,
      #fff 0
    ),
    url("src/assets/img/stars.png");
  background-repeat: repeat !important; /* Repeat the background image */
  background-size: contain !important; /* Keep the original size of the image */

  height: 134px;
}

.custom-btn {
  min-width: auto;
  padding: 0 0.3rem;
  height: auto;
  color: #9b9b9b;
}
</style>
