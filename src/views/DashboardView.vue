<script lang="ts" setup></script>

<template>
  <VCard>
    <VCardTitle class="text-h5">Bienvenido a tu aplicación</VCardTitle>
    <VCardText>
      <p>Este es el contenido principal de tu aplicación.</p>
      <VAlert type="info" variant="tonal" class="my-4"> Has seleccionado: <strong></strong> </VAlert>

      <VExpansionPanels>
        <VExpansionPanel title="Información importante">
          <VExpansionPanelText>
            Contenido de información importante que puede ser expandido o colapsado.
          </VExpansionPanelText>
        </VExpansionPanel>
        <VExpansionPanel title="Más opciones">
          <VExpansionPanelText> Más contenido que puede ser expandido o colapsado. </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCardText>
    <VCardActions>
      <VBtn color="primary">Acción principal</VBtn>
      <VBtn variant="text">Acción secundaria</VBtn>
    </VCardActions>
  </VCard>
</template>
