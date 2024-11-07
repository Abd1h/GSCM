// src/composables/useGlobalState.js
import { ref } from "vue";

const currentLanguage = ref("ar");

export function useGlobalState() {
  return {
    currentLanguage,
    setLanguage(newLanguage: string) {
      currentLanguage.value = newLanguage;
    },
  };
}
