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
            <span class="pr-4">EN</span>
            <span class="pr-4">KR</span>
            <span class="pr-4">AR</span>
          </div>
          <!-- Color Toggle Buttons -->
          <div class="d-flex">
            <v-btn variant="text" class="theme--light custom-btn">
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

<script setup lang="ts">
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
</script>

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

.logo {
  background-image: url("src/assets/img/logo.gif");
  width: 150px !important;
  height: 130px;
  background-size: contain;
}

.logo-2 {
  background-image: url("src/assets/img/logo2.png");
  width: 250px;
  background-size: contain;
  height: 130px;
}
.media-icons {
  font: normal normal normal 24px / 1 "Material Design Icons";
  font-size: inherit;
  text-rendering: auto;
  line-height: inherit;
  color: #9b9b9b;
}

.custom-btn {
  min-width: auto;
  padding: 0 0.3rem;
  height: auto;
  color: #9b9b9b;
}
</style>
