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
  <v-card class="mt-4" outlined block>
    <v-card-title dir="rtl" class="pa-4">
      {{ props.content.name[locale] }}
    </v-card-title>
    <v-responsive v-if="props.content.value" :aspect-ratio="16 / 9">
      <div v-html="embedContent"></div>
    </v-responsive>
    <v-alert v-else type="info" class="mt-3 rounded-t-0"
      >No embed content available</v-alert
    >
  </v-card>
</template>
