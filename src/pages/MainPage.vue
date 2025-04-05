<script setup lang="ts">
import { ref } from 'vue'
import DashboardView from '@/views/DashboardView.vue'
import LibrariesView from '@/views/LibrariesView.vue'
import MaterialsView from '@/views/MaterialsView.vue'
import SectionsView from '@/views/SectionsView.vue'
import InventoryView from '@/views/InventoryView.vue'

import UsersView from '@/views/UsersView.vue'
import { useLogout } from '@/composables/useAuth'

const drawer = ref(true)
const rail = ref(false)
const items = ref([
  { title: 'Usuarios', icon: 'mdi-account-group', value: 'user' },
  { title: 'Bibliotecas', icon: 'mdi-library', value: 'libraries' },
  { title: 'Materiales', icon: 'mdi-book', value: 'materials' },
  { title: 'Inventario', icon: 'mdi-package', value: 'inventory' },
  { title: 'Secciones', icon: 'mdi-library-shelves', value: 'sections' },
])
const activeItem = ref('')
const notifications = ref(5)
const messages = ref(3)
const showSearch = ref(false)
const search = ref('')

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

const toggleRail = () => {
  rail.value = !rail.value
}

const { logout } = useLogout()
</script>

<template>
  <VLayout class="rounded rounded-md">
    <!-- App Bar -->
    <VAppBar color="primary" density="compact">
      <template v-slot:prepend>
        <VAppBarNavIcon @click="toggleDrawer"></VAppBarNavIcon>
      </template>

      <VAppBarTitle>MD Biblioteca</VAppBarTitle>

      <VSpacer></VSpacer>

      <VBtn icon @click="showSearch = !showSearch">
        <VIcon>mdi-magnify</VIcon>
      </VBtn>

      <VSlideXTransition>
        <VTextField
          v-if="showSearch"
          v-model="search"
          density="compact"
          variant="solo"
          label="Buscar..."
          single-line
          hide-details
          class="py-4"
          style="max-width: 200px"
        ></VTextField>
      </VSlideXTransition>

      <VBtn icon>
        <VBadge :content="notifications" color="error">
          <VIcon>mdi-bell</VIcon>
        </VBadge>
      </VBtn>

      <VBtn icon>
        <VBadge :content="messages" color="error">
          <VIcon>mdi-email</VIcon>
        </VBadge>
      </VBtn>

      <VMenu>
        <template v-slot:activator="{ props }">
          <VBtn icon v-bind="props">
            <VAvatar size="32">
              <VImg src="https://randomuser.me/api/portraits/men/1.jpg"></VImg>
            </VAvatar>
          </VBtn>
        </template>
        <VList>
          <VListItem
            class="d-flex align-center mx-2"
            v-for="(item, index) in [{ title: 'Cerrar sesión', icon: 'mdi-logout', action: logout }]"
            :key="index"
            :value="index"
            @click="item.action ? item.action() : null"
          >
            <template v-slot:prepend>
              <VIcon :icon="item.icon"></VIcon>
            </template>
            <VListItemTitle>{{ item.title }}</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </VAppBar>

    <!--VAvatar -->
    <VNavigationDrawer v-model="drawer" permanent>
      <VList v-model:selected="activeItem" mandatory nav>
        <VListItem
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          :prepend-icon="item.icon"
          :title="item.title"
          link
        ></VListItem>
      </VList>
    </VNavigationDrawer>

    <!-- Main Content -->
    <VMain>
      <VContainer fluid>
        <VBreadcrumbs
          :items="[
            { title: 'Inicio', disabled: false, href: '#' },
            { title: String(activeItem), disabled: true },
          ]"
          class="pl-0"
        ></VBreadcrumbs>

        <VRow>
          <VCol cols="12" md="12">
            <VWindow v-model="activeItem" :touch="false">
              <VWindowItem value="user">
                <UsersView />
              </VWindowItem>
              <VWindowItem value="libraries">
                <LibrariesView />
              </VWindowItem>
              <VWindowItem value="materials">
                <MaterialsView />
              </VWindowItem>
              <VWindowItem value="sections">
                <SectionsView />
              </VWindowItem>
              <VWindowItem value="inventory">
                <InventoryView />
              </VWindowItem>
            </VWindow>
          </VCol>
        </VRow>
      </VContainer>

      <VFooter app color="surface" class="text-center d-flex flex-column">
        <div>
          <VBtn
            v-for="icon in ['mdi-linkedin', 'mdi-instagram', 'mdi-github']"
            :key="icon"
            :icon="icon"
            variant="text"
            :color="icon == 'mdi-linkedin' ? 'blue' : icon == 'mdi-instagram' ? 'pink' : 'black'"
            :href="
              icon == 'mdi-linkedin'
                ? 'https://www.linkedin.com/in/marco-reinoso-b63807244/'
                : icon == 'mdi-instagram'
                  ? 'https://www.instagram.com/marcus_reinoso/'
                  : 'https://github.com/MarcoReinoso19'
            "
            target="_blank"
          ></VBtn>
        </div>
        <div class="pt-0">{{ new Date().getFullYear() }} — <strong>Developed by Marco Reinoso 🔥🔥 </strong></div>
        <div class="social-buttons"></div>
      </VFooter>
    </VMain>
  </VLayout>
</template>

<style scoped>
.social-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
}

.social-buttons .v-btn {
  transition: all 0.3s ease;
  opacity: 0.8;
}

.social-buttons .v-btn:hover {
  opacity: 1;
  transform: translateY(-2px);
  color: rgb(var(--v-theme-secondary)) !important;
}
</style>
