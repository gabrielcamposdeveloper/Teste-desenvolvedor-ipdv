<template>
  <v-app>
    <DefaultLayout>
    <v-main>
      <v-container>
        <v-card elevation="4" class="pa-4">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6">Usuários</span>
            <v-btn color="primary" @click="abrirModal()">
              <v-icon left>mdi-plus</v-icon> Criar Usuário
            </v-btn>
          </v-card-title>

          <v-table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Ativo</th>
                <th>Cargo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in usuarios" :key="usuario.id">
                <td>{{ usuario.id }}</td>
                <td>{{ usuario.nome }}</td>
                <td>{{ usuario.email }}</td>
                <td>{{ usuario.cpf }}</td>
                <td>{{ usuario.telefone }}</td>
                <td>
                  <v-chip :color="usuario.ativo ? 'green' : 'red'" small dark>
                    {{ usuario.ativo ? 'Sim' : 'Não' }}
                  </v-chip>
                </td>
                <td>{{ usuario.cargo_nome || '—' }}</td>
                <td>
                  <v-btn icon small color="blue" @click="abrirModal(usuario)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon small color="red" @click="deletarUsuario(usuario)" :disabled="!usuario.ativo">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>

          <!-- Modal Formulário Usuário -->
          <v-dialog v-model="modalAberta" max-width="600px">
            <v-card>
              <v-card-title class="text-h6">
                {{ editandoUsuario ? 'Editar Usuário' : 'Novo Usuário' }}
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="formValid" @submit.prevent="submitForm">
                  <v-text-field
                    v-model="novoUsuario.nome"
                    label="Nome"
                    :rules="[rules.required]"
                    required
                  />
                  <v-text-field
                    v-model="novoUsuario.email"
                    label="E-mail"
                    :rules="[rules.required, rules.email]"
                    required
                  />
                  <v-text-field
                    v-model="novoUsuario.senha"
                    label="Senha"
                    type="password"
                    :rules="editandoUsuario ? [] : [rules.required]"
                    :placeholder="editandoUsuario ? 'Deixe vazio para manter a senha' : ''"
                    :required="!editandoUsuario"
                  />
                <v-text-field
  v-model="novoUsuario.cpf"
  label="CPF"
  maxlength="14"
  :rules="[rules.cpf]"
  required
/>
               <v-text-field
  v-model="novoUsuario.telefone"
  label="Telefone"
  maxlength="15"
  :rules="[rules.telefone]"
  required
/>
              <v-select
  v-model="novoUsuario.cargoId"
  :items="cargos"
  item-title="nome"
  item-value="id"
  label="Cargo"
  :rules="[rules.required]"
  dense
  outlined
  required
/>
                  <v-switch
                    v-model="novoUsuario.ativo"
                    label="Ativo"
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
                  {{ editandoUsuario ? 'Salvar' : 'Criar' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-container>
    </v-main>
   </DefaultLayout>
  </v-app>

<v-alert
  v-if="erroBackend"
  color="error"
  icon="$error"
  title="Alert"
  :text="erroBackend"
></v-alert>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario as apiDeletarUsuario
} from '@/services/user/userService'
import { listarCargos } from '@/services/cargo/cargoService'
import DefaultLayout from '../../tamplate/dafaultTemplate.vue'
const usuarios = ref([])
const cargos = ref([])
const modalAberta = ref(false)
const formValid = ref(false)
const form = ref(null)
const erroBackend = ref('')

const novoUsuario = ref({
  id: null,
  nome: '',
  email: '',
  senha: '',
  cpf: '',
  telefone: '',
  ativo: true,
  cargoId: null
})

const editandoUsuario = ref(false)

const rules = {
  required: v => !!v || 'Campo obrigatório',
  email: v => /.+@.+\..+/.test(v) || 'E-mail inválido',
  cpf: v => {
    if (!v) return 'Campo obrigatório';

    const cpfPattern = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    return cpfPattern.test(v) || 'CPF inválido';
  },
  telefone: v => {
    if (!v) return 'Campo obrigatório';

    const telPattern = /^[\d\s()+-]+$/;
    return telPattern.test(v) || 'Telefone inválido';
  }
}


const carregarUsuarios = async () => {
  try {
    usuarios.value = await listarUsuarios()
  } catch {
    alert('Erro ao carregar usuários')
  }
}

const carregarCargos = async () => {
  try {
    cargos.value = await listarCargos()
    console.log('Cargos:', cargos.value)
  } catch {
    alert('Erro ao carregar cargos')
  }
}


const abrirModal = (usuario = null) => {
  if (usuario) {
    editandoUsuario.value = true
    novoUsuario.value = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      senha: '',
      cpf: usuario.cpf,
      telefone: usuario.telefone,
      ativo: usuario.ativo,
      cargoId: usuario.cargo_id ?? usuario.cargoId
    }
  } else {
    editandoUsuario.value = false
    novoUsuario.value = {
      id: null,
      nome: '',
      email: '',
      senha: '',
      cpf: '',
      telefone: '',
      ativo: true,
      cargoId: null
    }
  }
  modalAberta.value = true
}

const fecharModal = () => {
  modalAberta.value = false
  editandoUsuario.value = false
  novoUsuario.value = {
    id: null,
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    telefone: '',
    ativo: true,
    cargoId: null
  }
}

const submitForm = async () => {
  const isValid = await form.value?.validate()
  if (!isValid) return

  erroBackend.value = ''  // limpa erro ao tentar salvar

  try {
    if (editandoUsuario.value) {
      await atualizarUsuario(novoUsuario.value.id, {
        nome: novoUsuario.value.nome,
        email: novoUsuario.value.email,
        senha: novoUsuario.value.senha,
        cpf: novoUsuario.value.cpf,
        telefone: novoUsuario.value.telefone,
        ativo: novoUsuario.value.ativo,
        cargo_id: novoUsuario.value.cargoId
      })
    } else {
      await criarUsuario({
        nome: novoUsuario.value.nome,
        email: novoUsuario.value.email,
        senha: novoUsuario.value.senha,
        cpf: novoUsuario.value.cpf,
        telefone: novoUsuario.value.telefone,
        ativo: novoUsuario.value.ativo,
        cargo_id: novoUsuario.value.cargoId
      })
    }

    await carregarUsuarios()
    fecharModal()
  } catch (error) {

    const msg = error?.response?.data?.message || 'Erro ao salvar usuário'
    erroBackend.value = msg
  }
}
const deletarUsuario = async (usuario) => {
  if (!confirm(`Deseja realmente desativar o usuário ${usuario.nome}?`)) return

  try {
    await apiDeletarUsuario(usuario.id)
    await carregarUsuarios()
  } catch {
    alert('Erro ao desativar usuário')
  }
}

onMounted(() => {
  carregarUsuarios()
  carregarCargos()
})


</script>
