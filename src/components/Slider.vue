<template>
  <v-container>
    <v-carousel
      hide-delimiter-background
      class="rounded-lg"
      height="70vh"
      show-arrows="hover"
      cycle
    >
      <v-carousel-item v-for="(slide, i) in sliderData" :key="i" cover>
        <v-sheet
          height="100%"
          tile
          :style="{
            backgroundImage: `url(http://164.92.187.207:5005///host/cms/images/lg/${slide.sliderImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <div class="d-flex fill-height justify-end align-end">
            <v-card
              class="overlay-card ma-64"
              max-width="400"
              color="rgba(0,0,0,.4)"
              outlined
              dir="rtl"
            >
              <div>
                <v-card-title class="text-white">{{
                  slide.sliderCardTitle
                }}</v-card-title>

                <v-card
                  class="d-flex align-center ma-3 pa-2 rounded-lg"
                  style="background-color: #f6c40c; width: fit-content"
                >
                  <p class="pl-3">{{ slide.sliderCardContentType }}</p>
                  <p
                    class="text-subtitle-2 text-white px-3 py-1 rounded-lg"
                    style="background-color: #272727"
                  >
                    {{ slide.sliderCardDate }}
                  </p>
                </v-card>
              </div>
            </v-card>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { apiService } from "@/apiService";

interface SliderInfo {
  sliderImage: string | undefined;
  sliderCardTitle: string | undefined;
  sliderCardContentType: string | undefined;
  sliderCardDate: string | undefined;
}

const sliderData = ref<SliderInfo[]>([]);

const parseSliderElement = (element: any): SliderInfo => {
  const sliderImage = element.dynamicContentLanguages?.[0]?.images?.[0];
  const sliderCardTitle = element.dynamicContentLanguages?.[0]?.description;
  const sliderCardContentType =
    element.contentType?.contentTypeLanguages?.[0]?.name;
  const sliderCardDate =
    element.contentType?.contentTypeLanguages?.[0]?.creationTime?.split("T")[0];

  return {
    sliderImage,
    sliderCardTitle,
    sliderCardContentType,
    sliderCardDate,
  };
};

const fetchSliderData = async () => {
  try {
    const response = await apiService.fetchNews("ar", true);
    const items = response?.data?.items;
    console.log(items);

    if (items) {
      sliderData.value = items.map(parseSliderElement);
    } else {
      console.warn("No items found in the response");
    }
  } catch (error) {
    console.error("Error fetching slider data:", error);
  }
};

onMounted(fetchSliderData);
</script>
