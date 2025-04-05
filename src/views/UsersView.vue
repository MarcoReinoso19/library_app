<script setup lang="ts">
import { useReadUserMe } from '@/composables/useUser'

const { user, getUserMe, isSuccess, isPending } = useReadUserMe()

onMounted(() => {
  getUserMe()
})
</script>

<template>
  <VCard v-if="isSuccess && user" class="profile-card" elevation="8" max-width="600" rounded="lg">
    <VCardTitle class="text-h5 font-weight-bold primary--text">
      <VIcon large left color="primary">mdi-account-circle</VIcon>
      Perfil de Usuario
    </VCardTitle>

    <VDivider class="mx-4" />

    <VCardText>
      <VRow>
        <VCol cols="12" md="6">
          <VListItem>
            <template #prepend>
              <VIcon color="primary">mdi-account</VIcon>
            </template>
            <VListItemTitle class="text-subtitle-1">Nombre de usuario</VListItemTitle>
            <VListItemSubtitle class="text-h6">{{ user.username }}</VListItemSubtitle>
          </VListItem>
        </VCol>

        <VCol cols="12" md="6">
          <VListItem>
            <template #prepend>
              <VIcon color="primary">mdi-email</VIcon>
            </template>
            <VListItemTitle class="text-subtitle-1">Correo electrónico</VListItemTitle>
            <VListItemSubtitle class="text-h6">{{ user.email }}</VListItemSubtitle>
          </VListItem>
        </VCol>

        <VCol cols="12" md="6">
          <VListItem>
            <template #prepend>
              <VIcon color="primary">mdi-key</VIcon>
            </template>
            <VListItemTitle class="text-subtitle-1">ID de usuario</VListItemTitle>
            <VListItemSubtitle class="text-h6">{{ user.id }}</VListItemSubtitle>
          </VListItem>
        </VCol>

        <VCol cols="12" md="6">
          <VListItem>
            <template #prepend>
              <VIcon color="primary">mdi-lock</VIcon>
            </template>
            <VListItemTitle class="text-subtitle-1">Estado de contraseña</VListItemTitle>
            <VListItemSubtitle class="text-h6">
              <VChip small color="success" text-color="white">
                <VIcon left small>mdi-check-circle</VIcon>
                Encriptada
              </VChip>
            </VListItemSubtitle>
          </VListItem>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
  <VCard v-else-if="isPending" class="profile-card" elevation="8" max-width="600" rounded="lg">
    <VCardText class="text-center">
      <VProgressCircular indeterminate color="primary" size="60" />
      <p>Cargando perfil...</p>
    </VCardText>
  </VCard>
  <VCard v-else class="profile-card" elevation="8" max-width="600" rounded="lg">
    <VCardText class="text-center text-h6">Error al cargar el perfil</VCardText>
    <VCardText class="text-center text-h6">Por favor, inténtelo de nuevo más tarde.</VCardText>
  </VCard>
</template>

<style scoped>
.profile-card {
  margin: 20px auto;
  transition: transform 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
}

.v-list-item__subtitle {
  opacity: 1 !important;
}

.v-card__title {
  padding: 20px 24px 10px;
}

.v-divider {
  margin-bottom: 16px;
}
</style>
