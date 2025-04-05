<script lang="ts" setup>
import { useReadSections, useCreateSection, useDeleteSection, useUpdateSection } from '@/composables/useSection'
import type { SectionCreate, SectionRead, SectionUpdate } from '@/interfaces/Section'
import AddNewSectionDrawer from './AddNewSectionDrawer.vue'

const { sections, getSections, isPending } = useReadSections()
const { postSection, isSuccess, isError, errorMessage } = useCreateSection()
const {
  updateSection,
  isSuccess: isUpdated,
  isError: isErrorUpdating,
  errorMessage: errorUpdatingMessage,
} = useUpdateSection()
const {
  deleteSection,
  isSuccess: isDeleted,
  isError: isErrorDeleting,
  errorMessage: errorDeletingMessage,
} = useDeleteSection()

onMounted(() => {
  getSections()
})

const isAddNewSectionDrawerVisible = ref(false)

// 👉 Add new section
const addNewSection = async (section: SectionCreate) => {
  await postSection(section)
}

watch(
  isSuccess,
  async () => {
    if (isSuccess.value) {
      await nextTick(() => {
        getSections()
      })
    }
  },
  { immediate: true }
)

const useUpdate = ref(false)
const selectedSection = ref<SectionRead | null>(null)

const onUpdateSection = (section: SectionRead) => {
  useUpdate.value = true
  selectedSection.value = section
  isAddNewSectionDrawerVisible.value = true
}

const doUpdateSection = async (section: SectionUpdate) => {
  if (!selectedSection.value) return
  await updateSection({ sectionId: selectedSection.value.id, section })
  useUpdate.value = false
  selectedSection.value = null
}

const onDeleteSection = async (id: number) => {
  const confirmDelete = true

  if (confirmDelete) {
    await deleteSection(id)
  }
}

watch(
  isUpdated,
  async () => {
    if (isUpdated.value) {
      await nextTick(() => {
        getSections()
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
        getSections()
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
        getSections()
      })
    }
  },
  { immediate: true }
)

const tableHeaders = [
  { title: '#', key: 'id', sortable: false },
  { title: 'Nombre', key: 'name', sortable: false },
  { title: 'Capacidad', key: 'capacity', sortable: false },
  { title: 'Acciones', key: 'actions', sortable: false },
]
</script>

<template>
  <VFadeTransition leave-absolute hide-on-leave>
    <VCol v-if="isPending" class="text-center d-flex justify-center align-center">
      <VProgressCircular size="60" color="primary" indeterminate />
    </VCol>
    <VCol v-else-if="sections && sections.length > 0" cols="12" class="d-flex justify-center align-center">
      <VCard class="w-100" min-height="400" elevated elevation="4" rounded="lg">
        <VCardText class="d-flex justify-space-between align-center flex-wrap gap-4">
          <div class="d-flex py-2 align-center w-100 justify-space-between flex-wrap gap-4">
            <h3 class="ml-4 text-h6">Secciones</h3>
            <!-- 👉 Search  -->
            <div class="mr-4">
              <SubmitButton
                label="Crear Section"
                :is-pending="isPending"
                block
                @click="isAddNewSectionDrawerVisible = true"
              />
            </div>
          </div>
        </VCardText>
        <VDivider />
        <VDataTableServer
          hide-default-footer
          :headers="tableHeaders"
          :items="sections"
          :items-length="sections ? sections.length : 0"
          item-value="id"
          return-object
          fixed-header
          density="default"
        >
          <!-- Actions -->
          <template #item.actions="{ item }">
            <VBtn icon color="default" variant="text" @click="onUpdateSection(item)">
              <VIcon icon="mdi-pencil" />
            </VBtn>
            <VBtn icon color="default" variant="text" @click="onDeleteSection(item.id)">
              <VIcon icon="mdi-trash-can-outline" />
            </VBtn>
          </template>
        </VDataTableServer>
      </VCard>
      <!-- 👉 Add New Section -->
      <AddNewSectionDrawer
        v-model:isDrawerOpen="isAddNewSectionDrawerVisible"
        :useUpdate="useUpdate"
        :section-data="selectedSection"
        @section-create="addNewSection"
        @section-update="doUpdateSection"
      />
    </VCol>
  </VFadeTransition>
  <VAlert
    v-model="isSuccess"
    type="success"
    class="mt-4 mx-3"
    transition="fade-transition"
    text="Sección creada con éxito"
  />
  <VAlert
    v-model="isUpdated"
    type="info"
    class="mt-4 mx-3"
    transition="fade-transition"
    text="Sección actualizada con éxito"
  />
  <VAlert
    v-model="isDeleted"
    type="warning"
    class="mt-4 mx-3"
    transition="fade-transition"
    text="Sección eliminada con éxito"
  />
  <VAlert
    v-model="isError"
    type="error"
    class="mt-4 mx-3"
    transition="fade-transition"
    :text="errorMessage || 'Error al crear la sección'"
  />
  <VAlert
    v-model="isErrorUpdating"
    type="error"
    class="mt-4 mx-3"
    transition="fade-transition"
    :text="errorUpdatingMessage || 'Error al crear la sección'"
  />
  <VAlert
    v-model="isErrorDeleting"
    type="error"
    class="mt-4 mx-3"
    transition="fade-transition"
    :text="errorDeletingMessage || 'Error al eliminar la sección'"
  />
</template>
