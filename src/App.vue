<script lang="ts" setup>
//
// حجي Importing is handled by [unplugin-vue-components]
</script>

<template>
  <v-app>
    <Header />
    <Nav />

    <v-main>
      <router-view />
    </v-main>

    <Footer />
  </v-app>
</template>
