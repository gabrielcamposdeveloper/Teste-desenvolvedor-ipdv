<template>
  <v-app>
    <DefaultLayout>
      <v-main>
        <v-container>
          <v-card elevation="4" class="pa-4">
            <v-card-title class="d-flex justify-space-between align-center">
              <span class="text-h6">Cargos</span>
              <v-btn color="primary" @click="abrirModal()">
                <v-icon left>mdi-plus</v-icon> Novo Cargo
              </v-btn>
            </v-card-title>

            <v-table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cargo in cargos" :key="cargo.id">
                  <td>{{ cargo.id }}</td>
                  <td>{{ cargo.nome }}</td>
                  <td>
                    <v-btn icon small color="blue" @click="abrirModal(cargo)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon small color="red" @click="deletarCargo(cargo)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>

            <!-- Modal Formulário Cargo -->
            <v-dialog v-model="modalAberta" max-width="500px">
              <v-card>
                <v-card-title class="text-h6">
                  {{ editandoCargo ? 'Editar Cargo' : 'Novo Cargo' }}
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="formValid" @submit.prevent="submitForm">
                    <v-text-field
                      v-model="cargoForm.nome"
                      label="Nome do Cargo"
                      :rules="[rules.required]"
                      required
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn text @click="fecharModal">Cancelar</v-btn>
                  <v-btn
                    color="primary"
                    :disabled="!formValid"
                    @click="submitForm"
                  >
                    {{ editandoCargo ? 'Salvar' : 'Criar' }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </v-container>
      </v-main>
    </DefaultLayout>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  listarCargos,
  criarCargo,
  atualizarCargo,
  deletarCargo as apiDeletarCargo
} from '@/services/cargo/cargoService'

const cargos = ref([])
const modalAberta = ref(false)
const formValid = ref(false)
const form = ref(null)  // para validar o form
const editandoCargo = ref(false)

const cargoForm = ref({
  id: null,
  nome: ''
})

const rules = {
  required: v => !!v || 'Campo obrigatório'
}

const carregarCargos = async () => {
  try {
    cargos.value = await listarCargos()
  } catch {
    alert('Erro ao carregar cargos')
  }
}

const abrirModal = (cargo = null) => {
  if (cargo) {
    editandoCargo.value = true
    cargoForm.value = {
      id: cargo.id,
      nome: cargo.nome
    }
  } else {
    editandoCargo.value = false
    cargoForm.value = {
      id: null,
      nome: ''
    }
  }
  modalAberta.value = true
}

const fecharModal = () => {
  modalAberta.value = false
  editandoCargo.value = false
  cargoForm.value = {
    id: null,
    nome: ''
  }
}

const submitForm = async () => {
  const isValid = await form.value?.validate()
  if (!isValid) return

  try {
    if (editandoCargo.value) {
      await atualizarCargo(cargoForm.value.id, cargoForm.value.nome)
    } else {
      await criarCargo(cargoForm.value.nome)
    }
    await carregarCargos()
    fecharModal()
  } catch (error) {
    alert(error?.response?.data?.message || 'Erro ao salvar cargo')
  }
}

const deletarCargo = async (cargo) => {
  if (!confirm(`Deseja excluir o cargo ${cargo.nome}?`)) return

  try {
    await apiDeletarCargo(cargo.id)
    await carregarCargos()
  } catch {
    alert('Erro ao excluir cargo')
  }
}

onMounted(() => {
  carregarCargos()
})
</script>
