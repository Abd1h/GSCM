<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});
const MultiEditorCard = props.content.contents;
console.log(111, props.content);
</script>
<template>
  <v-card class="mt-4">
    <v-card-title dir="rtl" class="pa-4" outlined>{{
      MultiEditorCard[0].title[locale]
    }}</v-card-title>

    <v-container v-if="MultiEditorCard.length > 0 && MultiEditorCard.content">
      <v-card
        v-for="(item, index) in MultiEditorCard"
        :key="index"
        class="mb-4"
      >
        <v-card-text v-html="item.content[locale]"></v-card-text>
      </v-card>
    </v-container>
    <v-alert v-else type="info" class="mt-3 rounded-t-0"
      >No editor content available</v-alert
    >
  </v-card>
</template>
