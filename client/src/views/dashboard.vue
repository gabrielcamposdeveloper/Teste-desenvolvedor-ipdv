<template>
  <DefaultLayout>
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        Bem-vindo, {{ nomeUsuario }}!
      </v-card-title>

      <v-card-text>
        Esta é sua área restrita. Você pode colocar aqui os dados que desejar.
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="router.push('/usuario/cadastrar')">Cadastrar Usuário</v-btn>
        <v-btn color="secondary" @click="router.push('/cargo/cadastrar')">Cadastrar Cargo</v-btn>
      </v-card-actions>
    </v-card>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '../tamplate/dafaultTemplate.vue'
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
</script>
