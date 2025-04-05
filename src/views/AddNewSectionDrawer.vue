<script setup lang="ts">
import type { SectionRead, SectionCreate, SectionUpdate } from '@/interfaces/Section'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { requiredValidator } from '@/utils/validators'
import type { VForm } from 'vuetify/components/VForm'

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
  (e: 'sectionCreate', value: SectionCreate): void
  (e: 'sectionUpdate', value: SectionUpdate): void
}

interface Props {
  isDrawerOpen: boolean
  useUpdate?: boolean | null
  sectionData?: SectionRead | null
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const section: Ref<SectionCreate> = ref({
  name: '',
  capacity: 0,
})

watchEffect(() => {
  if (props.useUpdate)
    section.value = {
      ...props.sectionData,
    } as SectionCreate
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

        for (const key in section.value) {
          if (section.value[key as keyof SectionCreate] !== props.sectionData?.[key as keyof SectionCreate]) {
            changes[key] = section.value[key as keyof SectionCreate]
          }
        }
        emit('sectionUpdate', {
          ...changes,
        })
      } else {
        emit('sectionCreate', {
          name: section.value.name,
          capacity: section.value.capacity,
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
    <DrawerHeaderSection title="Agregar nuevo section" @cancel="closeNavigationDrawer" />
    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: true }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
            <VRow>
              <!-- 👉 Name -->
              <VCol cols="12">
                <VTextField
                  v-model="section.name"
                  :rules="[requiredValidator]"
                  label="Nombre"
                  placeholder="Sección de matemáticas"
                />
              </VCol>

              <!-- 👉 Capacity -->
              <VCol cols="12">
                <VTextField
                  v-model="section.capacity"
                  :rules="[requiredValidator]"
                  label="Capacidad"
                  placeholder="200"
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
