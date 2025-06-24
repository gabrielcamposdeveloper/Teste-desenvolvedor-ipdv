<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>Dashboard</v-app-bar-title>

      <v-btn icon @click="logout">
        logout
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="mt-6">
        <v-card>
          <v-card-title class="text-h6 font-weight-bold">
            Bem-vindo, {{ nomeUsuario }}!
          </v-card-title>
          <v-card-text>
            Esta é sua área restrita. Você pode colocar aqui os dados que desejar.
          </v-card-text>
        </v-card>
        <v-card-text>
  Esta é sua área restrita. Você pode colocar aqui os dados que desejar.
</v-card-text>

<v-card-actions>
  <v-btn color="primary" @click="router.push('/usuario/cadastrar')">Cadastrar Usuário</v-btn>
  <v-btn color="secondary" @click="router.push('/cargo/cadastrar')">Cadastrar Cargo</v-btn>
</v-card-actions>
      </v-container>
    </v-main>

  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nomeUsuario = ref('')

onMounted(() => {
  const usuario = localStorage.getItem('usuario')
  if (usuario) {
    nomeUsuario.value = JSON.parse(usuario).nome
  } else {
    router.push('/')
  }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
  router.push('/')
}

</script>
