<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { apiService } from "@/apiService";
import { useGlobalState } from "@/useGolbalState";
const footerData = ref<FooterInfo[]>([]);

interface FooterInfo {
  footerTitle?: string;
  footerLinks?: string[];
}
interface NavigationItem {
  language: {
    name: string;
  };
}

const { currentLanguage } = useGlobalState();
const fetchFooterData = async (language: string) => {
  try {
    const footerCols = ["footer-3", "footer-2", "footer-1"];
    footerCols.forEach(async (key) => {
      const response = await apiService.fetchFooter(language, key);
      const resData = response?.data.items[0];

      if (resData) {
        footerData.value.push({
          footerTitle: resData.navType?.language?.name,
          footerLinks:
            resData.navigations?.map(
              (footerLink: NavigationItem) => footerLink?.language.name
            ) ?? [],
        });
      }
    });
  } catch (error) {
    console.error("Error fetching footer data:", error);
  }
};

onMounted(() => fetchFooterData(currentLanguage.value));
watch(
  () => currentLanguage.value,
  (newLanguage) => {
    footerData.value = [];
    fetchFooterData(newLanguage);
  }
);
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

<template>
  <div class="footer-background">
    <v-container class="py-16">
      <v-row class="d-flex">
        <v-col cols="12" class="footer-top">
          <v-row>
            <!-- Social Media Logo Section (First Column) -->
            <v-col
              cols="4"
              class="d-flex justify-center align-center flex-column"
            >
              <a class="" href="/"><div class="logo"></div></a>
              <a class="" href="/"><div class="logo3"></div></a>
              <div class="d-none d-sm-flex">
                <a
                  v-for="(link, index) in socialMediaLinks"
                  :key="index"
                  :href="link.href"
                  target="_blank"
                  class="media-icons pr-3 text-decoration-none"
                >
                  <v-icon>{{ link.icon }}</v-icon>
                </a>
              </div>
            </v-col>

            <!-- Links Section (Second Column) -->
            <v-col cols="8" class="d-flex mt-8 align-stretch">
              <v-row>
                <v-col
                  v-for="(footerCol, i) in footerData"
                  :key="i"
                  cols="4"
                  class="d-flex flex-column align-end justify-start pa-0"
                >
                  <h4>
                    {{ footerCol.footerTitle }}
                  </h4>

                  <v-list style="background-color: inherit; color: inherit">
                    <v-list-item
                      v-for="(link, i) in footerCol.footerLinks"
                      :key="i"
                      class="pa-0"
                      style="min-height: 30px"
                    >
                      <div class="d-flex justify-end ga-1">
                        <v-list-item-titl>
                          <a>{{ link }}</a>
                        </v-list-item-titl>
                        <v-list-item-icon>
                          <v-icon size="14">mdi-link</v-icon>
                        </v-list-item-icon>
                      </div>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <div
      cols="12"
      class="d-flex align-center justify-center rounded-t-lg footer-copyright"
    >
      © كل الحقوق محفوظة للامانة العامة لمجلس الوزراء 2024
    </div>
  </div>
</template>

<style>
.logo3 {
  background-image: url("src/assets/img/logo-footer.png");
  background-size: 100%;
  width: 200px;
  height: 60px;
}

.footer-background {
  background-color: #272727;
  color: aliceblue;
  position: relative;
}
.footer-background::before {
  content: "";
  display: block;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("src/assets/img/stars.png");
  background-size: 64px;
  background-repeat: repeat;
  width: 100%;
  height: 50px;
}
.footer-copyright {
  color: #272727;
  min-height: 50px;
  background: #f6c40c;
}
</style>
