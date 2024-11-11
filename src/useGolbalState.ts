//++++++++++++++++++no need for this, because i switched to i!8n
// but im keeping it for referace

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
