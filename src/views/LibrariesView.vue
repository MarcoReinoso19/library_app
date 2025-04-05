<script lang="ts" setup>
import { useReadLibrariesMe, useCreateLibrary, useUpdateLibrary, useDeleteLibrary } from '@/composables/useLibrary'
import type { LibraryCreate, LibraryRead, LibraryUpdate } from '@/interfaces/Library'
import AddNewLibraryDrawer from './AddNewLibraryDrawer.vue'

const { librariesMe, getLibrariesMe, isPending } = useReadLibrariesMe()

const { postLibrary, isSuccess, isError, errorMessage } = useCreateLibrary()
const {
  updateLibrary,
  isSuccess: isUpdated,
  isError: isErrorUpdating,
  errorMessage: errorUpdatingMessage,
} = useUpdateLibrary()
const {
  deleteLibrary,
  isSuccess: isDeleted,
  isError: isErrorDeleting,
  errorMessage: errorDeletingMessage,
} = useDeleteLibrary()

onMounted(() => {
  getLibrariesMe()
})

const isAddNewLibraryDrawerVisible = ref(false)

// 👉 Add new library
const addNewLibrary = async (library: LibraryCreate) => {
  await postLibrary(library)
}

watch(
  isSuccess,
  async () => {
    if (isSuccess.value) {
      await nextTick(() => {
        getLibrariesMe()
      })
    }
  },
  { immediate: true }
)
const useUpdate = ref(false)
const selectedLibrary = ref<LibraryRead | null>(null)

const onUpdateLibrary = (library: LibraryRead) => {
  useUpdate.value = true
  selectedLibrary.value = library
  isAddNewLibraryDrawerVisible.value = true
}

const doUpdateLibrary = async (library: LibraryUpdate) => {
  if (!selectedLibrary.value) return
  await updateLibrary({ libraryId: selectedLibrary.value.id, library })
  useUpdate.value = false
  selectedLibrary.value = null
}

const onDeleteLibrary = async (id: number) => {
  const confirmDelete = true

  if (confirmDelete) {
    await deleteLibrary(id)
  }
}

watch(
  isUpdated,
  async () => {
    if (isUpdated.value) {
      await nextTick(() => {
        getLibrariesMe()
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
        getLibrariesMe()
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
        getLibrariesMe()
      })
    }
  },
  { immediate: true }
)

const tableHeaders = [
  { title: '#', key: 'id', sortable: false },
  { title: 'Nombre', key: 'name', sortable: false },
  { title: 'Dirección', key: 'address', sortable: false },
  { title: 'Acciones', key: 'actions', sortable: false },
]
</script>

<template>
  <VFadeTransition leave-absolute hide-on-leave>
    <VCol v-if="isPending" class="text-center d-flex justify-center align-center">
      <VProgressCircular size="60" color="primary" indeterminate />
    </VCol>
    <VCol v-else-if="librariesMe && librariesMe.length > 0" cols="12" class="d-flex justify-center align-center">
      <VCard class="w-100" max-width="800" min-height="400" elevated elevation="4" rounded="lg">
        <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
          <div class="d-flex py-2 align-center w-100 justify-space-between flex-wrap gap-4">
            <h3 class="ml-4 text-h6">Bibliotecas</h3>
            <!-- 👉 Search  -->
            <div class="mr-4">
              <SubmitButton
                label="Crear Biblioteca"
                :is-pending="isPending"
                block
                @click="isAddNewLibraryDrawerVisible = true"
              />
            </div>
          </div>
        </VCardText>
        <VDivider />
        <VDataTableServer
          hide-default-footer
          :headers="tableHeaders"
          :items="librariesMe"
          :items-length="librariesMe ? librariesMe.length : 0"
          item-value="id"
          return-object
          fixed-header
          density="default"
        >
          <!-- Actions -->
          <template #item.actions="{ item }">
            <VBtn icon color="default" variant="text" @click="onUpdateLibrary(item)">
              <VIcon icon="mdi-pencil" />
            </VBtn>
            <VBtn icon color="default" variant="text" @click="onDeleteLibrary(item.id)">
              <VIcon icon="mdi-trash-can-outline" />
            </VBtn>
          </template>
        </VDataTableServer>
      </VCard>
      <!-- 👉 Add New Library -->
      <AddNewLibraryDrawer
        v-model:isDrawerOpen="isAddNewLibraryDrawerVisible"
        :useUpdate="useUpdate"
        :library-data="selectedLibrary"
        @library-create="addNewLibrary"
        @library-update="doUpdateLibrary"
      />
    </VCol>
  </VFadeTransition>
  <VAlert
    v-model="isSuccess"
    type="success"
    class="mt-4 mx-3"
    transition="fade-transition"
    text="Library creado con éxito"
  />
  <VAlert
    v-model="isUpdated"
    type="info"
    class="mt-4 mx-3"
    transition="fade-transition"
    text="Library actualizado con éxito"
  />
  <VAlert
    v-model="isDeleted"
    type="warning"
    class="mt-4 mx-3"
    transition="fade-transition"
    text="Library eliminado con éxito"
  />
  <VAlert
    v-model="isError"
    type="error"
    class="mt-4 mx-3"
    transition="fade-transition"
    :text="errorMessage || 'Error al crear el library'"
  />
  <VAlert
    v-model="isErrorUpdating"
    type="error"
    class="mt-4 mx-3"
    transition="fade-transition"
    :text="errorUpdatingMessage || 'Error al crear el library'"
  />
  <VAlert
    v-model="isErrorDeleting"
    type="error"
    class="mt-4 mx-3"
    transition="fade-transition"
    :text="errorDeletingMessage || 'Error al eliminar el library'"
  />
</template>
