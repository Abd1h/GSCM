<script setup lang="ts">
onMounted(async () => {
  const res = await apiService.fetchh();
  console.log(111111111111, res);
});
import { ref, onMounted } from "vue";
import { apiService } from "@/apiService";

interface NewsCardInfo {
  newsImage: string | undefined;
  newsCardTitle: string | undefined;
  newsCardContentType: string | undefined;
  newsCardDate: string | undefined;
}

const newsData = ref<NewsCardInfo[]>([]);

const parsenewsElement = (element: any): NewsCardInfo => {
  const newsImage = element.dynamicContentLanguages?.[0]?.images?.[0];
  const newsCardTitle = element.dynamicContentLanguages?.[0]?.description;
  const newsCardContentType =
    element.contentType?.contentTypeLanguages?.[0]?.name;
  const newsCardDate =
    element.contentType?.contentTypeLanguages?.[0]?.creationTime?.split("T")[0];

  return {
    newsImage,
    newsCardTitle,
    newsCardContentType,
    newsCardDate,
  };
};

const fetchNewsData = async () => {
  try {
    const response = await apiService.fetchNews("ar", false);
    const items = response?.data?.items;

    if (items) {
      newsData.value = items.map(parsenewsElement);
    } else {
      console.warn("No items found in the response");
    }
  } catch (error) {
    console.error("Error fetching news data:", error);
  }
};

onMounted(fetchNewsData);
</script>

<template>
  <v-container>
    <v-container
      style="margin-inline: auto 0; width: min(100%, 700px); padding: 0"
    >
      <v-row>
        <v-col class="rounded-lg pa-4">
          <div class="rounded-t-lg px-4 header-background">
            <h1 dir="rtl">الاخبار</h1>
          </div>
          <div
            v-for="(news, i) in newsData"
            :key="i"
            class="px-5 pb-5"
            :class="{ 'pt-5': i === 0 }"
            style="background-color: #f6f6f6"
          >
            <v-card dir="rtl" flat>
              <v-row class="pa-2">
                <v-col cols="5" class="pa-4 d-print-inline-block">
                  <div
                    class="background-image rounded-lg"
                    :style="{
                      backgroundImage: `url(http://164.92.187.207:5005///host/cms/images/sm/${news.newsImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }"
                  ></div>
                </v-col>

                <v-col cols="7">
                  <v-card-title>
                    {{ news.newsCardTitle }}
                  </v-card-title>

                  <v-card-item>
                    <div class="d-flex ga-4 opacity-60">
                      <div>
                        <v-icon class="pl-1" size="14"
                          >mdi-calendar-range</v-icon
                        >
                        <spand>{{ news.newsCardDate }}</spand>
                      </div>
                      <div>
                        <v-icon class="pl-1" size="14">
                          mdi-tag-outline
                        </v-icon>
                        <spand>{{ news.newsCardContentType }}</spand>
                      </div>
                    </div>
                  </v-card-item>

                  <v-card-text>
                    {{ news.newsCardTitle }}
                  </v-card-text>

                  <v-card-actions class="justify-end">
                    <a
                      class="border pa-1 rounded-lg opacity-60"
                      text="اكمل القراءة"
                      variant="text"
                    ></a>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
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

  background-size: cover;
  background-position: center;

  height: 100%;
  width: 100%;
}
.header-background {
  background-image: linear-gradient(
      hsla(0, 0%, 100%, 0.7),
      hsla(0, 0%, 100%, 0.7)
    ),
    url("src/assets/img/stars.png");

  background-size: contain;
  background-repeat: repeat;
  background-position: center;

  height: 50px;
  width: 100%;
}
</style>
