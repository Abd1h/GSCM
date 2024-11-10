<script setup>
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
    <v-card-title>{{ props.content.description.ar }}</v-card-title>
    <v-card-text
      v-if="props.content.ar"
      v-html="props.content.ar"
      style="line-height: 1.45rem"
    ></v-card-text>
    <v-alert dir="ltr" v-else type="info" class="mt-3 rounded-t-0">
      No files available.
    </v-alert>
  </v-card>
</template>
