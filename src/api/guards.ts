import Cookies from 'js-cookie'
import type { Router } from 'vue-router'

export const setupGuards = (router: Router) => {
  router.beforeEach(to => {
    // Verificar estado de autenticación
    const isLoggedIn = !!(Cookies.get('userData') && Cookies.get('accessToken'))

    // 1. Redirigir usuarios autenticados que intentan acceder a login/register
    if (isLoggedIn && to.meta.unauthenticatedOnly) {
      return { path: '/' }
    }

    // 2. Redirigir usuarios no autenticados que intentan acceder a rutas protegidas
    if (!isLoggedIn && to.meta.requiresAuth) {
      return {
        path: '/login',
        query: {
          redirect: to.path !== '/' ? to.path : undefined,
        },
      }
    }

    // 3. Permitir acceso en otros casos
    return
  })
}
