<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card elevation="4" class="pa-4">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6">Usuários</span>
            <v-btn color="primary" @click="abrirModal">
              <v-icon start>mdi-account-plus</v-icon> Criar Usuário
            </v-btn>
          </v-card-title>

          <v-data-table :items="usuarios" :headers="headers" class="mt-4" dense />

          <v-dialog v-model="modalAberta" max-width="500px">
            <v-card>
              <v-card-title class="text-h6">Novo Usuário</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitForm" ref="form" v-model="formValid">
                  <v-text-field v-model="novo.nome" label="Nome" :rules="[rules.required]" />
                  <v-text-field v-model="novo.email" label="Email" :rules="[rules.required, rules.email]" />
                  <v-text-field v-model="novo.senha" label="Senha" type="password" :rules="[rules.required]" />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn text @click="fecharModal">Cancelar</v-btn>
                <v-btn color="primary" @click="submitForm">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const modalAberta = ref(false)
const formValid = ref(false)
const form = ref(null)

const novo = ref({ nome: '', email: '', senha: '' })

const usuarios = ref([
  { nome: 'João', email: 'joao@email.com' },
  { nome: 'Maria', email: 'maria@email.com' }
])

const headers = [
  { text: 'Nome', value: 'nome' },
  { text: 'Email', value: 'email' }
]

const rules = {
  required: v => !!v || 'Campo obrigatório',
  email: v => /.+@.+\..+/.test(v) || 'E-mail inválido'
}

const abrirModal = () => {
  novo.value = { nome: '', email: '', senha: '' }
  modalAberta.value = true
}

const fecharModal = () => {
  modalAberta.value = false
}

const submitForm = () => {
  if (!form.value?.validate()) return

  usuarios.value.push({
    nome: novo.value.nome,
    email: novo.value.email
  })

  fecharModal()
}
</script>
