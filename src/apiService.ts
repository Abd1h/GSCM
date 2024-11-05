import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://164.92.187.207:5005",
  headers: {
    "Content-Type": "application/json",
  },
});

// Functions for each endpoint
export const apiService = {
  fetchNavigation(language: string) {
    console.log("test1");
    return apiClient.get(
      `/api/app/navigation/tree-grouped-by-nav-type?NavTypeSlugs=header`,
      {
        params: { Language: language },
      }
    );
  },
  fetchNews(language: string, isFeature: boolean) {
    // IsFeature=false&CategorySlug=news&Language=ar&MaxResultCount=5
    ///api/app/dynamic-content/by-filters?Language=ar&IsFeature=true
    return apiClient.get(`/api/app/dynamic-content/by-filters`, {
      params: {
        Language: language,
        IsFeature: isFeature,
        MaxResultCount: 5,
        CategorySlug: "news",
        // DynamicContentSlug: "y2N8r0-uSKS0Ggc",
      },
    });
  },

  fetchFooter(language: string, FooterCol: string) {
    return apiClient.get(`/api/app/navigation/tree-grouped-by-nav-type?`, {
      params: { Language: language, NavTypeSlugs: FooterCol },
    });
  },
  fetchh() {
    return apiClient.get(
      `/api/app/dynamic-content/by-filters?DynamicContentSlug=y2N8r0-uSKS0Ggc&Language=ar`
    );
  },
};
