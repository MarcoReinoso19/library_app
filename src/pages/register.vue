<script setup lang="ts">
import { useRegister } from '@/composables/useAuth'
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
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const rememberMe = ref(false)

const { register, isError, isPending, isSuccess, errorMessage } = useRegister()

const doRegister = async () => {
  await register({
    username: credentials.value.username,
    password: credentials.value.password,
    email: credentials.value.email,
  })

  watch(isSuccess, async () => {
    if (isSuccess.value) {
      await nextTick(() => {
        router.replace(route.query.to ? String(route.query.to) : '/')
      })
    }
  })
}

const isConfirmPasswordValid = computed(() => {
  return credentials.value.password === credentials.value.confirmPassword
})

const onSubmit = () => {
  if (!isConfirmPasswordValid.value) {
    errors.value.password = 'Las contraseñas no coinciden'
    return
  }
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) doRegister()
  })
}
</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol cols="12" md="4" class="auth-card-v2 d-flex align-center justify-center">
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <h4 class="text-h4 mb-1">Bienvenido👋🏻</h4>
          <p class="mb-0">Crea una cuenta para continuar</p>
        </VCardText>
        <VCardText>
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <!-- username -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.username"
                  placeholder="Joe Doe"
                  label="Nombre de usuario"
                  autofocus
                  :error-messages="errors.username"
                />
              </VCol>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="credentials.email"
                  label="Email"
                  placeholder="test@email.com"
                  type="email"
                  :error-messages="errors.email"
                />
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
                <VTextField
                  v-model="credentials.confirmPassword"
                  label="Confirme la Contraseña"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
                <SubmitButton class="mt-5" label="Registrarme" :is-pending="isPending" block />
              </VCol>

              <!-- create account -->
              <VCol cols="12" class="text-center">
                <span>¿Ya tienes una cuenta?</span>
                <RouterLink class="text-primary ms-1" :to="{ path: '/login' }"> Iniciar Sesión </RouterLink>
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
