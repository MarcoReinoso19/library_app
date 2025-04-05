<script lang="ts" setup>
import { useReadMaterials, useCreateMaterial, useDeleteMaterial, useUpdateMaterial } from '@/composables/useMaterial'
import type { MaterialCreate, MaterialRead, MaterialUpdate } from '@/interfaces/Material'
import AddNewMaterialDrawer from './AddNewMaterialDrawer.vue'

const { materials, getMaterials, isPending } = useReadMaterials()
const { postMaterial, isSuccess, isError, errorMessage } = useCreateMaterial()
const {
  updateMaterial,
  isSuccess: isUpdated,
  isError: isErrorUpdating,
  errorMessage: errorUpdatingMessage,
} = useUpdateMaterial()
const {
  deleteMaterial,
  isSuccess: isDeleted,
  isError: isErrorDeleting,
  errorMessage: errorDeletingMessage,
} = useDeleteMaterial()

onMounted(() => {
  getMaterials()
})

const isAddNewMaterialDrawerVisible = ref(false)

// 👉 Add new material
const addNewMaterial = async (material: MaterialCreate) => {
  await postMaterial(material)
}

watch(
  isSuccess,
  async () => {
    if (isSuccess.value) {
      await nextTick(() => {
        getMaterials()
      })
    }
  },
  { immediate: true }
)

const useUpdate = ref(false)
const selectedMaterial = ref<MaterialRead | null>(null)

const onUpdateMaterial = (material: MaterialRead) => {
  useUpdate.value = true
  selectedMaterial.value = material
  isAddNewMaterialDrawerVisible.value = true
}

const doUpdateMaterial = async (material: MaterialUpdate) => {
  if (!selectedMaterial.value) return
  await updateMaterial({ materialId: selectedMaterial.value.id, material })
  useUpdate.value = false
  selectedMaterial.value = null
}

const onDeleteMaterial = async (id: number) => {
  const confirmDelete = true

  if (confirmDelete) {
    await deleteMaterial(id)
  }
}

watch(
  isUpdated,
  async () => {
    if (isUpdated.value) {
      await nextTick(() => {
        getMaterials()
      })
    }
  },
  { immediate: true }
)

watch(
  isDeleted,
  async () => {
    if (isDeleted.value) {
      await nextTick(() => {
        getMaterials()
      })
    }
  },
  { immediate: true }
)

watch(
  isSuccess,
  async () => {
    if (isSuccess.value) {
      await nextTick(() => {
        getMaterials()
      })
    }
  },
  { immediate: true }
)

const tableHeaders = [
  { title: '#', key: 'id', sortable: false },
  { title: 'Titulo', key: 'title', sortable: false },
  { title: 'Tipo', key: 'type', sortable: false },
  { title: 'Autor', key: 'author', sortable: false },
  { title: 'ISBN', key: 'isbn', sortable: false },
  { title: 'ISSN', key: 'issn', sortable: false },
  { title: 'Código de Referencia', key: 'codRef', sortable: false },
  { title: 'Precio', key: 'price', sortable: false },
  { title: 'Autor', key: 'author', sortable: false },
  { title: 'Sección', key: 'section', sortable: false },
  { title: 'Acciones', key: 'actions', sortable: false },
]
</script>

<template>
  <VFadeTransition leave-absolute hide-on-leave>
    <VCol v-if="isPending" class="text-center d-flex justify-center align-center">
      <VProgressCircular size="60" color="primary" indeterminate />
    </VCol>
    <VCol v-else-if="materials && materials.length > 0" cols="12" class="d-flex justify-center align-center">
      <VCard class="w-100" min-height="400" elevated elevation="4" rounded="lg">
        <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
          <div class="d-flex py-2 align-center w-100 justify-space-between flex-wrap gap-4">
            <h3 class="ml-4 text-h6">Materiales</h3>
            <!-- 👉 Search  -->
            <div class="mr-4">
              <SubmitButton
                label="Crear Material"
                :is-pending="isPending"
                block
                @click="isAddNewMaterialDrawerVisible = true"
              />
            </div>
          </div>
        </VCardText>
        <VDivider />
        <VDataTableServer
          hide-default-footer
          :headers="tableHeaders"
          :items="materials"
          :items-length="materials ? materials.length : 0"
          item-value="id"
          return-object
          fixed-header
          density="default"
        >
          <!-- Author -->
          <template #item.author="{ item }">
            {{ item.author.name }}
          </template>

          <template #item.section="{ item }">
            {{ item.section.name }}
          </template>

          <!-- Actions -->
          <template #item.actions="{ item }">
            <VBtn icon color="default" variant="text" @click="onUpdateMaterial(item)">
              <VIcon icon="mdi-pencil" />
            </VBtn>
            <VBtn icon color="default" variant="text" @click="onDeleteMaterial(item.id)">
              <VIcon icon="mdi-trash-can-outline" />
            </VBtn>
          </template>
        </VDataTableServer>
      </VCard>
      <!-- 👉 Add New Material -->
      <AddNewMaterialDrawer
        v-model:isDrawerOpen="isAddNewMaterialDrawerVisible"
        :useUpdate="useUpdate"
        :material-data="selectedMaterial"
        @material-create="addNewMaterial"
        @material-update="doUpdateMaterial"
      />
    </VCol>
  </VFadeTransition>
  <VAlert
    v-model="isSuccess"
    type="success"
    class="mt-4 mx-3"
    transition="fade-transition"
    text="Material creado con éxito"
  />
  <VAlert
    v-model="isUpdated"
    type="info"
    class="mt-4 mx-3"
    transition="fade-transition"
    text="Material actualizado con éxito"
  />
  <VAlert
    v-model="isDeleted"
    type="warning"
    class="mt-4 mx-3"
    transition="fade-transition"
    text="Material eliminado con éxito"
  />
  <VAlert
    v-model="isError"
    type="error"
    class="mt-4 mx-3"
    transition="fade-transition"
    :text="errorMessage || 'Error al crear el material'"
  />
  <VAlert
    v-model="isErrorUpdating"
    type="error"
    class="mt-4 mx-3"
    transition="fade-transition"
    :text="errorUpdatingMessage || 'Error al crear el material'"
  />
  <VAlert
    v-model="isErrorDeleting"
    type="error"
    class="mt-4 mx-3"
    transition="fade-transition"
    :text="errorDeletingMessage || 'Error al eliminar el material'"
  />
</template>
