<script setup lang="ts">
import type { LibraryCreate, LibraryRead, LibraryUpdate } from '@/interfaces/Library'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { requiredValidator } from '@/utils/validators'
import type { VForm } from 'vuetify/components/VForm'

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
  (e: 'libraryCreate', value: LibraryCreate): void
  (e: 'libraryUpdate', value: LibraryUpdate): void
}

interface Props {
  isDrawerOpen: boolean
  useUpdate?: boolean | null
  libraryData?: LibraryRead | null
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const library: Ref<LibraryCreate> = ref({
  name: '',
  address: '',
})

watchEffect(() => {
  if (props.useUpdate)
    library.value = {
      ...props.libraryData,
    } as LibraryCreate
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

        for (const key in library.value) {
          if (library.value[key as keyof LibraryCreate] !== props.libraryData?.[key as keyof LibraryCreate]) {
            changes[key] = library.value[key as keyof LibraryCreate]
          }
        }
        emit('libraryUpdate', {
          ...changes,
        })
      } else {
        emit('libraryCreate', {
          name: library.value.name,
          address: library.value.address,
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
    <DrawerHeaderSection title="Agregar biblioteca" @cancel="closeNavigationDrawer" />

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: true }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
            <VRow>
              <!-- 👉 name -->
              <VCol cols="12">
                <VTextField
                  v-model="library.name"
                  :rules="[requiredValidator]"
                  label="Nombre"
                  placeholder="Biblioteca Nacional"
                />
              </VCol>

              <!-- 👉 Address -->
              <VCol cols="12">
                <VTextField
                  v-model="library.address"
                  :rules="[requiredValidator]"
                  label="Dirección"
                  placeholder="Av. 10 de Agosto y Colón"
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
