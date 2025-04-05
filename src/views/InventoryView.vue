<script lang="ts" setup>
import {
  useReadInventoriesMe,
  useCreateInventory,
  useDeleteInventory,
  useUpdateInventory,
} from '@/composables/useInventory'
import type { InventoryCreate, InventoryRead, InventoryUpdate } from '@/interfaces/Inventory'
import AddNewInventoryDrawer from './AddNewInventoryDrawer.vue'

const { inventoriesMe, getInventoriesMe, isPending } = useReadInventoriesMe()
const { postInventory, isSuccess, isError, errorMessage } = useCreateInventory()
const {
  updateInventory,
  isSuccess: isUpdated,
  isError: isErrorUpdating,
  errorMessage: errorUpdatingMessage,
} = useUpdateInventory()
const {
  deleteInventory,
  isSuccess: isDeleted,
  isError: isErrorDeleting,
  errorMessage: errorDeletingMessage,
} = useDeleteInventory()

onMounted(() => {
  getInventoriesMe()
})

const isAddNewInventoryDrawerVisible = ref(false)

// 👉 Add new inventory
const addNewInventory = async (inventory: InventoryCreate) => {
  await postInventory(inventory)
}

watch(
  isSuccess,
  async () => {
    if (isSuccess.value) {
      await nextTick(() => {
        getInventoriesMe()
      })
    }
  },
  { immediate: true }
)

const useUpdate = ref(false)
const selectedInventory = ref<InventoryRead | null>(null)

const onUpdateInventory = (inventory: InventoryRead) => {
  useUpdate.value = true
  selectedInventory.value = inventory
  isAddNewInventoryDrawerVisible.value = true
}

const doUpdateInventory = async (inventory: InventoryUpdate) => {
  if (!selectedInventory.value) return
  await updateInventory({ inventoryId: selectedInventory.value.id, inventory })
  useUpdate.value = false
  selectedInventory.value = null
}

const onDeleteInventory = async (id: number) => {
  const confirmDelete = true

  if (confirmDelete) {
    await deleteInventory(id)
  }
}

watch(
  isUpdated,
  async () => {
    if (isUpdated.value) {
      await nextTick(() => {
        getInventoriesMe()
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
        getInventoriesMe()
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
        getInventoriesMe()
      })
    }
  },
  { immediate: true }
)

const tableHeaders = [
  { title: '#', key: 'id', sortable: false },
  { title: 'Material', key: 'material', sortable: false },
  { title: 'Biblioteca', key: 'library', sortable: false },
  { title: 'Referencia', key: 'codRef', sortable: false },
  { title: 'Tipo', key: 'type', sortable: false },
  { title: 'Stock', key: 'stock', sortable: false },
  { title: 'Precio', key: 'price', sortable: false },
  { title: 'Total', key: 'total', sortable: false },
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
    <VCol v-else-if="inventoriesMe && inventoriesMe.length > 0" cols="12" class="d-flex justify-center align-center">
      <VCard class="w-100" min-height="400" elevated elevation="4" rounded="lg">
        <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
          <div class="d-flex py-2 align-center w-100 justify-space-between flex-wrap gap-4">
            <h3 class="ml-4 text-h6">Inventory</h3>
            <!-- 👉 Search  -->
            <div class="mr-4">
              <SubmitButton
                label="Crear Inventory"
                :is-pending="isPending"
                block
                @click="isAddNewInventoryDrawerVisible = true"
              />
            </div>
          </div>
        </VCardText>
        <VDivider />
        <VDataTableServer
          hide-default-footer
          :headers="tableHeaders"
          :items="inventoriesMe"
          :items-length="inventoriesMe ? inventoriesMe.length : 0"
          item-value="id"
          return-object
          fixed-header
          density="default"
        >
          <!-- Library -->
          <template #item.library="{ item }">
            {{ item.library.name }}
          </template>

          <!-- Material -->
          <template #item.material="{ item }">
            {{ item.material.title }}
          </template>
          <!-- Type -->
          <template #item.type="{ item }">
            {{ item.material.type }}
          </template>
          <!-- Reference Code -->
          <template #item.codRef="{ item }">
            {{ item.material.codRef }}
          </template>
          <!-- Price -->
          <template #item.price="{ item }"> ${{ item.material.price }} </template>
          <!-- Price -->
          <template #item.total="{ item }"> ${{ item.material.price * item.stock }} </template>
          <!-- Author -->
          <template #item.author="{ item }">
            {{ item.material.author.name }}
          </template>
          <!-- Section -->
          <template #item.section="{ item }">
            {{ item.material.section.name }}
          </template>

          <!-- Actions -->
          <template #item.actions="{ item }">
            <VBtn icon color="default" variant="text" @click="onUpdateInventory(item)">
              <VIcon icon="mdi-pencil" />
            </VBtn>
            <VBtn icon color="default" variant="text" @click="onDeleteInventory(item.id)">
              <VIcon icon="mdi-trash-can-outline" />
            </VBtn>
          </template>
        </VDataTableServer>
      </VCard>
      <!-- 👉 Add New Inventory -->
      <AddNewInventoryDrawer
        v-model:isDrawerOpen="isAddNewInventoryDrawerVisible"
        :useUpdate="useUpdate"
        :inventory-data="selectedInventory"
        @inventory-create="addNewInventory"
        @inventory-update="doUpdateInventory"
      />
    </VCol>
  </VFadeTransition>
  <VAlert
    v-model="isSuccess"
    type="success"
    class="mt-4 mx-3"
    transition="fade-transition"
    text="Item creado con éxito"
  />
  <VAlert
    v-model="isUpdated"
    type="info"
    class="mt-4 mx-3"
    transition="fade-transition"
    text="Item actualizado con éxito"
  />
  <VAlert
    v-model="isDeleted"
    type="warning"
    class="mt-4 mx-3"
    transition="fade-transition"
    text="Item eliminado con éxito"
  />
  <VAlert
    v-model="isError"
    type="error"
    class="mt-4 mx-3"
    transition="fade-transition"
    :text="errorMessage || 'Error al crear el item'"
  />
  <VAlert
    v-model="isErrorUpdating"
    type="error"
    class="mt-4 mx-3"
    transition="fade-transition"
    :text="errorUpdatingMessage || 'Error al crear el item'"
  />
  <VAlert
    v-model="isErrorDeleting"
    type="error"
    class="mt-4 mx-3"
    transition="fade-transition"
    :text="errorDeletingMessage || 'Error al eliminar el item'"
  />
</template>
