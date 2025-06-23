<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="pa-4" elevation="8">
              <v-card-title class="text-h6 font-weight-bold justify-center"> Login </v-card-title>

              <v-card-text>
                <v-form @submit.prevent="handleLogin" ref="loginForm" v-model="formValid">
                  <v-text-field
                    v-model="email"
                    label="E-mail"
                    type="email"
                    :rules="[rules.required, rules.email]"
                    prepend-inner-icon="mdi-email"
                    outlined
                    dense
                  ></v-text-field>

                  <v-text-field
                    v-model="senha"
                    label="Senha"
                    type="password"
                    :rules="[rules.required]"
                    prepend-inner-icon="mdi-lock"
                    outlined
                    dense
                  ></v-text-field>

                  <v-btn color="primary" type="submit" block :disabled="!formValid" class="mt-4">
                    Entrar
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/authService'

const email = ref('')
const senha = ref('')
const formValid = ref(false)
const loginForm = ref(null)
const router = useRouter()

const rules = {
  required: (value) => !!value || 'Campo obrigatório',
  email: (value) => /.+@.+\..+/.test(value) || 'E-mail inválido',
}

const handleLogin = async () => {
  const isValid = await loginForm.value?.validate()
  if (!isValid) return

  try {
    const data = await login(email.value, senha.value)

    localStorage.setItem('token', data.token)
    localStorage.setItem('usuario', JSON.stringify(data.usuario))

    router.push('/dashboard')
  } catch (error) {
    alert(error.response?.data?.mensagem || 'Erro ao fazer login')
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
