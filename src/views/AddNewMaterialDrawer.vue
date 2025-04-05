<script setup lang="ts">
import type { MaterialRead, MaterialCreate, MaterialUpdate } from '@/interfaces/Material'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { requiredValidator } from '@/utils/validators'
import type { VForm } from 'vuetify/components/VForm'
import { MaterialType } from '@/utils/enums'
import { useReadSections } from '@/composables/useSection'
import { useReadAuthors } from '@/composables/useAuthor'

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
  (e: 'materialCreate', value: MaterialCreate): void
  (e: 'materialUpdate', value: MaterialUpdate): void
}

interface Props {
  isDrawerOpen: boolean
  useUpdate?: boolean | null
  materialData?: MaterialRead | null
}

const { getAuthors, authors } = useReadAuthors()
const { getSections, sections } = useReadSections()

onMounted(() => {
  getAuthors()
  getSections()
})

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const material: Ref<MaterialCreate> = ref({
  type: MaterialType.BOOK,
  title: '',
  isbn: '',
  issn: '',
  description: '',
  codRef: '',
  authorId: 0,
  sectionId: 0,
  price: 0,
})

watchEffect(() => {
  if (props.useUpdate)
    material.value = {
      ...props.materialData,
    } as MaterialCreate
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

        for (const key in material.value) {
          if (material.value[key as keyof MaterialCreate] !== props.materialData?.[key as keyof MaterialCreate]) {
            changes[key] = material.value[key as keyof MaterialCreate]
          }
        }
        emit('materialUpdate', {
          ...changes,
        })
      } else {
        emit('materialCreate', {
          title: material.value.title,
          isbn: material.value.isbn,
          issn: material.value.issn,
          description: material.value.description,
          codRef: material.value.codRef,
          authorId: material.value.authorId,
          sectionId: material.value.sectionId,
          price: material.value.price,
          type: material.value.type,
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
    <DrawerHeaderSection title="Agregar nuevo material" @cancel="closeNavigationDrawer" />
    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: true }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
            <VRow>
              <!-- 👉 Type -->
              <VCol cols="12">
                <VSelect
                  v-model="material.type"
                  :items="Object.values(MaterialType)"
                  :rules="[requiredValidator]"
                  label="Tipo de Material"
                  placeholder="Selecciona el tipo de material"
                />
              </VCol>

              <!-- 👉 Title -->
              <VCol cols="12">
                <VTextField
                  v-model="material.title"
                  :rules="[requiredValidator]"
                  label="Título"
                  placeholder="Narnia el león, la bruja y el ropero"
                />
              </VCol>

              <!-- 👉 ISBN -->
              <VCol cols="12">
                <VTextField v-model="material.isbn" label="ISBN" placeholder="978-3-16-148410-0" />
              </VCol>

              <!-- 👉 ISSN -->
              <VCol cols="12">
                <VTextField v-model="material.issn" label="ISSN" placeholder="1234-5678" />
              </VCol>

              <!-- 👉 Description -->
              <VCol cols="12">
                <VTextField v-model="material.description" label="Descripción" placeholder="Descripción del material" />
              </VCol>

              <!-- 👉 CodRef -->
              <VCol cols="12">
                <VTextField
                  v-model="material.codRef"
                  :rules="[requiredValidator]"
                  label="Código de Referencia"
                  placeholder="GRM-1234"
                />
              </VCol>

              <!-- 👉 AuthorId -->
              <VCol cols="12">
                <VSelect
                  v-model="material.authorId"
                  :items="authors"
                  item-value="id"
                  item-title="name"
                  :rules="[requiredValidator]"
                  label="Autor"
                  placeholder="Selecciona el Autor"
                />
              </VCol>

              <!-- 👉 SectionId -->
              <VCol cols="12">
                <VSelect
                  v-model="material.sectionId"
                  :items="sections"
                  item-value="id"
                  item-title="name"
                  :rules="[requiredValidator]"
                  label="Sección"
                  placeholder="Selecciona la Sección"
                />
              </VCol>

              <!-- 👉 Price -->
              <VCol cols="12">
                <VTextField v-model="material.price" :rules="[requiredValidator]" label="Precio" placeholder="19.99" />
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
