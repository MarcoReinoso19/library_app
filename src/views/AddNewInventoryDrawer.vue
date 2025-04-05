<script setup lang="ts">
import type { InventoryRead, InventoryCreate, InventoryUpdate } from '@/interfaces/Inventory'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { requiredValidator } from '@/utils/validators'
import type { VForm } from 'vuetify/components/VForm'
import { useReadLibrariesMe } from '@/composables/useLibrary'
import { useReadMaterials } from '@/composables/useMaterial'

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
  (e: 'inventoryCreate', value: InventoryCreate): void
  (e: 'inventoryUpdate', value: InventoryUpdate): void
}

interface Props {
  isDrawerOpen: boolean
  useUpdate?: boolean | null
  inventoryData?: InventoryRead | null
}

const { getLibrariesMe, librariesMe } = useReadLibrariesMe()
const { getMaterials, materials } = useReadMaterials()

onMounted(() => {
  getLibrariesMe()
  getMaterials()
})

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const inventory: Ref<InventoryCreate> = ref({
  stock: 0,
  libraryId: null as unknown as number,
  materialId: null as unknown as number,
})

watchEffect(() => {
  if (props.useUpdate)
    inventory.value = {
      ...props.inventoryData,
    } as InventoryCreate
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

        for (const key in inventory.value) {
          if (inventory.value[key as keyof InventoryCreate] !== props.inventoryData?.[key as keyof InventoryCreate]) {
            changes[key] = inventory.value[key as keyof InventoryCreate]
          }
        }
        emit('inventoryUpdate', {
          ...changes,
        })
      } else {
        emit('inventoryCreate', {
          stock: inventory.value.stock,
          libraryId: inventory.value.libraryId,
          materialId: inventory.value.materialId,
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
    <DrawerHeaderSection title="Agregar nuevo Inventario" @cancel="closeNavigationDrawer" />
    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: true }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
            <VRow>
              <!-- 👉 Stock -->
              <VCol cols="12">
                <VTextField v-model="inventory.stock" :rules="[requiredValidator]" label="Stock" placeholder="500" />
              </VCol>
              <!-- 👉 LibraryId -->
              <VCol cols="12">
                <VSelect
                  v-model="inventory.libraryId"
                  :items="librariesMe"
                  item-value="id"
                  item-title="name"
                  :rules="[requiredValidator]"
                  label="Biblioteca"
                  placeholder="Selecciona la biblioteca"
                />
              </VCol>
              <!-- 👉 MaterialId -->
              <VCol cols="12">
                <VSelect
                  v-model="inventory.materialId"
                  :items="materials"
                  item-value="id"
                  item-title="title"
                  :rules="[requiredValidator]"
                  label="Material"
                  placeholder="Selecciona el material"
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
