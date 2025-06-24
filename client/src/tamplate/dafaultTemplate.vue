<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>User Management</v-app-bar-title>

      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="mt-6">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  localStorage.removeItem('token_expiration')
  router.push('/')
}
</script>
