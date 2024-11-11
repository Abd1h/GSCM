<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { apiService } from "@/apiService";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const route = useRoute();
const newsDetailsItems = ref<any>({});

const fetchNewsDetials = async (language: string) => {
  try {
    const slug = Array.isArray(route.params.slug)
      ? route.params.slug[0]
      : route.params.slug;
    const response = await apiService.fetchNewsDetials(language, slug);
    if (response.data.items[0]) {
      const resJSON =
        response.data?.items?.[0]?.dynamicContentLanguages?.[0]?.contentJSON;
      const parsedData = JSON.parse(resJSON);

      newsDetailsItems.value = parsedData;

      console.log("Fetched details:", newsDetailsItems.value);
    } else {
      console.warn("No items found in the response");
    }
  } catch (err) {
    console.error("Error fetching news details:", err);
  }
};

onMounted(() => fetchNewsDetials(locale.value));
watch(
  () => locale.value,
  (newLanguage) => fetchNewsDetials(newLanguage)
);

// Component imports
import Editor from "../components/news detaills/Editor.vue";
import Slider from "../components/news detaills/Slider.vue";
import Files from "../components/news detaills/Files.vue";
import Video from "../components/news detaills/Video.vue";
import Embed from "../components/news detaills/EmbedFiles.vue";
import MultiEditor from "../components/news detaills/MultiEditor.vue";

function getComponentName(
  component: string | undefined,
  componentType: string | undefined
) {
  if (!component) return null;
  switch (component) {
    case "Editor":
      return Editor;
    case "Slider":
      return Slider;
    case "Files":
      return Files;
    case "Field":
      if (componentType === "video") return Video;
      if (componentType === "embed") return Embed;
      return null;
    case "MultiEditor":
      return MultiEditor;
    default:
      return null;
  }
}
</script>

<template>
  <v-container>
    <component
      v-for="(componentItem, i) in newsDetailsItems"
      :key="i"
      :is="getComponentName(componentItem.component, componentItem.type)"
      :content="componentItem"
    />
  </v-container>
</template>
