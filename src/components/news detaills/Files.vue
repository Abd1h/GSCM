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
  <v-card dir="rtl" class="mt-4" outlined>
    <v-card-title class="pa-4">
      {{ props.content.name[locale] }}
    </v-card-title>

    <v-card>
      <v-list v-if="props.content.files.length" dense>
        <v-list-item
          v-for="(file, index) in props.content.files"
          :key="file.id || index"
          class="d-flex align-center"
        >
          <v-list-item-content>
            <v-list-item-title>
              <v-btn :href="file.src[locale]" target="_blank" text>
                {{ file.desc[locale] }}
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-alert dir="ltr" v-else type="info" class="rounded-t-0">
        No files available.
      </v-alert>
    </v-card>
  </v-card>
</template>
