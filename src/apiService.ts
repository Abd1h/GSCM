import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://164.92.187.207:5005",
  headers: {
    "Content-Type": "application/json",
  },
});

// Define interfaces for response data if needed
export interface NavigationData {
  // Define the properties of your navigation data here
}

export interface FooterData {
  // Define properties for footer data here
}

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
  fetchSlider(language: string) {
    return apiClient.get(`/app/dynamic-content/by-filters`, {
      params: { Language: language, IsFeature: true },
    });
  },
  fetchNews(language: string) {
    return apiClient.get(`/app/dynamic-content/by-filters`, {
      params: { Language: language },
    });
  },
  fetchFooter(language: string) {
    return apiClient.get<FooterData>(`/app/footer`, {
      params: { Language: language },
    });
  },
};
