<script setup lang="ts">
import type { UserCreate, UserRead, UserUpdate } from '@/interfaces/User'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { requiredValidator } from '@/utils/validators'
import type { VForm } from 'vuetify/components/VForm'

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
  (e: 'userCreate', value: UserCreate): void
  (e: 'userUpdate', value: UserUpdate): void
}

interface Props {
  isDrawerOpen: boolean
  useUpdate?: boolean | null
  userData?: UserRead | null
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const user: Ref<UserCreate> = ref({
  username: '',
  email: '',
  password: '',
})

watchEffect(() => {
  if (props.useUpdate)
    user.value = {
      ...props.userData,
    } as UserCreate
})

const isFormValid = ref(false)
const refForm = ref<VForm>()

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)

  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      if (props.useUpdate) {
        const changes: Record<string, any> = {}

        for (const key in user.value) {
          if (user.value[key as keyof UserCreate] !== props.userData?.[key as keyof UserCreate]) {
            changes[key] = user.value[key as keyof UserCreate]
          }
        }
        emit('userUpdate', {
          ...changes,
        })
      } else {
        emit('userCreate', {
          username: user.value.username,
          email: user.value.email,
          password: user.value.password,
        })
      }
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}
const isPasswordVisible = ref(false)

const errors = ref<Record<string, string | undefined>>({
  email: undefined,
  password: undefined,
})
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <DrawerHeaderSection title="Agregar nuevo usuario" @cancel="closeNavigationDrawer" />

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: true }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
            <VRow>
              <!-- 👉 Username -->
              <VCol cols="12">
                <VTextField
                  v-model="user.username"
                  :rules="[requiredValidator]"
                  label="Nombre de Usuario"
                  placeholder="John Doe"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <VTextField
                  v-model="user.email"
                  :rules="[requiredValidator]"
                  label="Email"
                  type="email"
                  placeholder="email@email.com"
                />
              </VCol>

              <!-- 👉 Password -->
              <VCol cols="12">
                <VTextField
                  v-model="user.password"
                  label="Contraseña"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn type="submit" class="me-3"> Guardar </VBtn>
                <VBtn type="reset" variant="tonal" color="error" @click="closeNavigationDrawer"> Cancelar </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
