<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <v-card class="mt-4">
    <v-card-title dir="rtl" class="pa-4" outlined>{{
      props.content.name[locale]
    }}</v-card-title>

    <v-carousel v-if="props.content.images.length > 0">
      <v-carousel-item
        v-for="(image, index) in props.content.images"
        :key="index"
        :src="image"
      ></v-carousel-item>
    </v-carousel>
    <v-alert v-else type="info" class="rounded-t-0"
      >No images available</v-alert
    >
  </v-card>
</template>

<style scoped>
/* Add additional styling if needed */
</style>
