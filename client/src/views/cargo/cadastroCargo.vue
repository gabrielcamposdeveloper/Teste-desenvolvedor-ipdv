<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card elevation="4" class="pa-4">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6">Cargos</span>
            <v-btn color="primary" @click="abrirModal">
              <v-icon start>mdi-plus</v-icon> Criar Cargo
            </v-btn>
          </v-card-title>

          <v-data-table :items="cargos" :headers="headers" class="mt-4" dense />

          <v-dialog v-model="modalAberta" max-width="500px">
            <v-card>
              <v-card-title class="text-h6">Novo Cargo</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitForm" ref="form" v-model="formValid">
                  <v-text-field v-model="novoCargo.nome" label="Nome do Cargo" :rules="[rules.required]" />
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
import { ref, onMounted } from 'vue'
import { listarCargos, criarCargo } from '@/services/cargo/cargoService'

const cargos = ref([])
const modalAberta = ref(false)
const formValid = ref(false)
const form = ref(null)
const novoCargo = ref({ nome: '' })

const headers = [{ text: 'Nome do Cargo', value: 'nome' }]
const rules = { required: v => !!v || 'Campo obrigatório' }

const carregarCargos = async () => {
  try {
    cargos.value = await listarCargos()
  } catch (error) {
    alert('Erro ao carregar cargos')
  }
}

const abrirModal = () => {
  novoCargo.value = { nome: '' }
  modalAberta.value = true
}

const fecharModal = () => {
  modalAberta.value = false
}

const submitForm = async () => {
  const isValid = await form.value?.validate()
  if (!isValid) return

  try {
    await criarCargo(novoCargo.value.nome)
    await carregarCargos()
    fecharModal()
  } catch (error) {
    alert('Erro ao criar cargo')
  }
}

onMounted(() => {
  carregarCargos()
})


</script>
