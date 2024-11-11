<script setup>
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
import { defineProps } from "vue";
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <v-card dir="rtl" class="" outlined>
    <v-card-title>{{ props.content.description[locale] }}</v-card-title>
    <v-card-text
      v-if="props.content[locale]"
      v-html="props.content[locale]"
      style="line-height: 1.45rem; overflow-x: auto"
    ></v-card-text>
    <v-alert dir="ltr" v-else type="info" class="mt-3 rounded-t-0">
      No files available.
    </v-alert>
  </v-card>
</template>
