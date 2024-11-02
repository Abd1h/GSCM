<template>
  <v-container>
    <v-carousel
      height="400"
      show-arrows="hover"
      hide-delimiter-background="true"
      cycle
    >
      <v-carousel-item v-for="(slide, i) in sliderData" :key="i" cover>
        <v-sheet
          height="100%"
          tile
          :style="{
            backgroundImage: `url(http://164.92.187.207:5005///host/cms/images/lg/${slide?.images?.[0]})`,
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
                  slide.title
                }}</v-card-title>

                <v-card
                  class="d-flex align-center ma-3 pa-2 rounded-lg"
                  style="background-color: #f6c40c"
                >
                  <p class="pl-3">{{ slide.description }}</p>
                  <p
                    class="text-subtitle-2 text-white px-3 py-1 rounded-lg"
                    style="background-color: #272727"
                  >
                    {{ slide.creationTime.split("T")[0] }}
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
<script setup type="ts">
import { ref, onMounted } from "vue";
import { apiService } from "@/apiService";

const sliderData = ref([]);

onMounted(async () => {
  try {
    const response = await apiService.fetchSlider("ar");
    if (response) {
      const resObject = JSON.parse(JSON.stringify(response.data.items))
      resObject.forEach(element => {
        const sliderinfo = element.dynamicContentLanguages?.[0]
        sliderData.value.push(sliderinfo)
      });
      console.log(sliderData.value)
    }

  } catch (error) {
    console.error("Error fetching navigation:", error);
  }
});
</script>
