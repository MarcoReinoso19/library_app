<script setup lang="ts">
import { useLogin } from '@/composables/useAuth'
import { VForm } from 'vuetify/components/VForm'

const isPasswordVisible = ref(false)

const route = useRoute()
const router = useRouter()

const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  password: undefined,
})

const refVForm = ref<VForm>()

const credentials = ref({
  email: '',
  password: '',
})

credentials.value = {
  email: 'Marco_Reinoso',
  password: '123',
}

const rememberMe = ref(false)

const { login, isError, isPending, isSuccess, errorMessage } = useLogin()

const doLogin = async () => {
  await login({
    username: credentials.value.email,
    password: credentials.value.password,
  })

  watch(isSuccess, async () => {
    if (isSuccess.value) {
      await nextTick(() => {
        router.replace(route.query.to ? String(route.query.to) : '/')
      })
    }
  })
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) doLogin()
  })
}
</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol cols="12" md="4" class="auth-card-v2 d-flex align-center justify-center">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <h4 class="text-h4 mb-1">Bienvenido👋🏻</h4>
          <p class="mb-0">Inicia Sesión para continuar</p>
        </VCardText>
        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.email"
                  label="Email"
                  placeholder="proyexus@email.com"
                  type="email"
                  autofocus
                  :error-messages="errors.email"
                />
                <!-- :rules="[
                    requiredValidator(credentials.email),
                    emailValidator(credentials.email),
                  ]" -->
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.password"
                  label="Contraseña"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
                <!-- :rules="[requiredValidator(credentials.password)]" -->
                <SubmitButton label="Iniciar Sesión" :is-pending="isPending" block />
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center">
                <span>¿Deseas crear una cuenta?</span>
                <RouterLink class="text-primary ms-1" :to="{ path: '/register' }"> Registrarme </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
        <VAlert v-if="isError" class="align-center mx-6" color="error" variant="tonal" density="compact" closable>
          {{ errorMessage || 'Error' }}
        </VAlert>
      </VCard>
    </VCol>
  </VRow>
</template>
