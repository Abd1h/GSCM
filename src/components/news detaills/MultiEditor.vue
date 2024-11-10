<script setup>
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
});
const MultiEditorCard = props.content.contents;
</script>
<template>
  <v-card class="mt-4">
    <v-card-title dir="rtl" class="pa-4" outlined>{{
      MultiEditorCard[0].title.ar
    }}</v-card-title>

    <v-container v-if="MultiEditorCard.length > 0">
      <v-card
        v-for="(item, index) in MultiEditorCard"
        :key="index"
        class="mb-4"
      >
        <v-card-text v-html="item.content.ar"></v-card-text>
      </v-card>
    </v-container>
    <v-alert v-else type="info" class="mt-3"
      >No editor content available, L= {{ MultiEditorCard.length }}</v-alert
    >
  </v-card>
</template>
